import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import UserModel from "../model/UserModel";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      password: "",
      rememberMe: false
    };

    let user = localStorage.getItem("user");
    if (user) {
      var obj = JSON.parse(atob(user));
      this.login(obj.user, obj.password);
    }
  }

  handleUser = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handlePassword = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleRememberMe = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleClick() {
    if (this.state.rememberMe) {
      localStorage.setItem("user", btoa(JSON.stringify(this.state)));
    }

    this.login(this.state.user, this.state.password);
  }

  login(user, password) {
    this.getHash(password).then(function(hash) {
      var obj = { user: user, password: hash };

      var userModel = new UserModel();
      userModel.login(obj).then(function(result) {
        if (result.length > 0) {
          sessionStorage.setItem("userContext", result[0]);
          window.location.reload();
        }
      });
    });
  }

  getHash(str, algo = "SHA-256") {
    let strBuf = new TextEncoder("utf-8").encode(str);
    return crypto.subtle.digest(algo, strBuf).then(hash => {
      window.hash = hash;
      // here hash is an arrayBuffer,
      // so we'll connvert it to its hex version
      let result = "";
      const view = new DataView(hash);
      for (let i = 0; i < hash.byteLength; i += 4) {
        result += ("00000000" + view.getUint32(i).toString(16)).slice(-8);
      }
      return result;
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Anmelden
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Benutzer</InputLabel>
              <Input id="email" name="email" autoComplete="email" value={this.state.user} onChange={this.handleUser("user")} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Passwort</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password} onChange={this.handlePassword("password")} />
            </FormControl>
            <FormControlLabel control={<Checkbox checked={this.state.remember} onChange={this.handleRememberMe("rememberMe")} color="primary" />} label="Angemeldet bleiben" />
            <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={this.handleClick.bind(this)}>
              Anmelden
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Login);
