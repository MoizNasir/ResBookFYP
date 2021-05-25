import React, {useState,useEffect} from 'react'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import ShowFriends from './ShowFriends'
import ProfileReviews from './ProfileReviews'
import './comsCSS.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Button,Jumbotron } from 'react-bootstrap';
import {  MDBRow,  MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBCol, MDBCardImage, MDBInput} from "mdbreact";
import About from './about'
function Profile({email2}) {
    let history = useHistory();
    let params = useParams();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDob] = useState("")
    const [friends, setFriends] = useState([])
    const [showWhich, setShowWhich] = useState("posts")
    const [propic, setPropic] = useState("")
    const [test, setTest] = useState(0)
    const [profilestatus, setProfilestatus] = useState("Not Anything")
    const [items, setItems]=useState([])
    const getReviews=async()=>{
        await axios.get('http://localhost:5000/getreviews')
        .then(response => {
            console.log(response.data)
            setItems(response.data.filter(item=>item.userid == params.id))
            console.log("Application got profile reviews bro")
        })
        .catch(function (error){
            console.log(error);
            console.log("Aey te error hai bro")
        })
    }
    const getProfile=(id)=>{
        axios.get('http://localhost:5000/'+id)
            .then(response => {
                console.log("Opened Profile Info: ",response.data)
                setName(response.data.firstname+' '+response.data.lastname)
                setEmail(response.data.email)
                setDob(response.data.DOB)
                
                if(email2==="Login"){
                    setProfilestatus('')

                }else{
                    getLUFL(response.data.email)
                }
                
                setFriends(response.data.friends)
                setPropic(response.data.propic)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    const getLUFL=(emaill)=>{
        axios.get('http://localhost:5000/changeaccountsetting/'+email2)
            .then(response => {
                console.log("Logged User Info: ",response.data)
                console.log("Checking if "+emaill+" is in LU array")
                if (emaill===response.data.email){
                    setProfilestatus("My Profile")
                    console.log("Profile status is:My Profile")
                }
                if (response.data.friends.includes(emaill)){
                    console.log("Friend")
                    setProfilestatus("Friend")
                    console.log("Profile status is:Friend")

                }
                if (response.data.recievedRequests.includes(emaill)){
                    console.log("Recieved Friend")
                    setProfilestatus("Recieved Friend")

                }
                if (response.data.sentRequests.includes(emaill)){
                    console.log("Sent Friend")
                    setProfilestatus("Sent Friend")
                }
                
                
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })

    }
    useEffect(() => {
        console.log("We opening profile"+ params.id+"Logged user email: "+email2)
        var ret = params.id.replace('profile','');
        console.log(ret);
        
        getProfile(ret)
        setShowWhich("posts")
        getReviews()
        
    }, [params,test])
    const showFR=(string)=>{
        setShowWhich(string)
    }
    const handleClick=()=>{
        console.log("Lets do work "+profilestatus)
        
        
        
        const URL = "http://localhost:5000/handlefriendbutton";
        var data2 ={
            Pemail: email,
            LUemail2: email2,
            profilestatus: profilestatus
            
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
            
          
        })
        
        
        .catch(error => {
            
            console.log("Error is: ",error.response)
        });
        console.log("change test value")
        setTest(test+1)
            console.log("Entered CONNN")
            if(profilestatus==="Friend"){
                setProfilestatus("Not Anything")
            }
            if(profilestatus==="Sent Friend"){
                setProfilestatus("Not Anything")
            }

    }
    const handleDelete=(id)=>{
        axios.post('/deletereview', {
            id: id
          })
          .then(function (response) {
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
        setItems(items.filter(review=>review._id !== id))
  
    }
    const center = {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%'
    }
    return (
        <div style={{alignItems: 'center',justifyContent: 'center'}} >
            <div style={{textAlign: 'center'}}><img width="100" height="100" src={'/content/'+propic}></img></div>
            <h1 style={{textAlign:'center'}}>{name}</h1>
            
            {email2==="Login"||profilestatus==="My Profile"?null
            :profilestatus==="Not Anything"?
            <div id="ccc" onClick={handleClick}><div id="confirm">Add Friend</div></div>
            :profilestatus==="Recieved Friend"?
            <div id="ccc" onClick={handleClick}><div id="confirm2">Accept Friend Request</div></div>
            :profilestatus==="Sent Friend"?
            <div id="ccc" onClick={handleClick}><div id="confirm2">Cancel Friend Request</div></div>
            :profilestatus==="Friend"?
            <div id="ccc" onClick={handleClick}><div id="confirm">Unfriend</div></div>
            :null}
            
            <br/>
            <br/>
            <h3 style={{borderLeft: '6px solid #1423A4', backgroundColor: '#088190', color:'#088190'  }}>..</h3>
            <Button onClick={()=>showFR("friends")} style={{left:'12%',top:'283px',backgroundColor: '#11204D', height: '34px', position: 'absolute'}}>View {name} Friends ({friends.length}) </Button>
            <Button onClick={()=>showFR("posts")} style={{left:'42%',top:'283px',backgroundColor: '#11204D', height: '34px', position: 'absolute'}}>View {name} Reviews </Button>
            <Button onClick={()=>showFR("about")} style={{left:'72%',top:'283px',backgroundColor: '#11204D', height: '34px', position: 'absolute'}}>View {name} About </Button>
            {showWhich==="friends"
            ?friends.map(friend=>(
            <ShowFriends fremail={friend}/>
            ))
            :null}
            {showWhich==="posts"
            ?(
                <div>
                    <h3 style={{borderLeft: '6px solid #1423A4', backgroundColor: '#5dbcd2', color: 'black' }}>View {name} Recent Reviews </h3>
                    <Jumbotron >
                        {items.map(item=>(<div style={{marginLeft: '450px', marginRight: '450px'}} key={item._id}><MDBRow>
              <MDBCol>
                <MDBCard news className="my-5">
                  <MDBCardBody>
                    <div className="content">
                    <img
                        src={'/content/'+item.userpropic}
                        alt=""
                        height={40}
                        className="rounded-circle avatar-img z-depth-1-half"
                      />
                      <a href='#' onClick={()=>{history.push('/profile/'+item.userid);}}>{item.user}</a>{item.user===email2?<button style={{float:"right"}} onClick={()=>handleDelete(item._id)}><FontAwesomeIcon icon={faTrashAlt}  color="red" /></button>:null}
                      <div className="left-side-meta">{item.date}</div>
                      
                    </div>
                  </MDBCardBody>
                  
                  <MDBCardBody>
                    <div className="social-meta">
                      <a>Restaurant: </a><a href="#" onClick={()=>{history.push('/restaurant/'+item.placeid);}}>{item.resname}</a>
                      <p>Rated: <FontAwesomeIcon icon={faStar} color="yellow" /> {item.rate}/10 </p>
                      <p>Tag: {item.tag}</p>
                      <p>{item.review}</p>
                      <span>
                          <Button variant="primary" size="sm" style={{marginRight:"170px"}} active>{item.likes} Upvote
                          </Button>
                          <Button variant="primary" size="sm" active>{item.likes} Downvote
                          </Button>
                
              </span>
                    </div>
                    <hr />
                    <MDBInput far icon="heart" hint="Add Comment..."  />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow></div>))}
                    
            </Jumbotron>
                    
                </div>
            )
            :null}
            {showWhich==="about"
            ?<About name={name} dob={dob} email={email} />
            :null}
            
        </div>
    )
}

export default Profile
