import React, {Component} from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    //this.performSearch('')
    this.showPopular()
  }

  showPopular() {
    const apiKey = "49851f053762c80246a0b90cc5b8a039"
    const urlString = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&language=pt-BR&api_key="+ apiKey

    $.ajax({
      url: urlString,
      success: (searchResults) => {
        const results = searchResults.results

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error ("Failed to fetch data");
      }
    })
  }

  performSearch(searchTerm) {
    const apiKey = "49851f053762c80246a0b90cc5b8a039"

    if (searchTerm === ""){
      this.showPopular()
    }else {
      const urlString = "https://api.themoviedb.org/3/search/movie?language=pt-BR&api_key=" + apiKey + "&query=" + searchTerm
      $.ajax({
        url: urlString,
        success: (searchResults) => {
          const results = searchResults.results

          var movieRows = []

          results.forEach((movie) => {
            movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
            const movieRow = <MovieRow key={movie.id} movie={movie}/>
            movieRows.push(movieRow)
          })

          this.setState({rows: movieRows})
        },
        error: (xhr, status, err) => {
          console.error("Failed to fetch data");
        }
      })
    }
  }

  searchChangeHandler(event){
    const searchTerm = event.target.value
    this.performSearch(searchTerm)
  }

  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
          <tr>
            <td>
              <img alt="app icon" width="50" src="green_app_icon.svg"/>
            </td>
            <td className="title">
              <h1>Movie Search</h1>
            </td>
          </tr>
          </tbody>
        </table>

        <input className="searchInput" placeholder = "Buscar filmes" onChange={this.searchChangeHandler.bind(this)}/>

        {this.state.rows}

      </div>
    );
  }
}

export default App;
