import React from 'react';
import Button from '@material-ui/core/Button';

class MovieRow extends React.Component{
  viewMovie() {
    const url = "https://www.themoviedb.org/movie/" + this.props.movie.id
    window.location.href = url
  }

  render() {

    return <table key={this.props.movie.id} className="movieRow">
      <tbody>
        <tr>
          <td>
            <img className="moviePoster" alt="poster" width="120" src={this.props.movie.poster_src}/>
          </td>
          <td className="movieInfo">
            <h3 className="movieTitle">{this.props.movie.title}</h3>
            <p className="movieOverview">{this.props.movie.overview}</p>
            <Button variant="contained" color="primary" onClick={this.viewMovie.bind(this)}>
              Ver mais
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  }
}

export default MovieRow;