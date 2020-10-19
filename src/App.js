import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import Users from "./components/Users";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <Navbar/>
      <div className="container p-4"> 
        <Switch>
          <Route exact path="/" component={Users} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
