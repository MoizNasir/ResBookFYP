import React, {useState,useEffect} from 'react'
import ShowFriends from './ShowFriends'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import './comsCSS.css'
function FriendsTab({id,islogged}) {
    const [friends, setFriends] = useState([])
    const [friends2, setFriends2] = useState([])
    let history = useHistory();
    const getFriends=async(id)=>{
        console.log("getting friends of", id)
        await axios.get('http://localhost:5000/user/'+id)
            .then(response => {
                console.log("Opened Profile Info: ",response.data)
                setFriends(response.data.friends)
                setFriends2(response.data.friends)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
            
    }
    const searchHandler=(e)=>{
        console.log(e.target.value)
        var searchresults=friends2.filter(friend => friend.startsWith(e.target.value))
        setFriends(searchresults)
        console.log(searchresults)

    }
    useEffect(() => {
        console.log("Logged user ID",id,islogged)
        if(islogged=="false"){
            history.push('/sign-in')
            
        }else{
            getFriends(id)

        }
        
    }, [])
    return (
        <div>
            <h3 style={{borderLeft: '6px solid #1423A4', backgroundColor: '#552624', color: '#FFFFFF ' }}>{friends?friends.length:null} Friends</h3>
            <div><input type="text" id="search" placeholder="Search Friend..." onChange={searchHandler}/></div>
            {friends.map(friend=>(
            <ShowFriends fremail={friend}/>
            ))}
        </div>
    )
}

export default FriendsTab
