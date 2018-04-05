# LIRI
Language Interpretation and Recognition Interface

This is a basic node application which requires Twitter and Spotify API credentials to run (they will be recognized if put into a .env file). The command line accepts four different commands, sometimes with specified parameters, and outputs the information requested into the console.

## Commands

LIRI accepts the command line prompts `my-tweets`, `spotify-this-song Song Name`, `movie-this Movie Title`, and `do-what-it-says`.

### `my-tweets`

This command uses the twitter node module to log the 20 most recent tweets of the account specified in the code.

### `spotify-this-song Song Name`

This command uses the node-spotify-api node module to find the song's artist and title, a preview URL spotify link to the song, and the album the song is from. If no song name is entered along with the `spotify-this-song` command, the code will revert to a default song name and search for that title. A maximum of 5 possible tracks will be displayed.

### `movie-this Movie Title`

This command uses the request node module to access the Online Movie Database API. Using this command will return the movie's title, year of release, IMDB rating, Rotten Tomatoes rating, country of production, plot, and actors. If no movie title is entered along with the `movie-this` command, the code will revert to a default movie title and search for that movie.

### `do-what-it-says`

This command reads the text in a separate .txt file which is text for one of the three above commands. After reading it, the action taken will be printed to the console and the relevant information will be displayed.
