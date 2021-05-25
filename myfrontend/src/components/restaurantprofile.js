import React, {useState,useEffect} from 'react'
import {useParams,withRouter, useHistory} from "react-router-dom";
import { geocodeByPlaceId } from 'react-places-autocomplete';
import {  MDBRow,  MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBCol, MDBCardImage, MDBInput} from "mdbreact";
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {GeoAlt, GetAlt } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faTag, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import AddReview from './AddReview';
import { isFragment } from 'react-mui-multiselect-dropdown';
function Restaurantprofile({email2,userID, islogged, inputvalue, searchres}) {
    let params = useParams();
    console.log(params.placeid)
    let history = useHistory();
    const [items, setItems]=useState([])
    const [resname, setResname]=useState()
    const [address, setAddress]=useState()
    const [update, setUpdate]=useState(0)
    const [res, setRes]= useState([])
    const getProfile=(placeid, restaurant)=>{
        axios.get('http://localhost:5000/restaurant/'+placeid)
            .then(response => {
                console.log("Result From Backend",response.data)
                setResname(response.data.name)
                setAddress(response.data.address)
                setRes({
                  name:restaurant,
                  placeid:placeid,

                })
                

                
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    const checkIfExists=(placeid, address)=>{
      var restaurant= inputvalue.split(',');
      console.log("Restarant name from input value split main",restaurant[0])
      axios.post('/restaurantexists', {
        placeid: placeid,
        name: restaurant[0],
        address: address
      })
      .then(function (response) {
        console.log(response.data)
        getProfile(params.placeid,restaurant[0])
        getReviews(params.placeid)

          
      })
      .catch(function (error) {
        console.log('Error is ',error);
      });
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
    const getReviews=(placeid)=>{
        axios.get('http://localhost:5000/getreviews')
        .then(response => {
            console.log(response.data)
            setItems(response.data.filter(item=>item.placeid == placeid))
            console.log("API got all reviews bro")
        })
        .catch(function (error){
            console.log(error);
            console.log("Aey te error hai bro")
        })
    }
    useEffect(() => {
        var restaurant= inputvalue.split(',');
        console.log(inputvalue)
        if(inputvalue!=""){
          if(restaurant.length>1){
          console.log("We opening profile "+ params.placeid, inputvalue)
          geocodeByPlaceId(params.placeid)
          .then(results => checkIfExists(params.placeid,results[0].formatted_address))
          .catch(error => console.error(error));
          }
        }else{
          
            console.log("We opening profile and input value null which means we no searching"+ params.placeid, inputvalue)
            getProfile(params.placeid,restaurant[0])
            getReviews(params.placeid)
            setRes({
              name:restaurant[0],
              placeid:params.placeid,

            })
  
          
        }
        
        

        
        
        
        
        
        
    }, [params, update])
    return (
        <div>
            <Jumbotron>
                <h1>{resname}</h1>
                <a><GeoAlt/>{address}</a>
                <a style={{float:"right"}}>Price</a><br></br>
                <a style={{float:"right"}}>$$$$</a>
            </Jumbotron>
            {islogged=="true"?<AddReview userID={userID} email2={email2} res={res} setUpdate={setUpdate} update={update}  />:null}
            <h3 style={{borderLeft: '6px solid #1423A4', backgroundColor: '#552624', color: '#FFFFFF ' }}>Restaurant Reviews </h3>
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
              <p>Tag: <FontAwesomeIcon icon={faTag} color="blue" /> {item.tag}</p>
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
}

export default Restaurantprofile
