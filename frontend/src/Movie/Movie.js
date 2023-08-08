import axios from "axios";
import { useEffect, useState } from "react";

function Movie() {
  const [id, setId] = useState("");
  const [moviename, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [tickets, setTickets] = useState("");

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://localhost:8686/api/movie/");
    setMovies(result.data.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8686/api/movie/add/", {
        moviename: moviename,
        genre: genre,
        tickets: tickets,
      });
      alert("Movie added successfully!");

      Load();
    } catch (err) {
      alert("Adding to Movie failed!");
    }
  }
  async function editMovie(movies) {
    setName(movies.moviename);
    setGenre(movies.genre);
    setTickets(movies.tickets);
    setId(movies.id);
  }

  async function deleteMovie(id) {
    await axios.delete("http://localhost:8686/api/movie/delete/" + id);
    alert("Movie deleted successfully!");
    Load();
  }

  async function update(event) {
    event.preventDefault();

    try {
      await axios.put(
        "http://localhost:8686/api/movie/update/" +
          movies.find((u) => u.id === id).id || id,
        {
          id: id,
          moviename: moviename,
          genre: genre,
          tickets: tickets,
        }
      );
      alert("Movie updated!");
    } catch (err) {
      alert("Movie update failed!");
    }
  }

  return (
    <div>
      <h1>Movie Thetre</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>Movie Name</label>
            <input
              type="text"
              className="form-control"
              id="moviename"
              value={moviename}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Genre</label>
            <input
              type="text"
              className="form-control"
              id="genre"
              value={genre}
              onChange={(event) => {
                setGenre(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Tickets</label>
            <input
              type="text"
              className="form-control"
              id="tickets"
              value={tickets}
              onChange={(event) => {
                setTickets(event.target.value);
              }}
            />
          </div>

          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Add
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>

      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Movie ID</th>
            <th scope="col">Movie Name</th>
            <th scope="col">Genre</th>
            <th scope="col">Ticket</th>

            <th scope="col">Option</th>
          </tr>
        </thead>
        {movies.map(function fn(movie) {
          return (
            <tbody>
              <tr>
                <th scope="row">{movie.id} </th>
                <td>{movie.moviename}</td>
                <td>{movie.genre}</td>
                <td>{movie.tickets}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => editMovie(movie)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteMovie(movie.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default Movie;
