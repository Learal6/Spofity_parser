from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
cors = CORS(app)

@app.route("/2023songs")
def csc_342_groups():
       
    with open('../top_tracks_2023.json', 'r') as file:
        data2023 = json.load(file)  # Load JSON data into a Python object
  
    return jsonify(data2023)  # Return the JSON response


if __name__ == '__main__':
    app.run(debug=True)