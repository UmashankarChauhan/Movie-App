import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ query, rocky, searchMovies }) => {
  return (
    <>
      <nav>
        <Link className="logo" to="/Movie-App">
          MOVIES
        </Link>
        <ul>
          <li>
            <Link to="/movies/popular">Popular</Link>
          </li>
          <li>
            <Link to="/movies/top_rated">Top Rated</Link>
          </li>
          <li>
            <Link to="/movies/upcoming">Upcoming</Link>
          </li>
        </ul>
        <form className="search" onSubmit={searchMovies}>
          <input
            type="search"
            placeholder="Search"
            value={query}
            onChange={(event) => rocky(event.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </nav>
    </>
  );
};

export default Navbar;
