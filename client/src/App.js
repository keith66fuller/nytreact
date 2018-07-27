import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import AppBar from "./components/AppBar";
import NoMatch from "./pages/NoMatch";



const App = () => (
  <React.Fragment>
    <AppBar/>
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          {/* <Route exact path="/saved" component={Saved} /> */}
          <Route component={NoMatch} />
        </Switch>
    </Router>
  </React.Fragment>
);

export default App;