require("dotenv").config();

const keys = require("./keys");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

var parameter = process.argv[2];

if (parameter === "my-tweets") {
	myTweets();
} else if (parameter === "spotify-this-song") {
	//console.log(process.argv.slice(3))
	// if (process.argv.slice(3) === []) {
	// 	spotifyThisSong(['The', 'Sign']);
	// } else {
		spotifyThisSong(process.argv.slice(3));
	//}
} else if (parameter === "movie-this") {
  	movieThis(process.argv.slice(3));
} else if (parameter === "do-what-it-says") {
	doThis();
} else {
	console.log("Please enter a valid command.")
}

function myTweets() {
	var params = {screen_name: 'jdauntchandler'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    //console.log(tweets);
	    for (i = 0; i < tweets.length; i++) {
	    	console.log("Tweet " + (i + 1) + ": " + tweets[i].text);
	    	if (i > 20) {
	    		return;
	    	}
	    }
	  }
	});
}

function spotifyThisSong(songName) {
	console.log(songName)
	if (songName === []) {
		songName.push("The", "Sign");
		console.log(songName);
	}
	spotify.search({type: 'track', query: songName}, function(err, data) {
		if (err) {
			return console.error(err);
		}

		var artistName = JSON.stringify(data.tracks.items[0].artists[0].name, null, 2);
		var songName = JSON.stringify(data.tracks.items[0].name, null, 2)
		var previewLink = JSON.stringify(data.tracks.items[0]["external_urls"].spotify)
		var album = JSON.stringify(data.tracks.items[0].album.name)
		
		console.log("Artist: " + artistName)
		console.log("Song Name: " + songName)
		console.log("Album: " + album)
		console.log("Link to Spotify: " + previewLink)
	});
}

function movieThis(movieName) {
	var request = require("request");

	request("http://omdbapi.com/?t=" + movieName + "&plot=short&apikey=trilogy",
		function(error, response, body) {
			if (!error && response.statusCode === 200) {
				
		    var answer = JSON.parse(body);
		   	console.log("Title: " + answer.Title);
		   	console.log("Year: " + answer.Year);
		   	
		   	if (typeof answer.Ratings[0] === 'undefined') {
		   		console.log("IMDB Rating: No information found.")
		   	} else {
				console.log("IMDB Rating: " + answer.Ratings[0].Value);   		
		   	}

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