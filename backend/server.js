const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
server.use(cors());
server.use(bodyParser.json());

// create database connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbtheatre",
});

// connect to db
db.connect(function (error) {
  if (error) {
    console.log("Can not connect to DB.");
  } else {
    console.log("Connected to DB successfully.");
  }
});

server.listen(8686, function check(error) {
  if (error) {
    console.log("Can not listen to port 8686.");
  } else {
    console.log("Server started on port 8686.");
  }
});

// GET request to view record
server.get("/api/movie", (req, res) => {
  var sql = "SELECT * FROM movie";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Can not connect to DB.");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// POST request to create records
server.post("/api/movie/add", (req, res) => {
  let details = {
    moviename: req.body.moviename,
    genre: req.body.genre,
    tickets: req.body.tickets,
  };

  let sql = "INSERT INTO movie SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      console.error("MySQL Error:", error);
      res.send({ status: false, message: "Movie creation failed!" });
    } else {
      res.send({ status: true, message: "Movie created successfully!" });
    }
  });
});

// GET request to serch records
server.get("/api/movie/:id", (req, res) => {
  var movid = req.params.id;
  var sql = "SELECT * FROM movie WHERE id=" + movid;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Can not connect to DB.");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// PUT request to update records
server.put("/api/movie/update/:id", (req, res) => {
  let sql =
    "UPDATE movie SET moviename='" +
    req.body.moviename +
    "', genre='" +
    req.body.genre +
    "', tickets='" +
    req.body.tickets +
    "' WHERE id=" +
    req.params.id;

  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Movie update failed!" });
    } else {
      res.send({ status: true, message: "Movie updated successfully!" });
    }
  });
});

// DELETE request to delete records

server.delete("/api/movie/delete/:id", (req, res) => {
  let sql = "DELETE FROM movie WHERE id=" + req.params.id + "";
  db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Movie delete failed!" });
    } else {
      res.send({ status: true, message: "Movie deleted successfully!" });
    }
  });
});
