import axios from "axios";
import { useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8800/api/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <><Navbar/>
   
    <div className="login">
    <span className="logo">
      
    <img src="https://1ststepaccounting.com/wp-content/uploads/2017/07/airbnb-logo.png"
              style={{ width: "100px" }}
              alt="Airbnb Logo"
            />
          </span>
          <h1>Login</h1>
      <div className="lContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={credentials.username}
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
        <span>
            Don't have an account? <Link to="/register">Register</Link>
       </span>
      </div>
    </div>
    </>
  );
  
};

export default Login;
