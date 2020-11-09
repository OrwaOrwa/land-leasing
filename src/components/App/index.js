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

const App = () => (
    <Router>
        <Navigation/>

        {/* <hr /> */}
        <Route exact path={ROUTES.LANDING} component={Landing}/>
        <Route path={ROUTES.PRODUCTS} component={Products}/>
        <Route path={ROUTES.SIGN_IN} component={SignIn}/>
        <Route path={ROUTES.DASHBOARD} component={Dashboard}/>
        {/*<Route path={ROUTES.SIGN_UP} component={SignUp} />*/}
        {/*<Route path={ROUTES.LANDDETAILS} component={LandDetails} />
    <Route path={ROUTES.BLOG} component={Blog} />
    <Route path={ROUTES.PAYMENTS} component={Payments} />
    <Route path={ROUTES.VIEWLAND} component={ViewLand} />
    <Route path={ROUTES.EDITLAND} component={EditLand} />
    <Route path={ROUTES.ADMIN} component={Admin} />*/}
        <Footer/>
    </Router>
);

export default App;
