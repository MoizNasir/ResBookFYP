import React, {useState,useEffect, useMemo} from 'react'
import { withRouter, useHistory } from 'react-router-dom'; 
import axios from 'axios'
import NavBar from './NavBar'
function LoginForm({props, setEmail2,setUserID,setUserPic, setUser2, user2, setIslogged }) {
    const [email, setEmail] = useState("Profile")
    const [pass, setPass] = useState("")
    const [error, setError] = useState(null);

    let history = useHistory();
    const [redirectToReferrer, setRedirectToReferrer] = useState("false")
    const handleChange= async (e)=>{
        //i will authenticate user
        e.preventDefault()
        
        
        const URL = "http://localhost:5000/sign-in";
        var data2 ={
            email: email,
            pass: pass,
            
        }
        const options = {
            method: 'post',
            url: URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            data: data2,

            validateStatus: (status) => {
                return true; // I'm always returning true, you may want to do it depending on the status received
              
          }}
        
        axios(options).then(response => {
          console.log("Response is ",response.data.fname)
          if(response.data.success){
            setUser2(response.data.fname +" "+ response.data.lname)
            setEmail2(email)
            setUserID(response.data.id)
            setUserPic(response.data.propic)
            setIslogged("true")
            console.log("We know evertything now after submission", email)
            history.push('/');

          }else{
              setError(response.data.message)
          }
        })
        
        
        .catch(error => {
            
            console.log("Error is: ",error.response)
        });
        
        
        
        
        
        
    
        
        
        
        
    }
    
    useEffect(() => {
        // Update the document title using the browser API
        
        
        console.log("We know evertything now", email)
        
      });
    
    return (
        
             
            <div style={{  
                backgroundImage: "url(" + "https://img4.goodfon.com/wallpaper/nbig/c/61/fast-fud-pitstsa-burger-chipsy-lukovye-koltsa-kartofel-fri.jpg" + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'repeat'
              }}
              >
                <div style={{width:"33%", marginLeft:"33%", backgroundColor:"#fff7f7"}}>
            <form style={{}}>
            <div className="img" ><img width="450" height="200" src={'/content/bg-1.jpg'}></img></div>
                <h3 style={{marginBottom:"5%", textAlign:"center"}}>Sign In</h3>

                <div className="form-group" style={{marginBottom:"5%"}}>
                    <label style={{color:"red"}}>Email address</label>
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group" style={{marginBottom:"5%"}}>
                    <label style={{color:"red"}}>Password</label>
                    <input type="password" onChange={(e)=>{setPass(e.target.value)}} className="form-control" placeholder="Enter password" />
                </div>

                

                <button type="submit" onClick={handleChange} style={{backgroundColor:"red"}} className="btn btn-primary btn-block">Sign-In</button>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label style={{display:"inline-block"}} className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        <p style={{display:"inline-block", float:"right"}} className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>
                </div>
                

            </form>
            {error? <div class="alert alert-danger" role="alert">{error}</div> : null}
            
            
            
            </div>
            </div>
            
            
            
        
        
    )
    
}
 
export default withRouter(LoginForm)
