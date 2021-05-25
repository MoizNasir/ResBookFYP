import React, {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

import Jumbotron from 'react-bootstrap/Jumbotron'
function SideBar(islogged) {
    const [items, setItems]=useState([])
    const style2 = {
        width: "300px",
        right: "10px",
        position: "relative",
        left: "1065px",
        top: "-340px",
      
        height: "500px"
      };
    useEffect(() =>{
        console.log("User is logged? in side", {islogged})
        if (islogged === "true"){
            console.log("Logged")
            setItems([...items, {
                name: "Haris Abbasi",
                email: "harisbakhabarpk@gmail.com",
                id: "1234" }])

        }else{
            console.log("not Logged")
        }
        
        
        
        
        
        
        
    },[items])
    return(
        <div>
            {islogged==="true"
            ? null
            : (<Jumbotron style={style2} >
                <h1 style={{fontSize:"30px", textAlign: "center", fontWeight:"bold"}}>Who To Follow</h1>
                <p style={{textAlign:"center"}}>User1
                </p>
                <ul>
                {items.map(item=>(<li key={item.id}>{item.name}<br/>{item.email}<br/></li>))}
                </ul>
                
                
                
                </Jumbotron>)}
            
        </div>
        
        
    )
}

export default SideBar
