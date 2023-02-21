README.md 
Gallery Scraper V 1.0
December 18, 2022

//
If you like my work and would like to contract me, contact me on linkedin: 
https://www.linkedin.com/in/edward-mortimer-5a428b9b/
I am also available on Upwork:
https://www.upwork.com/freelancers/~01d2b0f06f868713dc

Hello, 

This is a webscraper written for OFStudio. It serves as a business agility tool that quickly consolidates leads as a list of contacts from a web gallery. 

It is written to be modular so as to act as a "universal key" and work on a series of different websites. 

USAGE: 
To run gallery scraper: 

1. Ensure python is installed on your computer. For more information, see https://www.python.org/about/gettingstarted/

2. Navigate to the parent folder of galleryscraper.py and run:

pip install -r requirements.txt 

- from the command line. 

3. Once the packages have finished installing, run:

galleryscraper.py 

- and follow the instructions. 

4. The scraper will print results to a csv file named after the website to a local folder called "results".


DISCLAIMER: 

I am not responsible for how this technology is used. Once delivered it is the licensed property of the client. 

TODO: 

UI:
Build UI for searching csv as a a database

Modes:
When you run galleryscraper, you have access to 3 different modes. Each mode works using a slightly different mechanism that may be more or less appropriate depending on how the page is designed. If galleryscraper is not working properly on a website, try running it again using a different mode.