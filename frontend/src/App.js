import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async () => {
    const response = await fetch(`http://localhost:5000/search?query=${query}`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  const getMovieDetails = async (id) => {
    const response = await fetch(`http://localhost:5000/movie/${id}`);
    const data = await response.json();
    setSelectedMovie(data);
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <div>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>
      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie" onClick={() => getMovieDetails(movie.imdbID)}>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <div className="movie-details">
          <h2>{selectedMovie.Title}</h2>
          <p>{selectedMovie.Plot}</p>
          <p><strong>Year:</strong> {selectedMovie.Year}</p>
          <p><strong>Director:</strong> {selectedMovie.Director}</p>
        </div>
      )}
    </div>
  );
}

export default App;
