// import dotenv from ('dotenv').config();
import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      film_title: '',
      genre: '',
      country: '',
      avg_vote: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.movieName)
    fetch(`http://localhost:8000/movies?film_title=${this.state.film_title}`).then(res => {
      //!res.ok
    return res.json()
    }).then(data => this.setState({...data}));
  }
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
//API on 8000 
  //controlled input pattern: includes an onChange sets state and value that uses the state
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>Movies:</label>
          {/* setting controlled input */}
          <input onChange={(e)=> {this.setState({ film_title: e.target.value })}} value={this.state.film_title}/>
          <label>Genres:</label>
          <input onChange={(e) => {this.setState({ genre: e.target.value })}} value={this.state.genre}/>
          <label>Country:</label>
          <input onChange={(e) => {this.setState({ country: e.target.value })}} value={this.state.country}/>
          <label>Average Votes:</label>
          <input onChange={(e) => this.setState({ avgVote : e.target.value })} value={this.state.avg_vote}/>
          <button>Search</button>
        </form>
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
