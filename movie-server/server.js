require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const movieData = require('./moviedex-data');
const cors = require('cors');

const app = express();
app.use(morgan('dev')); //tracks logging
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' })); //ternary if dev, if live (vercel)

app.get('/', (req, res) => {
  res.send('Hello World');
})

process.env.API_TOKEN;
console.log(process.env.API_TOKEN)

const validTypes = { movieData: 'genre', movieData: 'country', movieData: 'avg_vote'};

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');
  console.log('validate bearer token middleware');
  if(!authToken || authToken.split(' ')[1] !== apiToken) {
    res.status(401).json({ error: 'Unathorized request' });
  }
  next();
})

//separate middleware as cb into named fx to pass into app
const handleGetTypes = (req, res) => {
  res.json(validTypes);
}

// route handler
const handleGetMovie = (req, res) => {
  console.log('abc')
  //iterate through data to match query
  let response = movieData.find(movieData => 
    movieData.film_title.toLowerCase().includes(req.query.film_title.toLowerCase())
  )
  res.json(response)
  console.log(response)
}
const handleGetGenre = (req, res) => {
  res.json(movieData['genre'])
}
const handleGetCountry = (req, res) => {
  res.json(movieData['country'])
}
const handleGetAvgVote = (req, res) => {
  res.json(movieData['avg_vote'])
}

// route
app.get('/movies', handleGetMovie)
// app.get('/genres', handleGetTypes);
// app.get('/country', handleGetTypes);
// app.get('/avg_vote', handleGetTypes);

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

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
})