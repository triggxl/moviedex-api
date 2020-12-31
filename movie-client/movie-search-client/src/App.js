import dotenv from 'dotenv';
dotenv.config();
import { Component } from 'react'; // eslint-disable-line
import './App.css'; // eslint-disable-line


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      film_title: '',
      genre: '',
      country: '',
      avg_vote: '',
      data: []
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_API_TOKEN);
    fetch(`http://localhost:8000/movies?film_title=${this.state.film_title}`+
    `&genre=${this.state.genre}&country=${this.state.country}&avg_vote=${this.state.avg_vote}`, {
      headers: {
        'Authorization': `Bearer: ${process.env.REACT_APP_API_TOKEN}`
      }
    })
      .then(res => {
        return res.json()
      })
      .then(data => this.setState({ data }));
  }
  //controlled input pattern: includes an onChange sets state and value that uses the state
  render() {
    return (
      <div className="App">
        <div className="title">The Movie Search App</div>
        <form onSubmit={this.handleSubmit}>
          <label>Movies:</label>
          {/* setting controlled inputs */}
          <input onChange={(e) => { this.setState({ film_title: e.target.value }) }} value={ this.state.film_title } />
          <label>Genre:</label>
          <input onChange={(e) => { this.setState({ genre: e.target.value }) }} value={ this.state.genre } />
          <label>Country:</label>
          <input onChange={(e) => { this.setState({ country: e.target.value }) }} value={ this.state.country } />
          <label>Average Votes:</label>
          <input onChange={(e) => this.setState({ avg_vote: e.target.value })} value={ this.state.avg_vote } />
          <button>Search</button>
        </form>
        {/* output movie data to client (need to filter then map)*/}
        {this.state.data ? this.state.data.map((data) =>
          <ul>
          Movie Name: {data.film_title}{''}<br />
          Genre: {data.genre}{' '}<br />
          Country: {data.country}{' '}<br />
          Number of Votes: {data.avg_vote}
          </ul>) : null
        }
      </div>
    );
  }
}

export default App;


//initial state
//methods
//fetch
//setState
//render
//return

// componentDidMount() {
  //   Promise.all([
  //     fetch(`http://localhost:8000/movies?name=${this.state.film_title}`),
  //     fetch(`http://localhost:8000/`),
  //     fetch(`http://localhost:8000/`),
  //     fetch(`http://localhost:8000/`)
  //   ])
  //   .then(([res1, res2, res3, res4 ]) => [res1.json(), res2.json(), res3.json(), res4.json()])
  //   .then(([data1, data2]) => this.setState({
  //   }))
  // }
  //https://stackoverflow.com/questions/49754270/multiple-fetch-requests-with-setstate-in-react
//API on 8000 