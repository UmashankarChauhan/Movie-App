import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import { useParams } from "react-router-dom";
import "./Movieslist.css";

const Movieslist = () => {
  const [moviesList, setMoviesList] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    const API_KEY = "4e44d9029b1270a757cddc766a1bcb63";
    const MOVIES_URL = `https://api.themoviedb.org/3/movie/${
      type ? type : "popular"
    }?api_key=${API_KEY}`;

    axios.get(MOVIES_URL).then((response) => {
      setMoviesList(response.data.results);
    });
  }, [type]);

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list__cards">
        {moviesList.map((movie) => (
          <Cards movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default Movieslist;
