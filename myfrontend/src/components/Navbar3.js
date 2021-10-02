import React from 'react'
import { Link } from "react-router-dom";
function Navbar3(props) {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">ResBook</Link>
                
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        
                        <li className="navbar-item">
                        <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                        <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="navbar-item">
                        <Link to="/signup" className="nav-link">SignUp</Link>
                        </li>
                        <li className="navbar-item">
                        <Link to="/userProfile" className="nav-link">{props.profile?props.profile.name:"Signup"}</Link>
                        </li>
                    
                    </ul>
                </div>



            </nav>
    )
}

export default Navbar3
