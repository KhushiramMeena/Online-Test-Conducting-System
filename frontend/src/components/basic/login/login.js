import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { loginUser } from "../../../redux/actions/loginAction";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  usernameInputHandler = (event) => {
    this.setState({
      ...this.state,
      username: event.target.value,
    });
  };

  passwordInputHandler = (event) => {
    this.setState({
      ...this.state,
      password: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginUser({ username: this.state.username, password: this.state.password });
  };

  render() {
    if (this.props.user.isLoggedIn) {
      return <Navigate to="/home" />;
    } else {
      return (
        <Container maxWidth="xs">
          <Box
            sx={{
              marginTop: "5rem",
              padding: "2rem",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <Typography component="h2" variant="h6" style={{ color: 'black' }} align="center" gutterBottom>
              Admin Login
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <TextField
                fullWidth
                required
                label="Username"
                value={this.state.username}
                onChange={this.usernameInputHandler}
                margin="normal"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                required
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.passwordInputHandler}
                margin="normal"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                LOGIN
              </Button>
            </form>
          </Box>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { loginUser })(Login);
