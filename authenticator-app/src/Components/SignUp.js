import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { stat } from "fs";

const SignUp = () => {
  const [state, setState] = useState({
    mobileNo: "",
    email: "",
    password: "",
    cnfmPassword: "",
    errorOnSubmit: "",
    success: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.mobileNo.length !== 10) {
      setState({ ...state, ...{ errorOnSubmit: "Mobile No. is invalid" } });
    } else if (state.password !== state.cnfmPassword) {
      setState({
        ...state,
        ...{ errorOnSubmit: "Password and confirm password must be same" },
      });
    } else {
      axios
        .post("http://localhost:8011/createUser", {
          mobileNo: state.mobileNo,
          password: state.password,
          email: state.email,
          confirmPassword: state.cnfmPassword,
        })
        .then((response) => {
          console.log(response);
          if (response.data) {
            setState({
              ...state,
              ...{
                mobileNo: "",
                email: "",
                password: "",
                cnfmPassword: "",
                errorOnSubmit: "",
                success: "User created Succesfully",
              },
            });
          }
        })
        .catch((error)=> {
          setState( {...state,
            ...{
              mobileNo: "",
              email: "",
              password: "",
              cnfmPassword: "",
              errorOnSubmit: "",
              success: "User created Succesfully",
            },
          } );
          console.log(error);
        });
    }
  };
  console.log(state)
  return (
    <div className="container">
      <form className="form-class" onSubmit={handleSubmit}>
        <div className="form-group">
          <h1>Sign Up</h1>
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={state.email}
            onChange={(e) =>
              setState({ ...state, ...{ email: e.target.value,success:"",errorOnSubmit:"" } })
            }
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="Mobile number"
            value={state.mobileNo}
            onChange={(e) =>
              setState({ ...state, ...{ mobileNo: e.target.value,success:"",errorOnSubmit:"" } })
            }
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={state.password}
            onChange={(e) =>
              setState({ ...state, ...{ password: e.target.value,success:"",errorOnSubmit:"" } })
            }
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={state.cnfmPassword}
            onChange={(e) =>
              setState({ ...state, ...{ cnfmPassword: e.target.value,success:"",errorOnSubmit:"" } })
            }
            required
          />
        </div>
        {state.errorOnSubmit && (
          <div className="form-group">
            <span className="errorCls">{state.errorOnSubmit}</span>
          </div>
        )}
        {state.success && (
          <div className="form-group">
            <span className="success">{state.success}</span>
          </div>
        )}
        <button type="submit" className="btn btn-default btn-login">
          SIGN UP
        </button>
        <Link to="/" >Already have an account? Sign in</Link>
      </form>
    </div>
  );
};

export default SignUp;
