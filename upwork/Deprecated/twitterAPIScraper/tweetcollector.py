import requests
import base64
from google.oauth2 import service_account
from googleapiclient.discovery import build
import time
import sys
import datetime
        
# Global variables/constants: 

# Timing: 
max_results = 10 # Total tweets to return per account
search_period = 24 # Hours to include in search range (24 results in search range between 24 hours ago and the current time)
# Snapshot timing
total_hours = 6 # Pulls tweets over a 48 hour period
hours_per = 6 # Pulls tweets every 6 hours 
periods = total_hours/hours_per

# Limiters
# Prevent API flooding
like_limiter = 0
retweet_limiter = 0
like_timestamp = time.time()
retweet_timestamp = time.time()
next_period = time.time() + (60*60*hours_per)
google_limiter = 0
google_timestamp = time.time()

# Set the Google Sheets API endpoint and the range of cells to read for the list of accounts
SPREADSHEET_ID = ""
RANGE_NAME = 'Input!A2:A' # Unspecified endpoint should collect all values 

# Set the Google Sheets API endpoint and the range of cells to update
DEST_SPREADSHEET_ID = ""

# Replace these with your own consumer key and secret
CONSUMER_KEY = ""
CONSUMER_SECRET = ""

# If you are using a service account, you will need to set up a JSON key file
# You can find more information here: https://developers.google.com/identity/protocols/oauth2/service-account#creatinganaccount
# Replace with your own JSON key file and path
json_key_file = ""

# Authenticate with Google Sheets API

# Load the JSON key file
g_key = service_account.Credentials.from_service_account_file(json_key_file, scopes=['https://www.googleapis.com/auth/spreadsheets'])

# Build the client
client = build('sheets', 'v4', credentials=g_key)

# Now that we have spreadsheet auth, we do tweet auth

# Encode the consumer key and secret in base64
creds = base64.b64encode(f'{CONSUMER_KEY}:{CONSUMER_SECRET}'.encode('utf-8')).decode('utf-8')

# Set the headers for the request
twitter_headers = {
    'Authorization': f'Basic {creds}',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
}

# Set the data for the request
data = 'grant_type=client_credentials'

# Send the request to the OAuth 2.0 token endpoint to get an access token
twitter_response = requests.post('https://api.twitter.com/oauth2/token', headers=twitter_headers, data=data)

# Extract the access token from the response
access_token = twitter_response.json()['access_token']

# Set the headers for the search request
search_headers = {
    'Authorization': f'Bearer {access_token}'
}

# Runs once
def main():

    # ping the sheet to get the accounts list, this will update it every time it runs 

    # Extract the list of accounts from the Sheets API 
    accounts_list = client.spreadsheets().values().get(spreadsheetId=SPREADSHEET_ID, range=RANGE_NAME).execute()

    # Dodge the nulls
    if 'values' in accounts_list:

        # Flatten the list of accounts, removing nulls and duplicates
        accounts = []
        for account in accounts_list['values']:
            if account is not None and account not in accounts:
                if(len(account)>0):
                    accounts.append(account[0])

        # Initialize an empty list to store the tweets
        tweets = []

        # Set the parameters for the output
        # Start by creating a fresh page to take the metrics 
        # Get the list of sheets in the spreadsheet
        sheets_response = client.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
        pages = sheets_response['sheets']

        # Calculate the number of existing pages with the name "Metrics"
        #page = sum([1 for sheet in pages if sheet['properties']['title'].startswith('Metrics')]) + 1
        page = len([sheet for sheet in pages if sheet['properties']['title'].startswith('Metrics')]) + 1
        index = len(pages)

        # Create a new page and name it "Metrics X", where X is the number of existing pages + 1
        new_sheet = {
            "properties": {
                "title": f"Metrics {page}",
                "index": index,  # add the sheet to the end of the list
            }
        }

        metrics = client.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={'requests': [{'addSheet': new_sheet}]}).execute()

        # Add columns to the end of the sheet
        sheet_id = metrics['replies'][0]['addSheet']['properties']['sheetId']
        # Define the insert dimension request
        insert_dimension_request = {
            "insertDimension": {
                "range": {
                    "sheetId": sheet_id,  # Replace this with the actual sheet ID
                    "dimension": "COLUMNS",
                    "startIndex": 25,
                    "endIndex": ((periods*4)+8)
                },
                "inheritFromBefore": False
            }
        }
        # Send the insertDimension request to the API
        client.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={'requests': [insert_dimension_request]}).execute()
        # Repeat for vertical dimension
        if len(accounts) * max_results > 1000:
            insert_dimension_request = {
                "insertDimension": {
                    "range": {
                        "sheetId": sheet_id,  # Replace this with the actual sheet ID
                        "dimension": "ROWS",
                        "startIndex": 999,
                        "endIndex": (len(accounts) * max_results) + 1 # Allows 1st row to be titles 
                    },
                    "inheritFromBefore": False
                }
            }
            # Send the insertDimension request to the API
            client.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={'requests': [insert_dimension_request]}).execute()
        end = num_to_letter(int(periods*4)+8)

        # Add column headers
        SHEET_RANGE_NAME = f'Metrics {page}!A1:{end}'
        titles = ['Account', 'id', 'Link', 'Tweet']
        i=0
        while(i<=(periods)):
            hours = (i) * hours_per
            titles.extend([f'Likes {hours} hrs', f'Retweets {hours} hrs', f'Comments {hours} hrs', f'Views {hours} hrs'])
            i += 1
        value_range = {
            'range': SHEET_RANGE_NAME,
            'majorDimension': 'ROWS',
            'values': [titles]
        }

        # Send the request
        client.spreadsheets().values().update(spreadsheetId=DEST_SPREADSHEET_ID, valueInputOption='RAW', range=SHEET_RANGE_NAME, body=value_range).execute()

        # Set the output destination to the newly created page
        DEST_RANGE_NAME = f'Metrics {page}'

        # Set the current time as the end time
        end_time = (datetime.datetime.utcnow() - datetime.timedelta(seconds=10)).strftime('%Y-%m-%dT%H:%M:%SZ')
        # Set the start time to 24 hours ago
        start_time = (datetime.datetime.utcnow() - datetime.timedelta(hours=search_period)).strftime('%Y-%m-%dT%H:%M:%SZ')

        # Set the starting range (row) for the autofill 
        range = 2

        #prevent API flooding
        like_limiter = 0
        retweet_limiter = 0
        like_timestamp = time.time()
        retweet_timestamp = time.time()
        next_period = time.time() + (60*60*hours_per)
        google_limiter = 7
        google_timestamp = time.time()

        # Iterate over the accounts
        for account in accounts:
            # Set the search parameters
            params = {
                'query': f'from:{account}',  # search for tweets from this specific account
                'max_results': max_results,  # gotta have at least some kind of limit, right? 
                'start_time': start_time,
                'end_time': end_time,
            }

            # Send the search request
            response = requests.get('https://api.twitter.com/2/tweets/search/recent', headers=search_headers, params=params)

            # Dodging null errors
            if 'data' in response.json() and response.json()['data'] :
                # Extract the list of tweets from the response
                tweets = []
                for raw_tweet in response.json()['data']:
                    if raw_tweet is not None and raw_tweet not in tweets:
                        tweets.append(raw_tweet)

                for tweet in tweets:
                    # Get the tweet ID
                    tweet_id = tweet['id']

                    # API endpoint for public metrics using full archive search 
                    # query = tweet['text'][:tweet['text'].index(" ")]
                    # query = tweet['text'][:1023]
                    # since = str(int(tweet['id']) - 1)
                    # until = str(int(tweet['id']) + 1)
                    # TWEET_API_ENDPOINT = f'https://api.twitter.com/2/tweets/search/all?query={query}&since_id={since}&until_id={until}&tweet.fields=public_metrics'
                    # Send the request to the Twitter API
                    # API endpoint for users liking a post (just likes)
                    # API endpoint for users retweeting a post (just retweets)
                    LIKE_API_ENDPOINT = f'https://api.twitter.com/2/tweets/{tweet_id}/liking_users'
                    RETWEET_API_ENDPOINT = f'https://api.twitter.com/2/tweets/{tweet_id}/retweeted_by'
                    likes, like_limiter, like_timestamp = handle_tokens(0, LIKE_API_ENDPOINT, like_limiter, like_timestamp)
                    retweets, retweet_limiter, retweet_timestamp = handle_tokens(0, RETWEET_API_ENDPOINT, retweet_limiter, retweet_timestamp)

                    #tweet_data = requests.get(TWEET_API_ENDPOINT, headers=search_headers)
                    #print(tweet_data.json())
                    #if(tweet_data.status_code == 200):
                        # Extract the tweet data from the response
                        #tweet_data = tweet_data.json()
                    #if 'data' in tweet_data and tweet_data['data'] :
                    if True:
                        url = f'https://twitter.com/{account}/status/{tweet_id}'

                        #if in needed for tweet_data 

                        # Package up the link to the tweet, the content of the tweet, and the number of likes, retweets, comments, and views
                        tweet_body = [[
                            account,
                            tweet['id'], 
                            url,
                            tweet['text'],
                            likes,
                            retweets,
                            'replies',
                            'views'
                            #tweet['public_metrics']['like_count'],
                            #tweet['public_metrics']['retweet_count'],
                            #tweet['public_metrics']['reply_count'],
                            #tweet['public_metrics']['view_count']
                        ]]

                        payload = {
                            'range': f'{DEST_RANGE_NAME}!A{range}:H{range}',
                            'majorDimension': 'ROWS',
                            'values': tweet_body
                        }
                        # Push the tweet to the destination sheet 
                        client.spreadsheets().values().update(spreadsheetId=DEST_SPREADSHEET_ID, range=f'{DEST_RANGE_NAME}!A{range}:H{range}', valueInputOption='RAW', body=payload).execute()
                        google_limiter, google_timestamp = rate_limit(google_limiter, google_timestamp, False)
                        range += 1
                

        # Tracking the tweets   
        period_count = 1
        period = "I"
        period_end = "L"

        # First I read from the google sheet where the tweet was printed 
        SNAPSHOT_RANGE_NAME = f'Metrics {page}!B2:B' # Should collect all tweets  

        snapshots = client.spreadsheets().values().get(spreadsheetId=DEST_SPREADSHEET_ID, range=SNAPSHOT_RANGE_NAME).execute()
        google_limiter, google_timestamp = rate_limit(google_limiter, google_timestamp, False)

        # Dodging nulls 
        if 'values' in snapshots:
            # Run the data on each tweet 
            next_period = time.time() + (15)
            while(period_count <= periods):

                # First, we wait
                duration = next_period - time.time()
                if duration > 0:
                    time.sleep(duration)

                # Tracking the proper columns to dump into 

                period = num_to_letter(int(period_count*4)+5)
                period_end = num_to_letter(int(period_count*4)+9)
                # Process the snapshots 
                snap_range = 2

                for snapshot in snapshots['values']:
                    # Set the Twitter API endpoint
                    #SNAPSHOT_ENDPOINT = f'https://api.twitter.com/2/tweets/{snapshot[0]}'

                    # Send the request to the Twitter API
                    #snapshot_data = requests.get(SNAPSHOT_ENDPOINT, headers=search_headers)

                    #if(response.status_code == 200):
                        # Extract the tweet data from the response
                        #snapshot_data = snapshot_data.json()
                    tweet_id = snapshot[0]
                    LIKE_API_ENDPOINT = f'https://api.twitter.com/2/tweets/{tweet_id}/liking_users'
                    RETWEET_API_ENDPOINT = f'https://api.twitter.com/2/tweets/{tweet_id}/retweeted_by'
                    likes, like_limiter, like_timestamp = handle_tokens(0, LIKE_API_ENDPOINT, like_limiter, like_timestamp)
                    retweets, retweet_limiter, retweet_timestamp = handle_tokens(0, RETWEET_API_ENDPOINT, retweet_limiter, retweet_timestamp)

                    # Dodging null errors
                    #if 'data' in snapshot_data and snapshot_data['data'] :
                    if True:
                        # Package up the link to the tweet, the content of the tweet, and the number of likes, retweets, comments, and views
                        snapshot_body = [
                            #snapshot_data['favorite_count'],
                            #snapshot_data['retweet_count'],
                            #snapshot_data['reply_count'],
                            #snapshot_data['view_count']
                            likes,
                            retweets,
                            'replies',
                            'views'
                        ]

                        SNAPSHOT_DEST_RANGE_NAME = f'Metrics {page}!{period}{snap_range}:{period_end}{snap_range}'
                        payload = {
                            'range': SNAPSHOT_DEST_RANGE_NAME,
                            'majorDimension': 'ROWS',
                            'values': [snapshot_body]
                        }

                        # Push the tweet to the destination sheet 
                        google_limiter, google_timestamp = rate_limit(google_limiter, google_timestamp, False)
                        client.spreadsheets().values().update(spreadsheetId=DEST_SPREADSHEET_ID, range=SNAPSHOT_DEST_RANGE_NAME, valueInputOption='RAW', body=payload).execute()
                    snap_range += 1

                # Iterate    
                period_count += 1

               #next_period = time.time() + (60 * 60 * hours_per)
                next_period = time.time() + 5

# Helper methods 

# Iterates through pagination tokens for multiple pages of responses
def handle_tokens(count, url, limiter, timestamp, params = {'pagination_token': None}):
    limiter, timestamp = rate_limit(limiter, timestamp, True)
    response = requests.get(url, headers=search_headers, params = params)
    print(url)
    print(response)
    if response.status_code == 400:
        print(response.json())
    if response.status_code == 429:
        print(limiter)
    if response.status_code == 200:
        response = response.json()
        print(f'before add: {count}')
        if "next_token" in response['meta']:
            pagination_token = response['meta']['next_token']
            print(f'before recursion: {count}')
            count, limiter, timestamp = handle_tokens(count, url, limiter, timestamp, params = {'pagination_token': pagination_token})
            print(f'after recursion: {count}')
        add = response['meta']['result_count']
        print('adding:{add}')
        count += response['meta']['result_count']
        print(f'after add: {count}')
    return count, limiter, timestamp

# Prevents rate limits from being hit 
def rate_limit(limiter, timestamp, twitter=True):
    if twitter:
        limiter += 1
        #print(f'twitter limiter: {limiter}')
        if limiter >= 74: # Prevents hitting limit of 75
            duration = 900 - (time.time() - timestamp)
            if duration>0:
                time.sleep(duration)
            timestamp = time.time()
            limiter = 0
    else:
        limiter += 1
        #print(f'google limiter: {limiter}')
        if limiter >= 59: # Prevents hitting limit of 100 (google sheets)
            duration = 60 - (time.time() - timestamp)
            if duration>0:
                time.sleep(duration)
            timestamp = time.time()
            limiter = 0
    return limiter, timestamp

# Converts a column # to base 26 LetterLetter format 
def num_to_letter(num):
    if num <= 26:
        return chr(num + 64)
    else:
        return num_to_letter(num // 26) + num_to_letter(num % 26)

# Run the program 
if __name__ == '__main__':
  main()

  # next: see if adding a 1 call/second rate limit allows me to use full archive search
  # add try catch blocks for small errors 