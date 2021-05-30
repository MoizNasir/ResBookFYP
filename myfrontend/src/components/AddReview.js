
/* eslint-disable no-undef */

import React, {useState,useEffect, useMemo}  from 'react'

import Dropdown from 'react-mui-multiselect-dropdown'
import ReactStars from 'react-stars'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import { tags } from "./tags";
import Icon from '@material-ui/core/Icon'
import Select from "react-select";
import { Paper, Grid, Typography, makeStyles, Button } from '@material-ui/core'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


import SideBar from './SideBar'
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }))

const useStyles2 = makeStyles((theme) => ({

    error: {
      color: theme.palette.error.dark,
      fontSize: '1em'
    },
    checkBox: {
      color: 'Purple'
    }
    
  }))


function AddReview(props) {

    
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [rating, setRating] = useState(null);



    
    const [inputvalue, setInputvalue]= useState("")

    const [review, setReview]= useState("")
    const [error, setError]= useState(null)
    const [success, setSuccess]= useState(null)

    const [items, setItems]=useState([])
    const [email,setEmail]=useState(props.email2)
    const handleChange=(e) =>{
      setSelectedOption2(e.target.value)
  }
    

    const addItem=()=>{
      
      console.log("User email in AR: ", props.email2, props.userid, selectedOption2)
      const URL = "http://localhost:5000/additem";
      var data2 ={
        user: props.email2,
        resname: props.res,
        date: new Date().toLocaleString(),
        rate: rating,
        tag: selectedOption2,
        review: review,
        userid: props.userid
    }
    console.log(data2);
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
      console.log(response)
      
      setSuccess("Review Posted Successfully")
      props.setUpdate(props.update+1)
      
  })
  .catch(error => {
      console.log(error.response)
  });

    }
    const inputProps = {
        step: 300,
      };
    const classes = useStyles();
    
    

    const style = {
      backgroundColor: "#990505",
      marginRight: "400px",
      marginLeft: "400px"
    };
    const style4 = {
      backgroundColor: "grey",
      color: "white",
      marginRight: "400px",
      marginLeft: "400px"
    };
    const style3 = {
      color: "white"
    };
    const style2 = {
      
      marginright: "20px"
    };
    useEffect(() => {
      console.log("Tags are",tags)
  }, [])
  const ratingChanged = (newRating) => {
    setRating(newRating)
  }
    
    
    return (
        <div>
        <div style={style}>
            
            <a style={style3}>Rate: </a>
            
            <ReactStars
            count={10}
            onChange={ratingChanged}
            size={24}
            color2={'#ffd700'} />
            <br></br>
            <a style={style3}>Tags: </a>
            
            <select name="Tags" value={selectedOption2} onChange={handleChange}>
        {tags.map(item=> <option value={item}>{item}</option>)}
        </select>
            <br></br>
            <a style={style3}>Review: </a>
            <textarea onChange={(e) => setReview(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            <br></br>
            {error?null:<Button variant="contained"
            color="primary"
            style={{float: 'right'}}
            className={classes.button}
            onClick={() => addItem()}
            
            >
        Post
      </Button>}
            
      {error? <div class="alert alert-danger" role="alert">{error}</div> : null}
      {success? <div class="alert alert-success" role="alert">{success}</div> : null}
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/> 
      
      
      

        </div>
    )

}


export default AddReview
