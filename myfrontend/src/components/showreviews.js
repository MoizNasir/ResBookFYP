import React, { useState, useEffect } from 'react'
import {  MDBRow,  MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBCol, MDBCardImage, MDBInput} from "mdbreact";
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { withRouter, useHistory} from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faLocationArrow, faTag, faMapMarkerAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { tags } from "./tags";
import ReactStars from 'react-stars'
import axios from 'axios'

function ShowReviews({test, islogged, email2}) {
    const [items, setItems]=useState([])
    const [items2, setItems2]=useState([])
    const [test2, setTest2]=useState(test)
    const [update, setUpdate]=useState(0)
    const [option, setOption]=useState('All')
  
    let history = useHistory();
    
    const handleChange=(tag) =>{
      setOption(tag)
      if(tag=='All'){
        setItems2(items)
    }else{
      setItems2(items.filter(item=>item.tag == tag))
    }

      }
      
    useEffect(()=>{
        axios.get('http://localhost:5000/getreviews')
            .then(response => {
                setItems(response.data);
                setItems2(response.data)
                console.log("API got all reviews bro")
                
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    
    

    },[test2,update])
    
    const handleDelete=(id)=>{
      axios.post('/deletereview', {
          id: id
        })
        .then(function (response) {
            
        })
        .catch(function (error) {
          console.log('Error is ',error);
        });
      setItems2(items2.filter(review=>review._id !== id))

  }
  const handleLikes=(id)=>{
    axios.post('/increaselikes', {
      postid: id
      })
      .then(function (response) {
        console.log("Like response: ", response.data)
        setUpdate(update+1)
          
      })
      .catch(function (error) {
        console.log('Error is ',error);
      });

}
const handleDislikes=(id)=>{
  axios.post('/increasedislikes', {
    postid: id
    })
    .then(function (response) {
      console.log("Dislike response: ", response.data)
      setUpdate(update+1)
        
    })
    .catch(function (error) {
      console.log('Error is ',error);
    });

}
    const style4 = {
        backgroundColor: "grey",
        color: "white",
        marginRight: "400px",
        marginLeft: "400px"
      }; 
    
    return (
        <div>
          
                      <br></br>
          {tags.map(tag=>(
                <button
                type="button"
                className="btn toggle-btn"
                
                style={{backgroundColor: tag===option?'#552624':null , border:'2px solid #6F020A',color:tag===option? '#FFFFFF ':null, width:'96px' }}
                onClick={()=>{handleChange(tag)}}
              >
                <span>{tag}</span>
              </button>
              
            ))}
          <h3 style={{borderLeft: '6px solid #1423A4', backgroundColor: '#552624', color: '#FFFFFF ' }}>Recent Reviews </h3>
          <Jumbotron >
                {items2.map(item=>(<div style={{marginLeft: '450px', marginRight: '450px'}} key={item.id}><MDBRow>
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
              <Button variant="primary" size="sm" onClick={()=>handleLikes(item._id)} style={{marginRight:"170px"}} active>{item.likes} Upvote
              </Button>
              <Button variant="primary" size="sm" onClick={()=>handleDislikes(item._id)} active>{item.dislikes} Downvote
              </Button>
                
              </span>
              
            </div>
            <hr />
            <MDBInput far icon="heart" hint="Add Reply..."  />
            <Button variant="primary" size="sm" style={{marginLeft:"290px"}} active> Reply
              </Button>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow></div>))}
            
    </Jumbotron>
        </div>
    )
}

export default withRouter(ShowReviews)
