import React, { useState } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";
import Borad from "routes/Borad";
import CalendarApp from "routes/CalendarApp";
import Map from "routes/Map";
import BoradWrite from "routes/BoradWrite";
import PetWrite from "routes/PetWrite";






const AppRouter = ({ isLoggedIn, userObj, petObj}) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/Borad">
              <Borad userObj={userObj} />
            </Route>
            <Route exact path="/CalendarApp">
              <CalendarApp userObj={userObj} petObj={petObj} />
            </Route>
            <Route exact path="/Map">
              <Map />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} />
            </Route>
            <Route exact path="/Boradwrite">
              <BoradWrite userObj={userObj} />
            </Route>
            <Route exact path="/Petwrite">
              <PetWrite userObj={userObj} />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            
          </>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;