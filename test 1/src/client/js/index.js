// import the movies array from the supplied data file.
// write the array to the console, so you can see that they are loading properly
/* call insertMoviesIntoTable, 
    give it a reference to the table you want to populate,
    and the list of movies you want to show in the table */
// show the table

// get a list of `pinnedMovies` from local storage
// log them out so you can see that you have working pins
// if there are no pinned movies, put a message on the screen that says so
// but if there are, hide the message
/* call insertMoviesIntoTable, 
    give it a reference to the table you want to populate,
    and the list of movies you want to show in the table */
// show the table



/* 
 *  getPinnedMoviesFromStorage
 *  This should take no parameters, and return an array.
 */
function getPinnedMoviesFromStorage() {
}

/*
 *  insertMoviesIntoTable
 *  This should take two parameters,
 *  - a reference to the table you want to populate
 *  - a list of movies to put in the table
 *  It should return nothing
 */
function insertMoviesIntoTable(eleTable, movies) 
{
    // sort the list of movies by rating, highest to lowest
    // for each movie
        // insert a row
        // insert a cell for each attribute of a movie
        // the datetime is a "unix timestamp", measured in seconds.  
        //   javascript dates are measured in milliseconds.
        //   convert this timestamp to a javascript date and print out the date as a normal string in english
        // create a new button element
        // look in local storage to see if this item is already pinned
        //   if it's already pinned, make it red, otherwise make it blue
        // set the html so it shows a font-awesome icon
        //   if it's already pinned, show an x, otherwise show a pencil
        // add an event listener, when this button is clicked...
            // if it is, remove it from the list
            // it it's not, add it to the list 
            // refresh the page
        // create another table row and put the button in it
        // if a movie is rated two or below, make this row red
        // if this movie is rated higher than two but less than or equal to five, make this row orange
        // if this movie is rated higher than five but less than or equal to 8, make this row blue
        // if this movie is rated higher than eight, make this row green
        // if this movie is a drama, don't add it to the list
}
