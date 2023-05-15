import { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import "./Home.css";
import Movieslist from "./Movieslist";
import Cards from "./Cards";

const Home = ({ movieSearched }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const API_KEY = "4e44d9029b1270a757cddc766a1bcb63"; // Replace with your own API key
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

    axios
      .get(url)
      .then((response) => {
        const results = response.data.results;
        setMovies(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="home">
      {movieSearched.length !== 0 ? (
        movieSearched.map((movie) => <Cards movie={movie} key={movie.id} />)
      ) : (
        <>
          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}
          >
            {movies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="carousel"
              >
                <div className="posterImage">
                  <img
                    src={`https://image.tmdb.org/t/p/original${
                      movie && movie.backdrop_path
                    }`}
                    alt={movie.title}
                  />
                </div>
                <div className="posterImage__overlay">
                  <div className="posterImage__title">
                    {movie ? movie.original_title : ""}
                  </div>
                  <div className="posterImage__runtime">
                    {movie ? movie.release_date : ""}
                    <span className="posterImage__rating">
                      {movie ? movie.vote_average : ""}
                      <FaStar />
                    </span>
                  </div>
                  <div className="posterImage__description">
                    {movie ? movie.overview : ""}
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
          <Movieslist />
        </>
      )}
    </div>
  );
};

export default Home;
