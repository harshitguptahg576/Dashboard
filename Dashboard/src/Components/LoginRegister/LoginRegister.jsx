import React, { useRef, useState, useContext } from "react";
import "./LoginRegister.css";
import { MyContext } from "../../Authentication";
import Loading from "../Loading";
// import { Navigate } from "react-router-dom";
// import Success from "../Modal/Success";

// Main Component Function
const LoginRegister = () => {
  const Users = useContext(MyContext);
  const container = useRef(null);

  //   LogIn User
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  //   New User
  const [newuser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  //   Loading spin
  const [loading, setLoading] = useState("none");

  //   Validate the input fields
  const validate = (name, email, pwd) => {
    if (!name) return false;
    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) return false;
    if (!pwd) return false;
    return true;
  };

  //   Register Function(): Called by Sign Up Button
  const Register = (e) => {
    e.preventDefault();

    if (validate(newuser.name, newuser.email, newuser.password)) {
      // Check email should not already exist...
      let exist = false;
      Users.data.forEach((registerUser) => {
        if (registerUser.email === newuser.email) exist = true;
      });
      if (exist) alert("Email already Registered");
      else {
        setLoading("flex");
        Users.RegisterUser(newuser);
        setTimeout(() => {
          setLoading("none");
          alert("User Registered Successfully");
        }, 1000);
      }
      container.current.classList.remove("right-panel-active");
    } else alert("Fill All the Fields Correctly");
  };

  const Login = (e) => {
    e.preventDefault();

    if (validate(true, loginUser.email, loginUser.password)) {
      // Check email should not already exist...
      let exist = false;
      Users.data.forEach((registerUser) => {
        if (
          registerUser.email === loginUser.email &&
          registerUser.password === loginUser.password
        ) {
          exist = true;
          setLoading("flex");
          setTimeout(() => {
            setLoading("none");
            alert("Logged In Successfully");
            sessionStorage.setItem("token", true);
            sessionStorage.setItem("LoggedUser", JSON.stringify(registerUser));
            Users.setToken(true);
          }, 1000);
        }
      });
      if (!exist) {
        alert("Enter your correct Email & Password ");
        container.current.classList.add("right-panel-active");
      }
    } else alert("Fill All the Fields Correctly");
  };

  return (
    <div className="main">
      <div className="container" ref={container}>
        <div className="form-container sign-up-container">
          <form>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) =>
                setNewUser({ ...newuser, [e.target.name]: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) =>
                setNewUser({ ...newuser, [e.target.name]: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setNewUser({ ...newuser, [e.target.name]: e.target.value })
              }
              required
            />
            <button onClick={Register}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form>
            <h1>Sign in</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) =>
                setLoginUser({
                  ...loginUser,
                  [e.target.name]: e.target.value,
                })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setLoginUser({
                  ...loginUser,
                  [e.target.name]: e.target.value,
                })
              }
              required
            />
            <a href="#" className="forget">
              Forgot your password?
            </a>
            <button onClick={Login}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Login with your personal info...</p>
              <button
                className="ghost"
                onClick={() =>
                  container.current.classList.remove("right-panel-active")
                }
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details...</p>
              <button
                className="ghost"
                onClick={() =>
                  container.current.classList.add("right-panel-active")
                }
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <Loading show={loading} />
    </div>
  );
};

export default LoginRegister;
