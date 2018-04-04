require("dotenv").config();

const keys = require("./keys");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

var fs = require('fs');

var inquirer = require('inquirer')

var parameter = process.argv[2];

inquirer.prompt([
		{
			type: "list",
			message: "What would you like to do?",
			choices: ["Find my tweets", "Find a movie", "Find a song", "Surprise me!"],
			name: "functionChoice"
		}
	]).then(function(response) {
		if (response.functionChoice === "Find a movie") {
			inquirer.prompt([
					{
						type: "input",
						message: "What movie do you want to find?",
						name: "movieTitle"
					}
				]).then(function(movieResponse) {
						movieThis(movieResponse.movieTitle);
					})
		} else if (response.functionChoice === "Find my tweets") {
			myTweets();
		} else if (response.functionChoice === "Find a song") {
			inquirer.prompt([
					{
						type: "input",
						message: "What song do you want to find?",
						name: "songName",
						default: "The Sign Ace the Base"
					}
				]).then(function(songResponse) {
						spotifyThisSong(songResponse.songName)
					})
		} else if (response.functionChoice === "Surprise me!") {
			doThis();
		}
	})

function myTweets() {
	var params = {screen_name: 'jdauntchandler'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    //console.log(tweets);
	    for (i = 0; i < tweets.length; i++) {
	    	console.log("Tweet " + (i + 1) + ": " + tweets[i].text) 
	    	console.log("Created on " + tweets[i]['created_at']);
	    	console.log("---------------------------------")
	    	if (i > 20) {
	    		return;
	    	}
	    }
	  }
	});
}

function spotifyThisSong(songName) {
	
	songName = (typeof songName !== 'undefined') ? songName : "The Sign Ace of Base"

	spotify.search({type: 'track', query: songName}, function(err, data) {
		if (err) {
			return console.error(err);
		}

		if (data.tracks.items.length === 0) {
			console.log("Sorry, no results.")
		}

		if (data.tracks.items.length < 5) {
			for (i = 0; i < data.tracks.items.length; i++) {
				var artistName = JSON.stringify(data.tracks.items[i].artists[0].name, null, 2);
				var songName = JSON.stringify(data.tracks.items[i].name, null, 2)
				var previewLink = JSON.stringify(data.tracks.items[i]["external_urls"].spotify)
				var album = JSON.stringify(data.tracks.items[i].album.name)
				
				console.log("Artist: " + artistName)
				console.log("Song Name: " + songName)
				console.log("Album: " + album)
				console.log("Link to Spotify: " + previewLink)
				console.log("----------------------------------")
			}
		} else if (data.tracks.items.length >= 5) {
			for (i = 0; i < 5; i++) {
				var artistName = JSON.stringify(data.tracks.items[i].artists[0].name, null, 2);
				var songName = JSON.stringify(data.tracks.items[i].name, null, 2)
				var previewLink = JSON.stringify(data.tracks.items[i]["external_urls"].spotify)
				var album = JSON.stringify(data.tracks.items[i].album.name)
				
				console.log("Artist: " + artistName)
				console.log("Song Name: " + songName)
				console.log("Album: " + album)
				console.log("Link to Spotify: " + previewLink)
				console.log("----------------------------------")
			}
		}
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
	fs.readFile('random.txt', 'utf8', function(err, data) {
		if (err) {
			return console.error(err);
		}

		var array = data.split(",");

		if (array[0] === "spotify-this-song") {
			console.log("Searched for song " + array[1] + ":");			
			spotifyThisSong(array[1]);
		} else if (array[0] === "my-tweets") {
			console.log("Finding your tweets:")
			myTweets();
		} else if (array[0] === "movie-this") {
			console.log("Searched for movie " + array[1] + ":");
			movieThis(array[1])
		} else {
			console.log("Sorry, can't do anything right now!")
		}
		
	})
}