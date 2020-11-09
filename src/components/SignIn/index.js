import React from "react";
// import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {withStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
// import { Link } from "react-router-dom";
import {parseErrorResponse} from "../../helpers/helper_functions";
import {makeRequest} from "../../helpers/network_utils";
import {POST_REQUEST} from "../../values/globals";
import {saveRefreshToken, saveToken, setUserObject} from "../../helpers/login";
import Swal from "sweetalert2";
import endpoints from "../../constants/endpoints";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

class SignIn extends React.Component {
    state = {
        error: null,
        response: null,
        email: 'email',
        password: 'password',
        isLoading: false
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({isLoading: true});

        let self = this;

        makeRequest(POST_REQUEST, "login", {
            email: this.state.email?.toLowerCase(),
            password: this.state.password?.toLowerCase()
        }, function (response) {

            let {access_token, refresh} = response.data;
            saveToken(access_token);
            saveRefreshToken(refresh);

            self.setState({
                response: null,
                error: null
            });

            //scheduleTokenRefreshes();
            setUserObject(function () {

            }, function () {
                window.location.href = "/";
                // scheduleTokenRefreshes();
                self.setState({
                    isLoading: false
                });
            });
        }, function (error) {
            self.setState({
                error: error,
                response: null,
                isLoading: false
            });
        }, function () {
        })
    };

    resetPasswordDialog = () => {
        Swal.fire({
            title: 'Enter your email',
            input: 'email',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Reset Password',
            showLoaderOnConfirm: true,
            preConfirm: (email) => {
                makeRequest(POST_REQUEST, endpoints.reset_password, {email: email}, () => {
                    Swal.fire(
                        'Success!',
                        'A password reset link has been sent to your email.',
                        'success'
                    ).then(() => {
                        return true;
                    });
                }, (error) => {
                    Swal.showValidationMessage(
                        `Request failed: ${parseErrorResponse(error)}`
                    );
                    return true;
                })
                return false;
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then(() => {
            Swal.showValidationMessage(
                `Request failed: `
            );
        });
    }

    render() {
        const {classes} = this.props;
        const {email, password, isLoading} = this.state;
        let message;
        const {error, response} = this.state;
        if (error) {
            message = "The credentials provided are invalid.";
            //message = parseErrorResponse(error);
        } else if (response != null) {
            message = "";
            Object.values(response.data).forEach(function (item) {
                message += item + " ";
            });
        }

        return (
            <Container style={{marginTop: "5rem", marginBottom: "5rem"}} component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <div style={message ? {display: 'block'} : {display: 'none'}}
                         className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Information: </strong> {message}
                        <button type="button" className="close" data-hide="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={event => this.setState({email: event.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={event => this.setState({password: event.target.value})}
                        />
                        {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                        {/* <Link to='/dashboard'> */}
                        <Button
                            type="submit"
                            fullWidth
                            disabled={isLoading}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {isLoading ? "Loading..." : "Sign In"}
                        </Button>

                        <p onClick={this.resetPasswordDialog} className="btn lead">Forgot Password?</p>
                        {/* </Link> */}

                        {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
                    </form>
                </div>
            </Container>
        );
    }
}

export default withStyles(useStyles)(SignIn);