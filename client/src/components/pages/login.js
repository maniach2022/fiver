import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import IP from "../../env.js";
import { useAuth } from "../Hooks/useHook.js";

// import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-google';
// import axios from '../../utils/axios';

function Login() {
  // console.log("Login");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { login, setLogin } = useAuth();
  //   const [errors, setErrors] = useState({});
  //   const [disabled, setDisabled] = useState(true);
  //   const captcha = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  //   const { agentLogin } = useAuth();
  const to = location.state?.from?.pathname || "/controlStationData";
  //   useEffect(() => loadReCaptcha(), []);
  const login_ = async (credential) => {
    const { username, password } = credential;
    try {
      let obj = await axios.post("https://" + IP + ":4000/api/login/connect", {
        username,
        password,
      });
      if (obj.testing ? obj.testing : false) {
        return;
      }
      console.log(obj.data);
      localStorage.clear();
      if (obj.data.Table) {
        if (obj.data.Table[0]?.userIndex) {
          let port = obj.data.Table[0].LocalPortAddr;
          let index = obj.data.Table[0].userIndex;
          await initialize(username, password, port, index);
        }
      }
      //  console.log(obj);
    } catch (err) {
      console.log(err);
      alert("Wrong Username or Password");
      to = "/";
    }
    // console.log(obj.data);
    // // await initialize(username, password);
    // if (obj.data.Table) {
    //   if (obj.data.Table[0]?.userIndex) {
    //     let port = obj.data.Table[0].LocalPortAddr;
    //     let index = obj.data.Table[0].userIndex;
    //     await initialize(username, password, port, index);
    //     // let key = await createKey(username, password);

    //     return;
    //   } else {
    //     //TODO Wrong Password Screen
    //     alert("Wrong Username OR Password");
    //   }
    // }
  };

  const initialize = async (username, password, port, index) => {
    const { data } = await axios.post(
      "https://" + IP + ":4000/api/init/initialize",
      { username, password, port, index }
    );
    console.log(data);

    let key = data.key;
    localStorage.setItem("key", key);
    console.log("hello");
    console.log(key);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      //  console.log(credentials);
      let data = await login_(credentials);

      setLogin(true);
      //  console.log(data);
      navigate(to, { replace: true });

      // if (!data.error) {
      //   navigate(to, { replace: true });
      // } else {
      //   //Error Screen
      // }
    } catch (err) {}
    // try {
    //   await agentLogin(credentials);
    //   navigate(to, { replace: true });
    // } catch (err) {
    //   captcha.current.reset()
    //   setErrors(err.response.data);
    // }
    // navigate(to, { replace: true });
  };

  //   const onLoadRecaptcha = () => {
  //     if (captcha.current) captcha.current.reset();
  //   };

  //   const verifyCallback = async (token) => {
  //     try {
  //       await axios.post('/auth/verify-captcha', { token });
  //       setDisabled(false);
  //     } catch (err) {
  //       setErrors({ auth: 'Incorrect Token Used' });
  //     }
  //   };

  //   const expiredCallback = () => setDisabled(true);

  const renderForm = () => (
    <form onSubmit={onSubmit} className="layout-login">
      <h2
        className="fs-4 text-white text-center fw-600 my-4"
        style={{ textAlign: "center" }}
      >
        Dispatcher Login
      </h2>
      <div
        className="text-end mr-3rem mt-3rem"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="mb-3">
          <label
            htmlFor="inputUsername"
            className="d-inline mx-3 text-white fw-600"
          >
            Username : &nbsp;
          </label>
          <input
            type="text"
            className="d-inline form-input"
            id="inputUsername"
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            value={credentials.username}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="inputPassword"
            className="d-inline fw-600 mx-3 text-white"
          >
            Password : &nbsp;
          </label>
          <input
            type="password"
            className="d-inline form-input"
            id="inputPassword"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            value={credentials.password}
          />
        </div>
        {/* <div className="captcha">
          <ReCaptcha
            ref={captcha}
            size="normal"
            data-theme="dark"
            render="explicit"
            sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
            onloadCallback={onLoadRecaptcha}
            verifyCallback={verifyCallback}
            expiredCallback={expiredCallback}
          />
        </div> */}
        <br />
        <br />
        <button
          type="submit"
          className="btn btn-warning mb-2"
          //disabled={disabled}
          style={{ fontWeight: "bold" }}
        >
          Login
        </button>
        {/* {Object.keys(errors).length ? (
          <div className="fw-600" style={{color:'#AF0606'}}>{errors.auth}</div>
        ) : null} */}
      </div>
    </form>
  );

  return <div className="form-login">{renderForm()}</div>;
}
export default Login;
