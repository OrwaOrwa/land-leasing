import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {makeRequest} from "../../helpers/network_utils";
import {POST_REQUEST} from "../../values/globals";
import endpoints from "../../constants/endpoints";
import Swal from "sweetalert2";
import {handleChangeData, showAlert} from "../../helpers/helper_functions";

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 380,
    },
}));

class SignUp extends React.Component {

    state = {
        errors: {},
        data: {},
        loading: false
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        const {data} = this.state;
        const {history} = this.props;

        if (!data.role) {
            showAlert('error', 'Role', 'Please select user type');
            return;
        }
        const url = data.role === "user" ? endpoints.users_register : data.role === "merchant" ? endpoints.merchants_register
            : endpoints.farmers_register;
        makeRequest(POST_REQUEST, `${url}`, data, () => {
            Swal.fire(
                'Success!',
                'User registered successfully!',
                'success'
            ).then(() => history.push("/signin"));
        }, (error) => {
            this.setState({
                errors: error.response.data
            })
        }, () => {
            this.setState({loading: false})
        })
    }

    render() {
        const {classes} = this.props;
        const {loading, data, errors} = this.state;
        return (
            <Container style={{marginTop: "5rem", marginBottom: "5rem"}} component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Name"
                            name="name"
                            autoFocus
                            value={data?.name}
                            onChange={e => handleChangeData(e, this)}
                        />
                        {errors.name && (
                            <p className="mb-0 small text-danger mb-3">{errors.name[0]}</p>
                        )}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Phone Number"
                            name="phone_number"
                            autoFocus
                            value={data?.phone_number}
                            onChange={e => handleChangeData(e, this)}
                        />
                        {errors.phone_number && (
                            <p className="mb-0 small text-danger mb-3">{errors.phone_number[0]}</p>
                        )}
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
                            value={data?.email}
                            onChange={e => handleChangeData(e, this)}
                        />
                        {errors.email && (
                            <p className="mb-0 small text-danger mb-3">{errors.email[0]}</p>
                        )}
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
                            value={data?.password}
                            onChange={e => handleChangeData(e, this)}
                        />
                        {errors.password && (
                            <p className="mb-0 small text-danger mb-3">{errors.password[0]}</p>
                        )}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password_confirmation"
                            label="Confirm Password"
                            type="password"
                            value={data?.password_confirmation}
                            onChange={e => handleChangeData(e, this)}
                        />
                        {errors.password_confirmation && (
                            <p className="mb-0 small text-danger mb-3">{errors.password_confirmation[0]}</p>
                        )}
                        <select name="role" onChange={(e) => handleChangeData(e, this)}
                                className="form-control my-3">
                            <option>Select Role</option>
                            <option value="farmer">Land Owner(Lessor)</option>
                            <option value="merchant">Merchant</option>
                            <option value="user">Lease Land (Leasee)</option>
                        </select>
                        <Button
                            type="submit"
                            fullWidth
                            disabled={loading}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {loading ? "Loading..." : "Sign Up"}
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default withStyles(useStyles)(SignUp);