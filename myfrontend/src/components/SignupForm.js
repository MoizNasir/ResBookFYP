import React, {useState,useEffect, useMemo} from 'react'
import axios from 'axios'
import validator from 'validator'
import Select from "react-select";
function SignupForm() {
    const [email, setEmail] = useState("")
    const [propic, setPropic] = useState("")
    const [pass, setPass] = useState("")
    const [fname, setFname] = useState("")
    const [error, setError] = useState("")
    const [lname, setLname] = useState("")
    const [selectedfile, setSelectedfile] = useState("")
    const [day, setDay] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const handleChange=(e)=>{
        console.log("EMail in signup form",email)
        e.preventDefault()
        //i will authenticate user
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if(pattern.test(email)){
            
        

        
        
        if(validator.isNumeric(year)){

        
        const data = new FormData() 
        console.log(day+month+year)
        data.append('file', selectedfile)
        data.set("email", email);
        data.set("pass", pass);
        data.set("fname", fname);
        data.set("DOB", day+' '+month+' '+year);
        data.set("lname", lname);
        const URL = "http://localhost:5000/sign-up";
            axios.post(URL,data)
            .then((response) => {
                console.log("Response is ",response.data.message)
                
                
            }).catch((error) => {

            });
        alert("You are now a user please login")
        }else{
            setError("Year Should Be Interger And Have 4 Characters")
        }
    }else{
        setError("Email Format Not Correct")
        }
        
        
        
        
    }
    const style2 = {
      
        marginright: "20px"
      };
    const options ={
        days:[1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec']
    }
    const onIMGChangeHandler=(event)=>{

        console.log(event.target.files[0])
        setSelectedfile(event.target.files[0])
    
    }
    useEffect(()=>{
        
    })
    return (
        <div style={{  
            backgroundImage: "url(" + "https://img4.goodfon.com/wallpaper/nbig/c/61/fast-fud-pitstsa-burger-chipsy-lukovye-koltsa-kartofel-fri.jpg" + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat'
          }}
          >
        <div style={{width:"33%", marginLeft:"33%", backgroundColor:"#fff7f7"}}>
            <form>
            <div className="img" ><img width="450" height="200" src={'/content/bg-1.jpg'}></img></div>
                <h3 style={{marginBottom:"5%", textAlign:"center"}}>Sign Up</h3>

                <div className="form-group" style={{marginBottom:"5%"}}>
                    <label>First name</label>
                    <input type="text" onChange={(e)=>{setFname(e.target.value)}} className="form-control" placeholder="First name" />
                </div>

                <div className="form-group" style={{marginBottom:"5%"}}>
                    <label>Last name</label>
                    <input type="text" onChange={(e)=>{setLname(e.target.value)}} className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group" style={{marginBottom:"5%"}}>
                    <label>Email address</label>
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group" style={{marginBottom:"5%"}}>
                    <label>Password</label>
                    <input type="password" onChange={(e)=>{setPass(e.target.value)}} className="form-control" placeholder="Enter password" />
                </div>
                <div className="form-group" style={{marginBottom:"5%"}}>
                    <label>Day</label>
                    <select name="Day" onChange={(e)=>setDay(e.target.value)}>
                        {options.days.map(day=>(<option value={day}>{day}</option>))} 
                    </select>
            
                    <label style={{marginLeft:"1%"}}>Month</label>
                    <select name="Month" onChange={(e)=>setMonth(e.target.value)}>
                        {options.months.map(month=>(<option value={month}>{month}</option>))} 
                    </select>
                    <label style={{marginLeft:"1%"}}>Year</label>
                    <input type="year" onChange={(e)=>{setYear(e.target.value)}} style={{display:"inline-block", width:"50%"}} className="form-control" placeholder="Enter year" />
                </div>
                <div className="form-group" style={{marginBottom:"5%"}}>
                    <label>Add Profile Picture </label>
                    <input style={{marginLeft:"3%"}} type="file" name="file" onChange={onIMGChangeHandler}/>
                </div>
                {error? <div class="alert alert-danger" role="alert">{error}</div> : null}

                <button type="submit" onClick={handleChange} style={{backgroundColor:"red"}} className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        </div>
        </div>
    )
}

export default SignupForm
