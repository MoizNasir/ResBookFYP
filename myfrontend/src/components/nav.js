import React from 'react'

function _nav1() {
    
const divStyle = {
    
    color: 'Blue' ,
    fontFamily: 'Times, serif',
    fontWeight: 'bold',
    fontSize: '25px'
    
  };
    return (
        <div>
            <nav>
            <ul class="nav navbar-nav">
                <li class="active" style={divStyle}><a  href="/">Home</a></li>
                <li><a style={divStyle} href="/movies">Movies</a></li>
                <li><a style={divStyle}  href="/tvshows">TV Shows</a></li>
                <li><a style={divStyle}  href="/login">Login</a></li>
                <li><a style={divStyle}  href="/signup">SignUp</a></li>
            </ul>
            </nav>
            
        </div>
    )
}

export default _nav1
