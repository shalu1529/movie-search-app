import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MovieDetail from "./MovieDetail";

const API_KEY = "f52136d9";
const API_URL = "https://www.omdbapi.com/";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`${API_URL}?s=${searchTerm}&apikey=${API_KEY}`);
      if (res.data.Response === "True") {
        setMovies(res.data.Search);
      } else {
        setMovies([]);
        setError("No movies found!");
      }
    } catch (err) {
      setError("Failed to fetch data.");
    }

    setLoading(false);
  };

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Movie Search</h1>
      
      <div className="flex gap-2 my-4">
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={searchMovies}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
            <div className="border p-2 cursor-pointer">
              <img src={movie.Poster} alt={movie.Title} className="w-full h-40 object-cover" />
              <h2 className="text-lg font-bold mt-2">{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
 
  );
}

export default App;
