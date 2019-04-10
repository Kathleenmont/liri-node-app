require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var requestType = process.argv[2];
var songTitle = ""
var nodeArgs = process.argv;

function runSpotify() {
    
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            songTitle = songTitle + "+" + nodeArgs[i];
        } else {
            songTitle += nodeArgs[i];
        }
    }

    if (nodeArgs.length === 3) {
        songTitle = "the sign ace of base";
    }
  
    spotify.search({ type: 'track', query: songTitle, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
            var albumName = data.tracks.items[0].album.name;
            var artistName = data.tracks.items[0].album.artists[0].name;
            var songSpotifyURL = data.tracks.items[0].external_urls.spotify;
            var songName = data.tracks.items[0].name;
           
            console.log("The artist name is " + artistName);
            console.log("the album it is on is " + albumName);
            console.log("click to hear song: " + songSpotifyURL);
            console.log("The song name is " + songName);
    }); 
}

if (requestType === "spotify-this-song") {
    runSpotify();
}



