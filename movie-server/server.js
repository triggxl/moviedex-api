require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const moviesData = require('./moviedex-data');
const cors = require('cors');

const app = express();
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' })); //ternary if dev, if live (vercel)

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');
  console.log(authToken, apiToken);
  if(!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unathorized request' });
  }
  next();
})

// request handler
const handleGetMovie = (req, res) => {
  //iterate through data to match query
  let response = moviesData;

  if(req.query.film_title) {
    response = response.filter(movieData => 
    movieData.film_title.toLowerCase().includes(req.query.film_title.toLowerCase())
  )
  }
  if(req.query.genre) {
    response = response.filter(movieData => 
    movieData.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    )
  }
  if(req.query.country) {
    response = response.filter(movieData => 
    movieData.country.toLowerCase().includes(req.query.country.toLowerCase())
    )
  }
  if(req.query.avg_vote) {
    response = response.filter(movieData => 
    Number(movieData.avg_vote) >= Number(req.query.avg_vote)
    )
  }
  res.json(response)
}

// route
app.get('/movies', handleGetMovie)

app.use((error, req, res, next) => {
  let response;
  if(process.env.NODE_ENV === 'production') {
    response = { error : { message: 'server error' }};
  }else {
    response = { error };
  }
  res.status(500).json(response);
})
const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
})