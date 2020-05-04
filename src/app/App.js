import React, { useState } from "react";
import { Users } from "../features/user/Users";
import { Tasks } from "../features/task/Tasks";
import { Login } from "../features/auth/Login";
import { Home } from "./Home";
import { Menu } from "components";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  const [authed, setAuthed] = useState(false);
  return (
    <div className="App">
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/tasks" component={Tasks} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute authed={true} exact path="/users" component={Users} />
      </Switch>
    </div>
  );
}

export default App;
