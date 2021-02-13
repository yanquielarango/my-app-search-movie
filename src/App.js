import React, { useState } from 'react';
import { useEffect } from 'react';
import Movie from './components/Movie';
import axios from 'axios';

const URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1cd94c5adb83441b100d72a4f5f121d7';

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=1cd94c5adb83441b100d72a4f5f121d7&query=";


const App = () => {
  const [ movies, setMovies ] = useState([]);
  const [ search, setSearch ] = useState('');


  useEffect( () => {
    const getMovies = async () => {
    
    const resultado = await axios(URL);
    console.log(resultado.data.results);
    setMovies(resultado.data.results);
  }
    
    getMovies();
    
  },[]);

  const handleOnSubmit = (e) => {
      e.preventDefault();

      if(search) {

      const getSearch = async () => {
    
    const resultado = await axios(SEARCH_API + search);
    console.log(resultado.data.results);
    setMovies(resultado.data.results);
  }
    
    getSearch();
    setSearch('');
    };
  }

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <>
      <header>
        <h3>MyMovies</h3>
        <form onSubmit={handleOnSubmit}>
          <input type="text"
            className="search"
            placeholder="Search..."
            value={search}
            onChange={handleOnChange}/>
        </form>
      </header>
        <div className="movie-container">
            {movies.length >0 && movies.map((movie) => (
              <Movie key={movie.id} {...movie}/>
            ))} 
        </div>
    </>
  )
}

export default App
