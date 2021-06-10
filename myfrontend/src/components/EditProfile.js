import React, {useState,useEffect} from 'react'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import validator from 'validator'
function EditProfile({email2}) {
    const [email, setEmail] = useState(email2)
    const [pass, setPass] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [propic, setPropic] = useState("")
    const [selectedfile, setSelectedfile] = useState("")
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    console.log("settings",email2)
    const getUS=(email2)=>{
        axios.get('http://localhost:5000/changeaccountsetting/'+email2)
            .then(response => {
                console.log(response.data)
                setPass(response.data.password)
                setLname(response.data.lastname)
                setFname(response.data.firstname)
                setEmail(response.data.email)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    const updatesetting=(e)=>{
        e.preventDefault()
        console.log("EMail in signup form",email)
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if(pattern.test(email)){
            
                const data = new FormData() 
                data.append('file', selectedfile)
                data.set("email", email);
                data.set("password", pass);
                data.set("firstname", fname);
                data.set("oemail", email2);
                data.set("lastname", lname);
                const URL = "http://localhost:5000/updatesetting";
                axios.post(URL,data)
                .then((response) => {
                    console.log("Response is ",response.data.message)
                    setSuccess(response.data.message)
                }).catch((error) => {

                });
        
        }else{
            setError("Email Format Not Correct")
            }

    }
    const onIMGChangeHandler=(event)=>{

        console.log(event.target.files[0])
        setSelectedfile(event.target.files[0])
    
    }
    useEffect(() => {
        getUS(email2)
    }, [])
    return (
        <div>
            <form>
                <h3>Update Account Settings</h3>

                <div className="form-group">
                    <label>New First name</label>
                    <input type="text" value={fname} onChange={(e)=>{setFname(e.target.value)}} className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>New Last name</label>
                    <input type="text" value={lname} onChange={(e)=>{setLname(e.target.value)}} className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>New Email address</label>
                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label> New Password</label>
                    <input type="password" onChange={(e)=>{setPass(e.target.value)}} className="form-control" placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <label>Add Profile Picture </label>
                    <input type="file" name="file" onChange={onIMGChangeHandler}/>
                </div>
                {error? <div class="alert alert-danger" role="alert">{error}</div> : null}

                <button type="submit" onClick={e => {e.preventDefault();updatesetting(e)}} className="btn btn-primary btn-block">Update Settings</button>
                {success? <div class="alert alert-success" role="alert">{success}</div> : null}
            </form>
        </div>
    )
}

export default EditProfile
