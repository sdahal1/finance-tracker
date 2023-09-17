import axios from 'axios';
import {useState, useEffect} from 'react';

function Dashboard() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  useEffect(()=>{
    axios.get("http://localhost:5000/users/getloggedinuser", {withCredentials:true})
      .then(response=>{
        console.log(response.data)
        setLoggedInUser(response.data.success);
      })
      .catch(err=>{
        console.log("****err****", err)
      })
  },[])
  
  if(!loggedInUser){
    return <h1>Access Denied. Please login first</h1>
  }
  return ( 
    <div>
      <h1>Welcome {loggedInUser.first_name} {loggedInUser.last_name}</h1>
    </div> 
  );
}

export default Dashboard;