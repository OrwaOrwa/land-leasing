import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import {withAuthentication} from "../Session";

import Navigation from "../Navigation";
import SignIn from "../SignIn";
import Landing from "../Landing";
import Products from "../Products";
import SignUp from "../SignUp";
import Footer from "../Footer/index";
import LandDetails from "../LandDetails/LandDetails";
import Dashboard from "../Dashboard/Dashboard";
import Blog from "../Blog/Blog";
import Payments from "../Payments/Payments";
import ViewLand from "../ViewLand/ViewLand";
import EditLand from "../EditLand/EditLand";
import Admin from "../Admin/Admin";
import BlogList from "../Blog/List";
import EditBlog from "../Dashboard/Admin/Edit";
import test from "../Dashboard/Farmer/test";

const App = () => (
    <Router>
        <Navigation/>

        {/* <hr /> */}
        <Route exact path={ROUTES.LANDING} component={Landing}/>
        <Route path={ROUTES.PRODUCTS} component={Products}/>
        <Route path={ROUTES.SIGN_IN} component={SignIn}/>
        <Route exact={true} path={ROUTES.DASHBOARD} component={Dashboard}/>
        <Route path={ROUTES.SIGN_UP} component={SignUp}/>
        <Route exact={true} path={ROUTES.VIEWLAND} component={ViewLand}/>
        <Route exact={true} path={ROUTES.VIEW_PENDING_LAND} component={ViewLand}/>
        <Route exact={true} path={ROUTES.SOLD_LAND} component={ViewLand}/>
        <Route exact={true} path={ROUTES.LANDDETAILS} component={LandDetails}/>
        <Route exact={true} path={ROUTES.BLOG} component={BlogList}/>
        <Route exact={true} path={ROUTES.BLOG_DETAILS} component={Blog}/>
        <Route exact={true} path={ROUTES.BLOG_EDIT} component={EditBlog}/>
        <Route exact={true} path={ROUTES.EDITLAND} component={Dashboard} />
        <Route path={ROUTES.TEST} component={test} />
        {/*
    <Route path={ROUTES.ADMIN} component={Admin} />*/}
        <Footer/>
    </Router>
);

export default App;
