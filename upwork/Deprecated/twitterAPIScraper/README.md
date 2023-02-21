README.md 
Twitter Scraper V 1.0
December 24, 2022

//
If you like my work and would like to contract me, contact me on linkedin: 
https://www.linkedin.com/in/edward-mortimer-5a428b9b/
I am also available on Upwork:
https://www.upwork.com/freelancers/~01d2b0f06f868713dc
Coming soon: Turing, Fiverr, and Superprof

Hello, 

This is a webscraper written for Rickie of Studio Ontario. It serves as a business agility tool that quickly consolidates metadata regarding tweets from accounts of interest. 

It is written to use the twitter V2 API instead of a scraping library, or something like tweepy which relies on the v1.1 api. 

NOTES: 
This program retrieves the recent tweets (if there were any in the past 24 hours) of an account of interest using the v2 search API. It tracks each tweet over time. It will not see tweets that have been made in the past ~10-15 seconds. 
You could retrieve more than the most previous tweet by chaning the value of 'max_results' up to 100 (minimum 10).
You can also change the snapshot period by adjusting 'total_hours', and the length of the snapshot period by adjusting 'hours_per'.  Bear in mind that there are restrictions on how many periods can be tracked due to limitations built into the google sheets app. 
However, hours_per must never exceed total_hours, and total_hours must be divisible by hours_per. The total number of accounts * max_results * periods (total_hours/hours_per) must NEVER exceed 2500000 - (accounts * max_results * 8). For example, if you are querying 10k accounts, you are limited to 31 results per account. 
There is a rate limiter built into snapshots. This does result in some delays in processing for large loads. 



USAGE: 
To run gallery scraper: 

1. Adjust the code to collect account names from a google sheet and paste them to a different sheet by changing the variables in the API calls. 

2. Create a google cloud project and enable the sheets API. Create credentials for a service account that has access to the sheets API, and download the json key to the same folder as tweetcollector.

- Replace the name of the credentials file with the json key 

- Share the sheets from step 1 with the email account associated with the newly created service account 

3. Create a twitter developer account and apply for access to the "Search Tweets" API. Generate a consumer key and secret and copy/paste them into the code. 

- Note that rate limits apply, and if you are querying more than 180 tweets at a time you will have to upgrade your api subscription to "paid" tier, which allows 450 requests per 15 minutes. 

4. Ensure python is installed on your computer. For more information, see https://www.python.org/about/gettingstarted/

5. Navigate to the parent folder of tweetcollector.py and run:

pip install -r requirements.txt (requirements file coming soon)

- from the command line. 

6. Once the packages have finished installing, run:

tweetcollector.py 

7. The app will print results to the google sheet pointed to in the codea new page called "metrics" in the sheet pointed to by step 1

DISCLAIMER: 

I am not responsible for how this technology is used. I built this for educational purposes at the request of a client. Once delivered it is the licensed property of the client. Anyone who uses this code for nefarious purposes is responsible for their own decisions. 