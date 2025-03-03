import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_KEY = "f52136d9";
const API_URL = "https://www.omdbapi.com/";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${API_URL}?i=${id}&apikey=${API_KEY}`);
        if (res.data.Response === "True") {
          setMovie(res.data);
        } else {
          setError("Movie not found");
        }
      } catch (err) {
        setError("Failed to fetch data.");
      }
      setLoading(false);
    };
    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} className="w-full max-w-sm mx-auto" />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <Link to="/" className="text-blue-500">Go Back</Link>
    </div>
  );
}

export default MovieDetails;
