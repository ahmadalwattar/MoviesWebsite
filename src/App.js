import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar'
import MoviesList from './components/MoviesList';
import axios from 'axios';
import  { useEffect, useState } from 'react';
import {BrowserRouter , Route, Routes } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';

function App() {
  
const [movies, setMovies] = useState([])
const [totalPages, setTotalPages] = useState(0)

//Api get_movie_list
const getAllMovies = async () => {
  const res = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=7722b310b4b81ce4b71d02203eaf1283&language=en")
    setMovies(res.data.results)
    setTotalPages(res.data.total_pages)
}
//Api get_current_Page
const getPage = async (pageNumber) => {
  const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=7722b310b4b81ce4b71d02203eaf1283&language=en&page=${pageNumber}`)
    setMovies(res.data.results)
}

useEffect(() => {
  getAllMovies();
  console.log(movies)
},[])
//Api search_movie
const search =async (word) => {
  if (word === '') {
    getAllMovies();
  }else {
  const res = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${word}&api_key=7722b310b4b81ce4b71d02203eaf1283`)
  setMovies(res.data.results)
  setTotalPages(res.data.total_pages)
  }
}

  return (
    <div className="App">
      <NavBar search={search}/>
      <Container>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<MoviesList movies={movies} getPage={getPage} totalPages={totalPages}/>}/>
          <Route path="/movie/:id" element={<MovieDetails />}/>
        </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
