import { useState, useEffect, type FormEvent } from 'react';

interface Movie {
  id: number;
  title: string;
  genre: string;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const API_URL = 'http://127.0.0.1:8000/api/movies/';

  const fetchMovies = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: Movie[]) => setMovies(data))
      .catch((err) => console.error('Грешка при зареждане:', err));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !genre) return;

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, genre }),
    })
      .then((res) => res.json())
      .then((newMovie: Movie) => {
        setMovies((prevMovies) => [...prevMovies, newMovie]);
        setTitle('');
        setGenre('');
      })
      .catch((err) => console.error('Грешка при запис:', err));
  };

  const handleDelete = (id: number) => {
    fetch(`${API_URL}${id}/`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
        }
      })
      .catch((err) => console.error('Грешка при изтриване:', err));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h1 className="text-center mb-4">🎬 Моят Филмов Списък</h1>
      <div className="card p-4 mb-4 shadow-sm">
        <form onSubmit={handleSubmit} className="row g-2">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Заглавие..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Жанр..."
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              +
            </button>
          </div>
        </form>
      </div>

      <ul className="list-group">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{movie.title}</strong>{' '}
              <span className="badge bg-info text-dark ms-2">{movie.genre}</span>
            </div>
            <button
              onClick={() => handleDelete(movie.id)}
              className="btn btn-outline-danger btn-sm"
            >
              Изтрий
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;