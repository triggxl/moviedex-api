require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const movieData = require('./moviedex-data');
const cors = require('cors');

const app = express();
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' })); //ternary if dev, if live (vercel)

app.get('/', (req, res) => {
  res.send('Hello World');
})

const validTypes = { movieData: 'genre', movieData: 'country', movieData: 'avg_vote'};

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');
  console.log(authToken, apiToken);
  if(!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unathorized request' });
  }
  next();
})

//separate middleware as cb into named fx to pass into app
const handleGetTypes = (req, res) => {
  res.json(validTypes);
}

// request handler
const handleGetMovie = (req, res) => {
  //iterate through data to match query
  let response = movieData.find(movieData => 
    movieData.film_title.toLowerCase().includes(req.query.film_title.toLowerCase())
  )
  res.json(response)
}
const handleGetGenre = (req, res) => {
  let response = movieData.find(movieData => 
    movieData.genre.toLowerCase().includes(req.query.genre.toLowerCase())
  )
  res.json(response)
}
const handleGetCountry = (req, res) => {
  let response = movieData.find(movieData => movieData.country.toLowerCase().includes(req.query.country.toLowerCase())
  )
  res.json(response)
}
const handleGetAvgVote = (req, res) => {
  let response = movieData.find(movieData => movieData.avg_vote.toLowerCase().includes(req.query.avg_vote.toLowerCase())
  )
  res.json(response)
}

// route
app.get('/movies', handleGetMovie)
app.get('/genres', handleGetGenre);
app.get('/country', handleGetCountry);
app.get('/avg_vote', handleGetAvgVote);

// //filter by type if valid

// app.get('/genres', handleGetGenre), (req, res) => {
//   let response = movieData['genre'];
//   if(req.query.genre) {
//     res = res.filter(movieData => {movieData.genre.toLowerCase().includes(req.query.genre.toLowerCase())});
//   }
//   res.json(response);
// }
// app.get('/country', handleGetCountry, (req, res) => {
//   let response = movieData['country'];
//   if(req.query.genre) {
//     res = res.filter(movieData => {movieData.country.toLowerCase().includes(req.query.country.toLocaleLowerCase())});
//   }
//   res.json(response);
// })
// app.get('/avg_vote', handleGetAvgVote, (req, res) => {
//   let response = movieData['avg_vote'];
//   if(req.query.avg_vote) {
//     res = res.filter(movieData.avg_vote.toLowerCase().includes(req.query.avg_vote.toLowerCase()));
//   }
//   res.json(response);
// })

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