import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";
import SignOut from "../../src/components/SignOut";
import * as ROUTES from "../constants/routes";
import {isUserLoggedIn} from "../helpers/login";
// import { withAuthorization } from '../components/Session';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
    link: {
        textDecoration: "none",
        color: "black",
    },
});

export default function DrawerComponentAuth() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (side, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({...state, [side]: open});
    };

    // const condition = (authUser) =>
    //   authUser && authUser.email === "kibuika1@gmail.com";

    const sideList = (side) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            {
                isUserLoggedIn() ?
                    <List>
                        <ListItem button>
                            <Link to={ROUTES.LANDING} className={classes.link}>
                                Lease Land
                            </Link>
                        </ListItem>
                        <ListItem button>
                            <Link to={ROUTES.PRODUCTS} className={classes.link}>
                                Products
                            </Link>
                        </ListItem>
                        <ListItem button>
                            <Link to={ROUTES.DASHBOARD} className={classes.link}>
                                Dashboard
                            </Link>
                        </ListItem>

                        {/* {condition ? <ListItem button >
            <Link to={ROUTES.ADMIN} className={classes.link}>Admin</Link>
          </ListItem> : <h6>{}</h6>} */}
                        <Divider/>
                        <ListItem button>
                            <SignOut/>
                        </ListItem>
                    </List> :
                    <List>
                        <ListItem button>
                            <Link to={ROUTES.SIGN_IN} className={classes.link}>
                                Sign In
                            </Link>
                        </ListItem>
                        <ListItem button>
                            <Link to={ROUTES.SIGN_UP} className={classes.link}>
                                Sign Up
                            </Link>
                        </ListItem>
                        <ListItem button>
                            <Link to={ROUTES.PRODUCTS} className={classes.link}>
                                Products
                            </Link>
                        </ListItem>
                        {/* {condition ? <ListItem button >
            <Link to={ROUTES.ADMIN} className={classes.link}>Admin</Link>
          </ListItem> : <h6>{}</h6>} */}
                        <Divider/>
                        <ListItem button>
                            <Link to={ROUTES.SIGN_IN} className={classes.link}>
                                Sign In
                            </Link>
                        </ListItem>
                    </List>
            }

        </div>
    );

    return (
        <div>
            <Button
                onClick={toggleDrawer("right", true)}
                style={{color: "blue", fontWeight: "bold"}}
            >
                Menu
            </Button>
            <Drawer
                anchor="right"
                open={state.right}
                onClose={toggleDrawer("right", false)}
            >
                {sideList("right")}
            </Drawer>
        </div>
    );
}
