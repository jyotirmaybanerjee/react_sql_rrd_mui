import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import {
  createUserAsync,
  fetchUserListAsync,
  selectUsers,
  selectError,
} from "./userSlice";

const useStyles = makeStyles((theme) => ({
  mainContaner: {
    marginTop: "60px",
  },
  formRoot: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    table: {
      minWidth: 650,
    },
  },
}));

export function Users() {
  const users = useSelector(selectUsers);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchUserListAsync());
  }, []);
  console.log("error- ", error);
  return (
    <Container maxWidth="lg" className={classes.mainContaner}>
      <Fab
        onClick={() => setFormVisible(!formVisible)}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      {formVisible && (
        <div className={classes.formRoot}>
          <TextField
            required
            id="user-creation-username"
            label="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="user-creation-password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            required
            id="user-creation-email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={() =>
              dispatch(createUserAsync({ username, password, email }))
            }
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </div>
      )}
      {error && <Alert severity="warning">{Error}</Alert>}
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 &&
              users.map((user) => (
                <TableRow key={user.username}>
                  <TableCell component="th" scope="row">
                    {user.username}
                  </TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
