from flask import flask
import tweetcollector.py

app = Flask(__name__)

@app.route('/')
def hello():
    tweetcollector.main()
    return 'Running!'