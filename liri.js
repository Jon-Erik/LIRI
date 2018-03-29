require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var parameter = process.argv[2];

if (parameter === "my-tweets") {
	myTweets();
} else if (parameter === "spotify-this-song") {
	spotifyThisSong(process.argv[3]);
} else if (parameter === "movie-this") {
  	movieThis(process.argv[3]);
} else if (parameter === "do-what-it-says") {
	doThis();
}

function myTweets() {
	console.log("my tweets function");
}

function spotifyThisSong(songName) {
	console.log("spotify function on" + songName)
}

function movieThis(movieName) {
	console.log("movie function on " + movieName)
}

function doThis() {
	console.log("do this function");
}