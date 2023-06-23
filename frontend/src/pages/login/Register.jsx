
 
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/navbar/Navbar";
// import "./Register.css";

// const Register = () => {
//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//     email: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear previous error

//     try {
//       const { confirmPassword, ...requestData } = credentials;
//       if (requestData.password !== confirmPassword) {
//         setError("Passwords do not match");
//         return;
//       }

//       const res = await axios.post("http://localhost:8800/api/register", requestData);
//       console.log(res.data); // Assuming the server response contains the saved user details
//       navigate("/login");
//     } catch (err) {
//       setError(err.response.data.message);
//     }
//   };

//   return (
//     <><Navbar/>
//     <div className="register">
//        <span className="logo">
      
//       <img src="https://1ststepaccounting.com/wp-content/uploads/2017/07/airbnb-logo.png"
//                 style={{ width: "100px" }}
//                 alt="Airbnb Logo"
//               />
//             </span>
//             <h1>Create Account</h1>
//       <div className="rContainer">
//         <input
//           type="text"
//           placeholder="Username"
//           id="username"
//           value={credentials.username}
//           onChange={handleChange}
//           className="rInput"
//         />
//         <input
//           type="Email"
//           placeholder="Email"
//           id="email"
//           value={credentials.email}
//           onChange={handleChange}
//           className="rInput"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           id="password"
//           value={credentials.password}
//           onChange={handleChange}
//           className="rInput"
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           id="confirmPassword"
//           value={credentials.confirmPassword}
//           onChange={handleChange}
//           className="rInput"
//         />
//         <button onClick={handleClick} className="rButton">
//           Register
//         </button>
//         {error && <span>{error}</span>}
//       </div>
//     </div>
//     </>
//   );
// };

// export default Register;



import axios from "axios";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./Register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    // Validation
    const { confirmPassword, ...requestData } = credentials;
    let validationErrors = {};

    if (!requestData.username.trim()) {
      validationErrors.username = "Username is required";
    }

    if (!requestData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!isValidEmail(requestData.email)) {
      validationErrors.email = "Please enter a valid email";
    }

    if (!requestData.password) {
      validationErrors.password = "Password is required";
    } else if (requestData.password.length < 6) {
      validationErrors.password = "Password should be at least 6 characters";
    }

    if (requestData.password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8800/api/register", requestData);
      console.log(res.data); //   saved user details
      navigate("/login");
    } catch (err) {
      setErrors({ server: err.response.data.message });
    }
  };

  const isValidEmail = (email) => {
    // Simple email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <Navbar />
      <div className="register">
        <span className="logo">
          <img
            src="https://1ststepaccounting.com/wp-content/uploads/2017/07/airbnb-logo.png"
            style={{ width: "100px" }}
            alt="Airbnb Logo"
          />
        </span>
        <h1>Create Account</h1>
        <div className="rContainer">
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={credentials.username}
            onChange={handleChange}
            className="rInput"
          />
          {errors.username && <span className="error">{errors.username}</span>}
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            className="rInput"
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            className="rInput"
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleChange}
            className="rInput"
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          {errors.server && <span className="error">{errors.server}</span>}
          <button onClick={handleClick} className="rButton">
            Register
          </button>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
