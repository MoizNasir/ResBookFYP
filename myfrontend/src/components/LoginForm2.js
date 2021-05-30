import React, {useState,useEffect, useMemo} from 'react'
import { withRouter, useHistory } from 'react-router-dom'; 
import axios from 'axios'
import NavBar from './NavBar'
import './loginn.css'
function LoginForm2({props, setEmail2,setUserID,setUserPic, setUser2, user2, setIslogged }) {
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

		

		
        <div className="container" >

			
			<div className="row justify-content-center">
				<div className="col-md-6 text-center mb-5">
					<h2 className="heading-section"> </h2>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-md-7 col-lg-5">
					<div className="wrap">
						<div className="img" ><img width="450" height="200" src={'/content/bg-1.jpg'}></img></div>
						<div className="login-wrap p-4 p-md-5">
			      	<div className="d-flex">
			      		<div className="w-100">
			      			<h3 className="mb-4">Sign In</h3>
			      		</div>
								<div className="w-100">
									<p className="social-media d-flex justify-content-end">
										<a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-facebook"></span></a>
										<a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-twitter"></span></a>
									</p>
								</div>
			      	</div>
							<form action="#" className="signin-form">
			      		<div className="form-group mt-3">
			      			<input type="email" className="form-control" onChange={(e)=>{setEmail(e.target.value)}} required />
			      			<label className="form-control-placeholder" for="username">Email</label>
			      		</div>
		            <div className="form-group" style={{marginTop:"10%"}}>
		              <input id="password-field" type="password" className="form-control" onChange={(e)=>{setPass(e.target.value)}} required />
		              <label className="form-control-placeholder" for="password" >Password</label>
		              <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
		            </div>
		            <div className="form-group">
		            	<button type="submit" className="form-control btn btn-primary rounded submit px-3" onClick={handleChange}>Sign In</button>
						
		            </div>
					{error? <div class="alert alert-danger" role="alert">{error}</div> : null}
		            <div className="form-group d-md-flex">
		            	<div className="w-50 text-left">
							<input type="checkbox" className="custom-control-input" id="customCheck1" />
							<label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
										
									</div>
									<div className="w-50 text-md-right">
										<a href="#">Forgot Password</a>
									</div>
		            </div>
		          </form>
		          <p className="text-center">Not a member? <a data-toggle="tab" href="#signup">Sign Up</a></p>
		        </div>
		      </div>
				</div>
			</div>
		</div>
		
    )
}

export default LoginForm2
