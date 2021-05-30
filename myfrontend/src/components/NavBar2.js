import React, {useState,useEffect} from 'react'
import {Navbar,NavItem, NavDropdown} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import axios from 'axios'
import './comsCSS.css'
import Form from 'react-bootstrap/Form' 
import FormControl from 'react-bootstrap/FormControl'
import { withRouter, useHistory} from 'react-router-dom'; 
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { faUserAlt, faSignInAlt, faUserLock, faHome, faUsers, faChartLine, faBell } from '@fortawesome/free-solid-svg-icons'
function NavBar2({userID,logout,userPic, islogged, user2, inputvalue, setInputvalue}) {
    let history = useHistory();
    const [FR, setFR]= useState([])
    const [FRL, setFRL]= useState(0)
    const opensettings=()=>{
        setInputvalue("")
        history.push('/profilesetting');
        
        

    }

    const openProfile=()=>{
      setInputvalue("")
      history.push('/profile/'+userID);
      
      }
      
  
    const openhome=()=>{
      setInputvalue("")
      history.push('/');
    }
    const openFriends=()=>{
      setInputvalue("")
      history.push('/myfriends');
    }
    const getFRandNotifications=()=>{
      console.log("getting friend requests")
      axios.get('http://localhost:5000/'+userID)
            .then(response => {
                console.log("Recieve Requests: ",response.data.recievedRequests)
                console.log(response.data.recievedRequests.length)
                setFR(response.data.recievedRequests)
                setFRL(response.data.recievedRequests.length)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
          }
          
          
    useEffect(() => {
      if(islogged==="true"){
        getFRandNotifications()
        

      }
      
      
   
    },[islogged,FRL]);
    const searchOptions = {
      location: new window.google.maps.LatLng(33, 73),
      radius: 2000
    }
    const handleInput = async value =>{
      console.log(value)
      const placedetails= await geocodeByAddress(value)
      console.log(placedetails)
      console.log(placedetails[0].types)
      console.log(placedetails[0].formatted_address)
      var restaurant= value.split(',');
      /*setRes({
        name:restaurant[0],
        placeid:placedetails[0].place_id,
        address: placedetails[0].formatted_address
      })*/
      if(placedetails[0].formatted_address.includes("Islamabad")){
        if(placedetails[0].types.includes("restaurant")){
          //setError(null)
          history.push('/restaurant/'+placedetails[0].place_id);
          console.log("error set to null")
          
        }else{
          if(placedetails[0].types.includes("food")){
            //setError(null)
            history.push('/restaurant/'+placedetails[0].place_id);
          }else{
            alert("Error: Not A Restaurant, Please Select Restaurant In Islamabad")
          }
  
        }
      }else{
        console.log("Out Of Islamabad")
        alert("Error: Not A Restaurant, Please Select Restaurant In Islamabad")
  
      }
      
      setInputvalue(value)
    }
    return (
        <div>
            <Navbar className="color-nav" variant="dark">
                  <a style={{marginLeft:'-4px', marginRight:'3px', marginTop:"-2px", marginBottom:"-2px"}}><img
                  onClick={openhome}
                  src="/logoRR.jpg"
                  alt=""
                  height={50}
                  width={50}
                  style={{marginRight:"10px" , borderStyle:"double" , borderColor:"#b30000" ,}}
                  className="rounded-circle avatar-img z-depth-1-half"
                /></a>
                  
                  <PlacesAutocomplete value={inputvalue} onChange={setInputvalue} searchOptions={searchOptions}  onSelect={handleInput} >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading })=>(
                        <div><input style={{backgroundColor:'white',borderRadius:'12px',border:'none'}} {...getInputProps({placeholder:"   Search Restaurant"})}/>
                          <div style={{position:"absolute", top:"100%"}}>
                            {loading?<div style={{color:"white"}}>...loading</div>:null}
                            {suggestions.map((suggestion)=>{
                              const inputstyle ={
                                backgroundColor: suggestion.active? '#800505':"#9e0808",
                                color:"white"
                              }
                              return (<div {...getSuggestionItemProps(suggestion)} style={inputstyle}>
                                {suggestion.description}
                              </div>)
                            })}
                          
                          </div>
                        </div>
                        )}</PlacesAutocomplete>
                  <Nav style={{marginLeft:"33%"}} className="mr-auto">
                    <Nav.Link style={{color: 'white', fontSize:"20px"}} onClick={openhome}><FontAwesomeIcon icon={faHome} color="white" /></Nav.Link>
                    <Nav.Link style={{color: 'white', marginLeft:"10%" , fontSize:"20px"}} onClick={openFriends}><FontAwesomeIcon icon={faUsers} color="white" /></Nav.Link>
                    <Nav.Link style={{color: 'white', marginLeft:"10%" , fontSize:"20px"}} onClick={openhome}><FontAwesomeIcon icon={faChartLine} color="white" /></Nav.Link>
                    </Nav>
                  {islogged==="true" 
                  ? null
                  : <Nav style={{position: 'absolute', right: 85}} className="mr-auto">
                    <Nav.Link style={{color: 'white'}} to="/sign-up" href="/sign-up"><FontAwesomeIcon icon={faUserLock} color="white" /> Signup</Nav.Link>
                    </Nav>
                    }
                  
                  <Nav style={{position: 'absolute', right: 15, top:9}} className="mr-auto">
                  
                  {islogged==="true"
                  ?<Nav.Link onClick={openProfile} style={{color: 'white'}} ><img
                  src={'/content/'+userPic}
                  alt=""
                  height={30}
                  style={{marginRight:"10px"}}
                  className="rounded-circle avatar-img z-depth-1-half"
                />{user2}</Nav.Link>
                  :null}
                  {islogged==="true"
                  ?<Nav.Link style={{color: 'white'}} ><FontAwesomeIcon icon={faBell} color="white" /></Nav.Link>
                  :null}
                    
                    
                    {islogged==="true"?<NavDropdown style={{color: 'white'}} id="nav-dropdown">
                      <NavDropdown.Item eventKey="4.1" onClick={logout}>Logout</NavDropdown.Item>
                      <NavDropdown.Item eventKey="4.2" onClick={opensettings}>Account Setting</NavDropdown.Item>
                      
                      </NavDropdown>
                      :<Nav.Link style={{color: 'white'}} to="/sign-in" href="/sign-in"><FontAwesomeIcon icon={faSignInAlt} color="white" /> Signin</Nav.Link>}
                  
                    
                  </Nav>
                </Navbar>
                {inputvalue==""?null:<div></div>}
        </div>
    )
}

export default withRouter(NavBar2)
