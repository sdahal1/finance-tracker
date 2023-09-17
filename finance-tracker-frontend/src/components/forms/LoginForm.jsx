import { useState } from "react";
import axios from 'axios'
import {useHistory} from "react-router-dom";
const BASE_URL = "http://localhost:5000";


function LoginForm(props) {
  const history = useHistory();
  const formDefault = {
    email: "",
    password: ""
  }

  const [formInfo, setFormInfo] = useState(formDefault)
  const [formErrors, setFormErrors] = useState(formDefault)


  const changeHandler = (e)=>{
    setFormInfo({
      ...formInfo,
      [e.target.name]:e.target.value
    })
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    async function login(){
      try{
        const response = await axios.post(`${BASE_URL}/users/login`, {data:formInfo}, 
        {withCredentials:true}
        )
  
        console.log("response from api", response)
        if(response.status === 200) {
          history.push("/dashboard")
        }
      }catch(error){
        console.log(error)
        setFormErrors(error.response.data.error)
      }
    }
    login()
    console.log(formInfo);
  }

  return ( 
    <form onSubmit={submitHandler} className="container border py-2">
      <h3>Login</h3>
      <div className="form-group">
        <label htmlFor="login_email">Email:</label>
        <input onChange={changeHandler} type="email" name="email" id="login_email" className="form-control" />
        <p className="text-danger">{formErrors.email}</p>
      </div>
      <div className="form-group pb-2">
        <label htmlFor="login_password">Password:</label>
        <input onChange={changeHandler} type="password" name="password" id="login_password" className="form-control" />
        <p className="text-danger">{formErrors.password}</p>
      </div>
      <input type="submit" value="Login" className="btn btn-success" />
    </form>
  );
}

export default LoginForm;