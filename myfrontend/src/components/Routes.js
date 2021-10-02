import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./components/home.component";
import Login from "./components/login.component";
import Signup from "./components/signup.component";
import UserProfile from "./components/userProfile.component";


function App() {
    const [profile, setProfile] = useState(null);

  return (
    <Router>
      <Navbar profile={profile} />
      <br/>
      <Route path="/" exact component={Home}/>
      <Route path="/login" >
          <Login setProfile={setProfile} />
      </Route>
      <Route path="/Signup" exact component={Signup}/>
      <Route path="/userProfile" exact component={UserProfile}/>
   
    
    </Router>
  );
}

export default App;