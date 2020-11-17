import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [state, setState] = useState({
    userName: "",
    password: "",
    error: "",
    isForgetPassword:false,
    emailForPasswordChange:"",
    forgetPassSuccess:"",
  });
  const handleChangePassword = (e) =>{
    e.preventDefault();
    axios
    .post("http://localhost:8011/resetPassword", {
      email: state.emailForPasswordChange,
    }).then((response) => {
      if (response.data ) {
        setState({ ...state, ...{ emailForPasswordChange:"", forgetPassSuccess: "your password sent successfully to your email account",error:"" } });

      }
    })
    .catch(function (error) {
      setState({ ...state, ...{ error: "Oops something went wrong" } });
      console.log(error);
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8011/authenticateUser", {
        userName: state.userName,
        password: state.password,
      })
      .then((response) => {
        if (response.data && response.data.data === "success") {
          history.push("/authenticatedPage");
        }
        if (response.data && response.data.data === "failed") {
          setState({ ...state, ...{ error: "UserName and Password invalid" } });
        }
      })
      .catch(function (error) {
        setState({ ...state, ...{ error: "Oops something went wrong" } });
        console.log(error);
      });
  };
  return (
    <div className="container">
      {state.isForgetPassword ?       <form className="form-class" onSubmit={handleChangePassword}>
      <div className="form-group">
          <h3>Enter email to reset Password</h3>
        </div>
      <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={state.emailForPasswordChange}
            onChange={(e) =>
              setState({ ...state, ...{ emailForPasswordChange: e.target.value, error: "",forgetPassSuccess:"" } })
            }
            required
          />
        </div>
        {state.error && (
          <div className="form-group">
            {" "}
            <span className="success">{state.forgetPassSuccess}</span>
          </div>
        )}
        <button type="submit" className="btn btn-default btn-login">
          Reset Password
        </button>
        <a onClick={(e)=>{setState({...state,...{isForgetPassword:false}})}}>Back</a>


</form>
: 
      <form className="form-class" onSubmit={handleSubmit}>
        <div className="form-group">
          <h1>Login</h1>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email or Mobile number"
            value={state.userName}
            onChange={(e) =>
              setState({ ...state, ...{ userName: e.target.value, error: "" } })
            }
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            value={state.password}
            onChange={(e) =>
              setState({ ...state, ...{ password: e.target.value, error: "" } })
            }
            required
          />
        </div>
        {state.error && (
          <div className="form-group">
            {" "}
            <span className="errorCls">{state.error}</span>
          </div>
        )}
        <button type="submit" className="btn btn-default btn-login">
          Login
        </button>
        <a onClick={(e)=>{setState({...state,...{isForgetPassword:true}})}}>Forgot Password ?</a>
        <hr />

        <Link to="/Sign-up">
          <div className="btn btn-default btn-signup">Create An Account</div>
        </Link>
      </form>
}
    </div>

  );
};

export default Login;
