import requests
from bs4 import BeautifulSoup

# Scrapes a tweet for metrics 

import re
import requests

def scrape_tweet(url):
    # Send a GET request to the tweet's URL
    response = requests.get(url)

    # Extract the relevant data from the HTML response using regular expressions
    likes = re.search(r'"favorite_count":(\d+)', response.text).group(1)
    comments = re.search(r'"reply_count":(\d+)', response.text).group(1)
    retweets = re.search(r'"retweet_count":(\d+)', response.text).group(1)
    replies = re.search(r'"quote_count":(\d+)', response.text).group(1)

    # Return the data as a dictionary
    return {
        "likes": likes,
        "comments": comments,
        "retweets": retweets,
        "replies": replies
    }


print(scrape_tweet('https://twitter.com/TheMARSmith/status/1351935511116603395?cxt=HHwWhoC7teeLhcMlAAAA'))