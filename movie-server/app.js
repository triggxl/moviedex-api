const express = require('express');
const morgan = require('morgan');
const movieData = require('./moviedex-data');

app = express();
app.use(morgan('dev'));

//params, logic, res.json()
app.use('/movies', (req, res) => { 
 const { search='' } = req.query;

 const results = movieData.filter(movieTerm => movieTerm.toLowerCase().includes(genre.toLowerCase()))
 if(!['genre'].includes(search)) {
   throw new Error('Seach category must either by genre');
 }
 if(search) {
   results.sort((a,b) => {
     return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
   })
 }
 res.json(results);
})

app.use('/movies/genre', (req, res) => {
  const { search='' } = req.query;

  const results = movieData.filter(movieTerm => movieTerm.toLowerCase().includes(genre.toLowerCase()))
  if(!['genre'].includes(search)) {
    throw new Error('Seach category must either by genre');
  }
  if(search) {
    results.sort((a,b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    })
  }
  res.json(results);
});
app.use('/movies/country', (req, res) => {
  const { search='' } = req.query;

  const results = movieData.filter(movieTerm => movieTerm.toLowerCase().includes(country.toLowerCase()))
  if(!['genre'].includes(search)) {
    throw new Error('Seach category must either by country');
  }
  if(search) {
    results.sort((a,b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    })
  }
  res.json(results);
  });
app.use('/movies/average-vote', (req, res) => {
  const { search='' } = req.query;

  const results = movieData.filter(movieTerm => movieTerm.toLowerCase().includes(avgVote.toLowerCase()))
  if(!['genre'].includes(search)) {
    throw new Error('Seach category must either by average vote (avg-vote)');
  }
  if(search) {
    results.sort((a,b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    })
  }
  res.json(results);
})

const PORT = 8000;

app.listen(`${PORT}`, console.log(`Now listening on http://localhost: ${PORT}`));