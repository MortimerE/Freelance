#galleryscraper.py

import requests
from bs4 import BeautifulSoup
import csv

#get the website from the user
site_url = input("Please input the url for the starting page of the gallery you would like to crawl:")

#first, a list of every page in the gallery
gallery_pages = [site_url]
url = site_url
while True:
  # Send an HTTP request to the current page and retrieve the HTML
  response = requests.get(url)
  html = response.text
  soup = BeautifulSoup(html, 'html.parser')

  # Find the link to the next page in the web gallery
  next_link = soup.find('a', class_='next-link')
  if not next_link:
    break
  url = next_link['href']

  #append link to list
  gallery_pages.add(url)


#next, a list of items in each gallery page  
gallery_items = []
for page_url in gallery_pages:
    response = requests.get(page_url)
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    # Find the link for each gallery item and add it to the list
    next_link = soup.findAll('a', class_='next-link')
    for element in next_link:
        gallery_items.append(element['href'])

#finally, the gallery info
galleries = []
# Find all the elements on the page that contain the information you're interested in
elements = soup.find_all('div', class_='sqs-block-content')
# Loop through the elements and extract the information you want
#next, a list of pages in the gallery
for element in elements:
    name = element.find('a').text
    location = element.find('p').text
    website = element.find('a', href=True)['href']
    contact_email = element.find('a', href=True)['href']

    #populate list 
    galleries.append(["name":name, "location":location, "website":website, "contact_email":contact_email])

  
# to csv
delimiter = url.find('.')
filename = url[:delimiter]
# Open a CSV file in write mode
with open(f"results/{'filename'}.csv", "w") as f:
    # Create a CSV writer object
    writer = csv.writer(f)
    
    # Iterate over the retweets
    for gallery in galleries:
        # Write the screen name of the retweeting user to the CSV file
        writer.writerow(gallery)