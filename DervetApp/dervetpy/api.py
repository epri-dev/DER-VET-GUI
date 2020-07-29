from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
	return "Hello from python!"

if __name__ == "__main__":
	print("Flask server starting up...")
	app.run(host="127.0.0.1", port=5000)
