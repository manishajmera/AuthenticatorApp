import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import React from "react";

import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

const PageNotFound = () => {
  return (
    <h3> Error:404:-   Page Not Found</h3>
  )
}

const AuthenticatedPage = ()=> {
  return<div>
    User Logged In
  </div>
}

function App() {
  return (
    <Router>
      <Switch>
      {/* <Route path="/signUp" exact component={SignUp} />
        <Route path="/verify" exact component={Verify} />
        <Route path="/error" exact component={AdminError} />
        <Route path="/unauthorise" exact component={Unauthorized} /> */}
        <Route exact path="/" component={Login} />
        <Route path="/Sign-up" component={SignUp} />
        <Route path="/authenticatedPage" component={AuthenticatedPage} />
        <Route path="/" component={PageNotFound} />


        {/* <Redirect to="/signup" /> */}
      </Switch>
    </Router>
  );
};
export default App;
