import { useState, type FormEvent } from 'react';

type Movie = {
  id: number;
  title: string;
  genre: string;
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([
    { id: 1, title: 'Inception', genre: 'Sci-Fi' },
    { id: 2, title: 'The Dark Knight', genre: 'Action' }
  ]);

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !genre.trim()) return;

    const newMovie: Movie = {
      id: Date.now(),
      title: title.trim(),
      genre: genre.trim(),
    };

    setMovies((prevMovies) => [...prevMovies, newMovie]);
    setTitle('');
    setGenre('');
  };

  const handleDelete = (id: number) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
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