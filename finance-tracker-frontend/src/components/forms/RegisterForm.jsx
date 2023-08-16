import { useState } from "react";
import {useHistory} from "react-router-dom";
import axios from 'axios';
const BASE_URL = "http://localhost:5000"

function RegisterForm(props) {
  const history = useHistory();
  console.log("history", history)
  const formDefault = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: ""
  }

  const [formInfo, setFormInfo] = useState(formDefault)
  const [formErrors, setformErrors] = useState(formDefault)


  const changeHandler = (e)=>{
    setFormInfo({
      ...formInfo,
      [e.target.name]:e.target.value
    })
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    setformErrors(formDefault)
    async function registerUser(){
      try{
        const {data} = await axios.post(`${BASE_URL}/users`, {data:formInfo})
        console.log("data", data)
        //if data redirect to dashboard
        return history.push("/dashboard")
      }catch(error){
        console.log("error happened creating", error)
        // const {first_name="", last_name="", email="", password="", confirm_password=""} = error;
        setformErrors(error.response.data.error)
      }
    }

    console.log('forminfo',formInfo);
    registerUser()
  }

  return ( 
    <form className="container border py-2" onSubmit={submitHandler}>
      <h3>Register</h3>
      <div className="form-group">
        <label htmlFor="first_name">First Name:</label>
        <input onChange={changeHandler} type="first_name" name="first_name" id="first_name" className="form-control" />
        <p className="text-danger">{formErrors.first_name}</p>
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last Name:</label>
        <input onChange={changeHandler} type="last_name" name="last_name" id="last_name" className="form-control" />
        <p className="text-danger">{formErrors.last_name}</p>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input onChange={changeHandler} type="email" name="email" id="email" className="form-control" />
        <p className="text-danger">{formErrors.email}</p>
      </div>
      <div className="form-group pb-2">
        <label htmlFor="password">Password:</label>
        <input onChange={changeHandler} type="password" name="password" id="password" className="form-control" />
        <p className="text-danger">{formErrors.password}</p>
      </div>
      <div className="form-group pb-2">
        <label htmlFor="confirm_password">Confirm password:</label>
        <input onChange={changeHandler} type="password" name="confirm_password" id="confirm_password" className="form-control" />
        <p className="text-danger">{formErrors.confirm_password}</p>
      </div>
      <input type="submit" value="Register" className="btn btn-success" />
    </form>
  );
}

export default RegisterForm;