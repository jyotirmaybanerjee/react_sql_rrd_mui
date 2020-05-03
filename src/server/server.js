const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());

const port = 8000;
const USER_TABLE = "users";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB,
});

app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});

app.get("/api/users", (req, res) => {
  console.log("users");
  pool.query(`select * from ${USER_TABLE}`, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/api/user/:username", (req, res) => {
  pool.query(
    `select * from ${USER_TABLE} WHERE username='${req.params.username}'`,
    (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.post("/api/user", (req, res) => {
  const query = `INSERT INTO ${USER_TABLE}(username, email) VALUES ('${req.body.username}', '${req.body.email}')`;
  pool.query(query, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.put("/api/user", (req, res) => {
  const updates = [];
  if (req.body.email) {
    updates.push(`email=${req.body.email}`);
  }
  if (req.body.password) {
    updates.push(`password=${req.body.password}`);
  }
  if (req.body.resetDefaultPwd) {
    updates.push(`reset_default_pwd=${req.body.resetDefaultPwd}`);
  }
  const query = `UPDATE ${USER_TABLE} SET ${updates.join(
    ","
  )} WHERE username = ${req.body.username}`;
  console.log("query- ", query);
  pool.query(query, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});
