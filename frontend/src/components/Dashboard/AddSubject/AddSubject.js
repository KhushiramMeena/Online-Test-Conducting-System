import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Alert from "../../../services/alert";
import Auth from "../../../services/Auth";
import { getAdminDetails } from "../../../redux/actions/loginAction";
import axios from "axios";
import apis from "../../../services/Apis";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CssBaseline
} from "@mui/material";
import { styled } from "@mui/system";

const FormContainer = styled(Container)({
  marginTop: '2rem',
  padding: '2rem',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
});

class AddSubject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  nameInputHandler = (event) => {
    this.setState({
      ...this.state,
      name: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    axios
      .post(
        apis.BASE + apis.ADD_SUBJECT,
        {
          name: this.state.name,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.retriveToken()}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          Alert("info", "Success", response.data.message);
        } else {
          Alert("error", "Failed", response.data.message);
        }
      });
  };

  render() {
    if (!Auth.retriveToken() || Auth.retriveToken() === "undefined") {
      return <Navigate to="/" />;
    } else if (!this.props.user.isLoggedIn) {
      this.props.getAdminDetails();
      return <div></div>;
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <FormContainer maxWidth="sm">
          <Typography component="h1" variant="h5" align="center">
            Add Subject
          </Typography>
          <Box component="form" onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              required
              label="Name"
              value={this.state.name}
              onChange={this.nameInputHandler}
              margin="normal"
              variant="outlined"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Subject
            </Button>
            <Button
              component={Link}
              to="/home"
              fullWidth
              variant="outlined"
              color="secondary"
            >
              Back
            </Button>
          </Box>
        </FormContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  getAdminDetails,
})(AddSubject);
