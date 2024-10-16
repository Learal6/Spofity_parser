from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import sys
import logging

app = Flask(__name__)
cors = CORS(app)

@app.route("/2023songs")
def search_songs():

    filtered = []

    searchBy = request.args.get('searchBy', default='title')
    sortBy = request.args.get('sortBy', default='popularity')
    includeExplicit = request.args.get('checkbox', default='true')
    songSearch = request.args.get('songSearch', default='')

    #handle a null value
    if songSearch == '':
        return filtered

    with open('../top_tracks_2023.json', 'r') as file:
        data2023 = json.load(file)

    #Filter data
    for song in data2023:
        if  includeExplicit == 'true':
            field = song[searchBy]
            if type(field) == list:
                for s in field:
                    if songSearch in s.lower():
                        filtered.append(song)
                    else: 
                        continue
            else:
                if songSearch in field.lower():
                    filtered.append(song)
        elif includeExplicit == 'false':
            #filter for non explicit songs
            if not song['explicit']:
                field = song[searchBy]
                if type(field) == list:
                    for s in field:
                        if songSearch in s.lower():
                            filtered.append(song)
                        else: 
                            continue
                else:
                    if songSearch in field.lower():
                        filtered.append(song)
 
    return filtered

def duration_sort():
    pass


if __name__ == '__main__':
    app.run(debug=True)