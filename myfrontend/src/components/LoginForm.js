import React, {useState,useEffect, useMemo} from 'react'
import { withRouter, useHistory } from 'react-router-dom'; 
import axios from 'axios'
import NavBar from './NavBar'
 import './loginn.css'
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
        
            
            <div className="back" style={{  
                height:'100vh',
                Width: '100vw',
                backgroundImage: "url(" + '/content/grey2.jpg' + ")",
                backgroundPosition: 'center',
                backgroundSize: '100%',
                backgroundRepeat: 'repeat',
                backgroundHeight: '100%',
                //backgroundColor:"transparent",
                
              }}
              >
              			
         
                  
                 
                    <div class="container"
                     style={{position:'absolute',
                     marginLeft:'39%', marginTop:'8%',
                  
                
                
                
                
                
                
                }}>
                    <form style={{
                           width:'350%',
                           backgroundColor:'white',
                         paddingBottom:"20px",
                         bordercollapse:"separate",
                         borderRadius:"5px",
                         overflow: 'hidden',
                         perspective: "1px",
                        paddingBottom:"10%"
                    }}>
{/* //     boxSizing:'border-box',
//     width: '100%',
//     overflow: 'hidden',
//     background: '#fff',
//     borderRadius: '5px',
//   //  boxShadow: '0px 10px 34px -15px rgb(0 0 0 / 24%)',
//     display: 'block',
//     fontFamily: '"Lato", Arial, sansserif',
//     fontSize: '16px',
//     lineHeight: '1.8',
//     fontWeight: 'normal',
//     background: '#fff',
//     color: 'gray',
    
//     width: '100%',
//     paddingRight: '15px',
//    // paddingLeft: '15px',
//   // backgroundColor:"transparent",
//     width:"23%", marginLeft:"38%",
    
//     justifycontent: 'center'
   
    

    
    
   // top:'50%',
   // left:'50%',<div class="img" style="background-image: url(images/bg-1.jpg);"></div>
    




}}> */}
    {/* <div class="row"  >
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section"> </h2>
				</div>
			</div> */}
    {/* <div className='mb-3 position'> */}

    
            {/* <div> */}
		

            
  

<div className='container-fluid login_div'>
<div className="img"  style={{transform:'translateX(-15px)'}}><img width="109%" height="50%" src={'/content/bg-1.jpg'}></img></div> 
     <h3 style={{
         textAlign:"left", fontFamily:'"Times New Roman", Times, serif',margin:"7%",  marginLeft:"5%", marginBottom:"4%",
         fontweight: "lighter",     color:"#595959", fontsize: "16px",
         lineheight:"1.8"
        
    
    }}>Sign In</h3> 
    <div className='row' style={{width:'165%'}}> 
        <div className='col-md-8'>
        <div className="form-group" style={{margin:"5%" }}>
            <label style={{color:"#595959"}}>Email address</label>
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Enter email" />
    </div>
    <div className="form-group" style={{margin:"5%" , marginBottom:"9%"}}>
        <label style={{color:"#595959"}}>Password</label>
        <input type="password" onChange={(e)=>{setPass(e.target.value)}} className="form-control" placeholder="Enter password" />
    </div>
    <button type="submit" onClick={handleChange} style={{backgroundColor:"#bf0404" ,width:"91%" , marginLeft:"4.8%" ,marginBottom:"5%"}} className="btn btn-primary btn-block">Sign-In</button>
    <div className="form-group">
        <div className="custom-control custom-checkbox" style={{color:"#bf0404" ,marginLeft:"4.8%"}}>
            <input type="checkbox" className="custom-control-input" id="customCheck1"  />
            <label style={{display:"inline-block"}} className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            <p style={{display:"inline-block", float:"right", color:"#595959", paddingRight:"5%" }} className="forgot-password text-right">
                Forgot <a href="#" style={{color:"#595959", }}>password?</a>
            </p>
        </div>
    </div>
        </div>
    </div>

</div>
    



    
    

    
    
   
{error? <div class="alert alert-danger" role="alert">{error}</div> : null}
</form>
        {/* </div> mb-3 */}
        
</div>                  
               
           
          
            
            
            
            
            </div>
            
            
            
            
        
        
    )
    
}
 
export default withRouter(LoginForm)
