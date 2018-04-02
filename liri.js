require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var parameter = process.argv[2];

if (parameter === "my-tweets") {
	myTweets();
} else if (parameter === "spotify-this-song") {
	spotifyThisSong(process.argv[3]);
} else if (parameter === "movie-this") {
  	movieThis(process.argv.slice(3));
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
	var request = require("request");

	request("http://omdbapi.com/?t=" + movieName + "&plot=short&apikey=trilogy",
		function(error, response, body) {
			if (!error && response.statusCode === 200) {
				
		    var answer = JSON.parse(body);
		   	console.log("Title: " + answer.Title);
		   	console.log("Year: " + answer.Year);
		   	
		   	console.log("IMDB Rating: " + answer.Ratings[0].Value);

		   	if (typeof answer.Ratings[1] === 'undefined') {
		   		console.log("Rotten Tomatoes Rating: No information found.")
		   	} else {
				console.log("Rotten Tomatoes Rating: " + answer.Ratings[1].Value);   		
		   	}
		   	
		   	console.log("Country of Production: " + answer.Country);
		   	console.log("Language: " + answer.Language);
		   	console.log("Plot: " + answer.Plot);
		   	console.log("Actors: " + answer.Actors)
			}
	})
}

function doThis() {
	console.log("do this function");
}