require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var requestType = process.argv[2];
var nodeArgs = process.argv;
var searchTerm = "";



fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
        console.log(error)
    } else {
        dataArr = data.split(",")
        requestType = dataArr[0]
      
        searchTerm = dataArr[1];
        searchTerm = dataArr[1].split(" ")
        searchTerm = searchTerm.join("+");
        
       
        if (requestType === "spotify-this-song") {
            runSpotify();
        } else if (requestType === "concert-this") {
            searchTerm= searchTerm.substring(1, searchTerm.length - 1);
            getThatConcert();
        }
    }
});

function getSearchTerm() {
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            searchTerm = searchTerm + "+" + nodeArgs[i];
        } else {
            searchTerm += nodeArgs[i];
        }
    } 
}

function getThatConcert() {

    getSearchTerm();
    
    console.log(searchTerm)
    var queryURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(
        function (response) {
            if (response.data.length === 0) {
                console.log("No concert for you! Try agian! \n")
                
            } else {
                var venue = response.data[0].venue.name;
                var city = response.data[0].venue.city;
                var date = response.data[0].datetime;
                var lineup = response.data[0].lineup;
    
                time = moment(date).format('MMMM Do YYYY, h:mm:ss a')
                console.log("Next show info for " + lineup + ":" + "\n");
                console.log("The concert will be at " + venue + "\n");
                console.log("In " + city + "\n");
                console.log("on " + time + "\n");
                
            }
        }
    );
}

function runSpotify() {
 
    getSearchTerm();
    
    if (nodeArgs.length === 3) {
        searchTerm = "the sign ace of base";
    }
  
    spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var albumName = data.tracks.items[0].album.name;
        var artistName = data.tracks.items[0].album.artists[0].name;
        var songSpotifyURL = data.tracks.items[0].external_urls.spotify;
        var songName = data.tracks.items[0].name;

        console.log("The artist name is " + artistName + "\n");
        console.log("the album it is on is " + albumName + "\n");
        console.log("click to hear song: " + songSpotifyURL + "\n");
        console.log("The song name is " + songName + "\n");
    });
}

if (requestType === "spotify-this-song") {
    runSpotify();
} else if (requestType === "concert-this") {
    getThatConcert();
}

