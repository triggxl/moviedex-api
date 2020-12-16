import { Component } from 'react';

import './App.css';

//initial state
//methods
//fetch
//setState
//render
//return

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieName: '',
      genre: '',
      country: '',
      avgVote: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.movieName)
    fetch(`http://localhost:8000/movies?name=${this.state.movieName}`).then(res => {
      //!res.ok
    return res.json()
    }).then(data => console.log(data));
  }
  componentDidMount() {

  }

  //controlled input pattern: onChange sets state and value that uses the state
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>Movies:</label>
          {/* setting controlled input */}
          <input onChange={(e)=> {this.setState({ movieName: e.target.value})}} value={this.state.movieName}/>
          <label>Genres:</label>
          <input/>
          <label>Country:</label>
          <input/>
          <button>Search</button>
        </form>
      </div>
    );
  }
 
}

export default App;
