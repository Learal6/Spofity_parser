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
    app.logger.warning('testing warning log')

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

        #include all songs
        if includeExplicit == 'true':

            field = song[searchBy]

            if searchBy == 'title' and songSearch in field.lower():
                filtered.append(song)
                
            elif searchBy == 'genres' and type(field) == list:
                for s in field:
                    if songSearch.lower() in s.lower():
                        filtered.append(song)
                        break

            elif searchBy == 'artists' and type(field) == list:
                for s in field:
                    if songSearch.lower() in s.lower():
                        filtered.append(song)
                        break

        #filter out explicit songs
        elif includeExplicit == 'false':
    
            #dont add the song if its explicit
            if song.get('explicit', True):
                break
            
            else:
                field = song[searchBy]

                if searchBy == 'title' and songSearch in field.lower():
                    filtered.append(song)
                    
                elif searchBy == 'genres' and type(field) == list:
                    for s in field:
                        if songSearch.lower() in s.lower():
                            filtered.append(song)
                            break

                elif searchBy == 'artists' and type(field) == list:
                    for s in field:
                        if songSearch.lower() in s.lower():
                            filtered.append(song)
                            break
    return filtered

if __name__ == '__main__':
    app.run(debug=True)
 