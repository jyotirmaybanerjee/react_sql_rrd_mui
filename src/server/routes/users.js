// const fs = require("fs");
const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB,
});
const USER_TABLE = "users";

module.exports = {
  addUser: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    if (!username) {
      return res.status(400).send("'username' is a required field.");
    }
    if (!email) {
      return res.status(400).send("'email' is a required field.");
    }
    let query = `INSERT INTO ${USER_TABLE}(username, password, email) VALUES ('${username}', '${password}', '${email}')`;
    if (!password) {
      query = `INSERT INTO ${USER_TABLE}(username, email) VALUES ('${username}', '${email}')`;
    }
    console.log("addUser query- ", query);
    pool.query(query, (err, rows) => {
      if (err) {
        return res.status(500).send(err);
      } else if (rows.length > 0) {
        const message = "Username already exists";
        return res.status(500).send(message);
      } else {
        res.send(rows);
      }
    });
  },
  getUser: (req, res) => {
    const username = req.params.username;
    if (!username) {
      return res.status(400).send("'username' is required.");
    }
    let query = `select * from ${USER_TABLE} WHERE username='${req.params.username}'`;
    console.log("getUser query- ", query);
    pool.query(query, (err, rows) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(rows);
      }
    });
  },
  editUser: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const resetDefaultPwd = req.body.resetDefaultPwd;
    const updates = [];
    if (email) {
      updates.push(`email=${email}`);
    }
    if (password) {
      updates.push(`password=${password}`);
    }
    if (resetDefaultPwd) {
      updates.push(`reset_default_pwd=${resetDefaultPwd}`);
    }
    const query = `UPDATE ${USER_TABLE} SET ${updates.join(
      ","
    )} WHERE username = ${username}`;
    console.log("editUser query- ", query);
    pool.query(query, (err, rows) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(rows);
      }
    });
  },
  getUserList: (req, res) => {
    const query = `select * from ${USER_TABLE}`;
    pool.query(query, (err, rows) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(rows);
      }
    });
  },
};
