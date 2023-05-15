import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

// components for each route
import Home from "./components/Home";
import Errorpage from "./components/Errorpage";
import Navbar from "./components/Navbar";
import Movieslist from "./components/Movieslist";
import Movie from "./components/Movie";
import axios from "axios";

function App() {
  const [movieSearched, setMovieSearched] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchMovies = async (event) => {
    event.preventDefault();
    const API_KEY = "4e44d9029b1270a757cddc766a1bcb63";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

    try {
      const response = await axios.get(url);
      setMovieSearched(response.data.results);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Navbar searchMovies={searchMovies} query={query} rocky={setQuery} />

      <Routes>
        <Route index element={<Home movieSearched={movieSearched} />}></Route>
        <Route path="movie/:id" element={<Movie />}></Route>
        <Route path="movies/:type" element={<Movieslist />}></Route>
        <Route path="/*" element={<Errorpage />}></Route>
      </Routes>
    </>
  );
}

export default App;
