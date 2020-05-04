import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const links = {
  Home: "/",
  Users: "/users",
  Tasks: "/tasks",
};

export const Menu = () => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className={classes.root}>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItem button>
            <h2>
              <b>My App</b>
            </h2>
          </ListItem>
          {Object.keys(links).map((text) => (
            <ListItem button key={text}>
              <Link to={links[text]}>
                <ListItemText primary={text} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            My App
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
