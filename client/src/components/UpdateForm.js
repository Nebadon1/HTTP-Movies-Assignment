import React, { useState } from "react";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateForm = props => {
  const [movie, setMovie] = useState(initialMovie);
  

  const handleChange = e => {
    let value = e.target.value;
    if (e.target.name === "id") {
      value = parseInt(value, 10);
    } else if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMovie((movie.stars = movie.stars.split(" ")));

    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
      .then(res => {
        console.log("res from put", res);
        setMovie(initialMovie);
        props.history.push("/");
      });
  };

  return (
    <div>
      <h2>Update Movie Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="id"
          placeholder="Enter the ID"
          value={props.match.params.id}
        />
        <input
          type="text"
          name="title"
          placeholder="Enter the Title"
          value={movie.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          placeholder="Enter the Director"
          value={movie.director}
          onChange={handleChange}
        />
        <input
          type="number"
          name="metascore"
          placeholder="Enter the Metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
        <input
          type="text"
          name="stars"
          placeholder="Enter the Cast Stars"
          value={movie.stars}
          onChange={handleChange}
        />
        <button>Edit the Movie</button>
      </form>
    </div>
  );
};

export default UpdateForm;