const express = require("express");
const bodyParser = require("body-parser");
const { addUser, getUser, editUser, getUserList } = require("./routes/users");

const app = express();
app.use(bodyParser());

const port = 8000;

app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});

app.get("/api/users", getUserList);
app.get("/api/user/:username", getUser);
app.post("/api/user", addUser);
app.put("/api/user", editUser);
