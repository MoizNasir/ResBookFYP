import React from 'react'
import { Button,Jumbotron } from 'react-bootstrap';
function About({name, dob,email}) {
    return (
        <div>
            <div style={{ backgroundColor: '#990505' }}><h3 style={{color: 'white', paddingLeft:'40%' }}>{name} About </h3></div>
            <Jumbotron style={{backgroundColor:'#C4C4C4'}}>
                <a style={{height:'34px',width:'375px', backgroundColor:'#990505', color:'white',  position:'relative', left:"40%",borderRadius: '20px', textAlign:'center', paddingTop:'4px'}}>Email: {email}</a><br></br>
                <a style={{height:'34px',width:'375px', backgroundColor:'#990505', color:'white',  position:'relative',left:"41%",borderRadius: '20px',top:"20px", textAlign:'center', paddingTop:'4px'}}>Date Of Birth: {dob}</a>
                    </Jumbotron>
        </div>
    )
}

export default About
