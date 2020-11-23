import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import DrawerComponentAuth from "../../elements/DrawerAuth";
import * as ROUTES from "../../constants/routes";
import LogoImage from "../../resources/images/logo.png";
import {isUserLoggedIn} from "../../helpers/login";

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
    imageDiv: {
        height: "4em",
        width: "8em",
    },
    image: {
        height: "100%",
        width: "100%",
        objectFit: "cover",
    },
    links: {
        marginRight: "1em",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
}));

const Navigation = () => {
    const classes = useStyles();

    return <div className={classes.root}>
        <AppBar position="static" color="green">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link
                        to={ROUTES.LANDING}
                        style={{
                            textDecoration: "none",
                            color: "#3D9A04",
                            fontWeight: "700",
                        }}
                    >
                        <div className={classes.imageDiv}>
                            <img src={LogoImage} alt="Logo" className={classes.image}/>
                        </div>
                    </Link>
                </Typography>
                <Typography variant="h6" className={classes.links}>
                    <Link
                        to={ROUTES.LANDING}
                        style={{
                            textDecoration: "none",
                            color: "#3D9A04",
                            fontWeight: "600",
                        }}
                    >
                        Lease Land
                    </Link>
                </Typography>
                <Typography variant="h6" className={classes.links}>
                    <Link
                        to={ROUTES.PRODUCTS}
                        style={{
                            textDecoration: "none",
                            color: "#3D9A04",
                            fontWeight: "600",
                        }}
                    >
                        Products
                    </Link>
                </Typography>
                <Typography variant="h6" className={classes.links}>
                    <Link
                        to={ROUTES.BLOG}
                        style={{
                            textDecoration: "none",
                            color: "#3D9A04",
                            fontWeight: "600",
                        }}
                    >
                        Agricultural Information
                    </Link>
                </Typography>
                {
                    isUserLoggedIn() ?
                        <Typography variant="h6" className={classes.links}>
                            <Link
                                to={ROUTES.SIGN_IN}
                                style={{
                                    textDecoration: "none",
                                    color: "#3D9A04",
                                    fontWeight: "600",
                                }}
                            >
                                Sign In
                            </Link>
                        </Typography> : null
                }
                {isUserLoggedIn() ?
                    <Typography variant="h6" className={classes.links}>
                        <Link
                            to={ROUTES.DASHBOARD}
                            style={{
                                textDecoration: "none",
                                color: "#3D9A04",
                                fontWeight: "600",
                            }}
                        >
                            Dashboard
                        </Link>
                    </Typography> :
                    <Typography variant="h6" className={classes.links}>
                        <Link
                            to={ROUTES.SIGN_UP}
                            style={{
                                textDecoration: "none",
                                color: "#3D9A04",
                                fontWeight: "600",
                            }}
                        >
                            Sign Up
                        </Link>
                    </Typography>}
                <Button color="inherit">
                    <DrawerComponentAuth/>
                </Button>
            </Toolbar>
        </AppBar>
    </div>
}

export default Navigation;
