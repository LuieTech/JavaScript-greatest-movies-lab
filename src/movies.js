// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?

// const movies = require('./data.js')
// console.log(movies.length)

function getAllDirectors(moviesArray) {
    return moviesArray.map(movie => movie.director)
}

//Bonus 1.1:

function filteringDirectors(moviesArray, getDirectors) {

    const newArray = [];

    const allDirectors = getDirectors(moviesArray)

    allDirectors.forEach(element => {
        if(!newArray.includes(element)) newArray.push(element)
    });

    return  newArray;

}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

function howManyMovies(moviesArray) {

    const filteredArray = moviesArray.filter(movies => movies.director === "Steven Spielberg").filter(movie => movie.genre.includes("Drama"));

    return filteredArray.length;

}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {

    if(!moviesArray.length) return 0

    const filteredArray = moviesArray.reduce((acc, cv) => {
        if(!cv.score) cv.score = 0;
        return acc + cv.score
    }, 0)
    
    const averageResult = filteredArray / moviesArray.length
    return Math.round(averageResult * 100) / 100

}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {

    const dramaMovies = moviesArray.filter(movie => movie.genre.includes("Drama"))
    return scoresAverage(dramaMovies)

}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {

    const copyArray = JSON.parse(JSON.stringify(moviesArray));
    const sortedArray = copyArray.sort((a, b) => {
        if(a.year == b.year) return a.title.localeCompare(b.title)
        return a.year - b.year
    })

    return sortedArray;

}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {

    const copyArray = JSON.parse(JSON.stringify(moviesArray));
    return copyArray.sort((a, b) => {
        return a.title.localeCompare(b.title)
    }).map(a => a.title).slice(0,20)
    
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {

    const copyArray = JSON.parse(JSON.stringify(moviesArray));
    const copyArray2 = copyArray.map(element => {
        let sum = 0;
        let newDuration = element.duration.split(" ")
        let newHour = Number(newDuration[0][0]) * 60
        let newMinutes = newDuration[1] ? parseInt(newDuration[1]) : 0
        sum = newHour+newMinutes
        return {
            ...element, duration : sum 
        }

    });

    return copyArray2;

}


// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {

    if (moviesArray.length === 0) return null;

    const bestAvg = moviesArray.reduce((accumulator, currentValue) => {
        if (accumulator[currentValue.year]) {
            accumulator[currentValue.year].push(currentValue.score)
        } else {
            accumulator[currentValue.year] = [currentValue.score]
        }
        return accumulator;
    }, {})    

    const objectFinal = Object.keys(bestAvg)
        .map((cur) => ({
            year: cur,
            score: bestAvg[cur].reduce((acc, current) => acc + (current / bestAvg[cur].length), 0) 
        }))
        .sort((a,b) => b.score - a.score)

    return "The best year was " + objectFinal[0].year + " with an average score of " + objectFinal[0].score;

}



