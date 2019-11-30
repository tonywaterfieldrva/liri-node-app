
require("dotenv").config();
//var keys = require("./keys.js");

let axios = require("axios");
let Spotify = require("node-spotify-api");
let fs = require("fs");
let spotifyKeys = require("./keys.js");
let spotify = new Spotify(spotifyKeys.spotify);

var moment = require("moment");
const [node, file, ...args] = process.argv;

if (args[0] === "movie-this") {
    if(args[1] === undefined) {
        getMovie("Mr. Nobody");
    }
else {
        getMovie(args.slice(1).join("+"));
}
};

/// 
if (args[0] === "spotify-this-song"){ 
    if (args[1] === undefined) {
        spotifySong("The Sign");
   }
   else {
       let songTitle = args.slice(1).join(" ");
        spotifySong(songTitle);
   }
};

if (args[0] === "concert-this"){ 
    if (args[1] === undefined) {
        concert_info("The Sign");
   }
   else {
       let bandRequest = args.slice(1).join(" ");
        // console.log(bandRequestno);
         concert_info(bandRequest);
   }
};

 if (args[0] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error);
        }
        
       dataArr = data.split(",");
       if (dataArr[0] === "movie-this") {
           if (dataArr[1] === undefined) {
               getMovie("Mr. Nobody");
           }
            else {
                getMovie(dataArr[1].split().join("+"));
            }
       };
    
       if (dataArr[0] === "spotify-this-song") {
           if (dataArr[1] === undefined) {
               spotifySong("The Sign");
            }
            else {
                spotifySong(dataArr[1]);
            }
        };
    });
};
/////////functions///////////////
function getMovie(movieName) {
    console.log("getMovie: " + movieName);
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=332a2c62";
    console.log(queryURL);
    axios.get(queryURL).then(
        function(movieResponse){
            console.log("Title: " + movieResponse.data.Title);
            console.log("Year: " + movieResponse.data.Year);
            console.log("Rated: " + movieResponse.data.imdbRating);
            console.log("Country: " + movieResponse.data.Country);
            console.log("Language: " + movieResponse.data.Language);
            console.log("Plot: " + movieResponse.data.Plot);
            console.log("Actors: " + movieResponse.data.Actors);
            console.log("Rotten Tomatoes: " + movieResponse.data.Ratings[1].Value);
    
        }

    );
};

function spotifySong(songName){
    spotify.search({ type: "track", query: songName, limit: 5, }, function (err, data) {
        if (err) {
            console.log("Error Occurred: " + err);
        }
        data.tracks.items.forEach(function (element) {
            console.log("----------------------------");
            console.log("Artist: " + element.artists[0].name);
            console.log("Song: " + songName);
            console.log("Spotify preview link: " + element.preview_url);
            console.log("Album: " + element.album.name);
        });
    })
};   
  

    function concert_info(bandRequest) {
     //   console.log("concert_info function");
        var queryURL = "https://rest.bandsintown.com/artists/" + bandRequest + "/events?app_id=codingbootcamp";
    
        console.log(queryURL); 
    
        axios.get(queryURL).then(
              function(bandResponse){
                // console.log("----------------------------");
                // console.log("Venue: " + bandResponse.data[0].venue.name);
                // console.log("City: " + bandResponse.data[0].venue.city);
                // console.log(moment(bandResponse.data[0].datetime).format("MM/DD/YYYY"));
                console.log(bandResponse);    
            }
        );
    };  

