import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../CSS/Login.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Login({ socket }) {
  const [registerError, setRegisterError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const loginSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/user/login", data);
      const { accesstoken, user } = res.data;

      Cookies.set("token", accesstoken);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userId", user._id);

      socket.emit("newUser", { userName: user.name, userId: user._id, socketID: socket.id });

      window.location.href = "/Dashboard";
    } catch (error) {
      setLoginError("Login failed. Please check your credentials.");
    }
  };

  const registerSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/user/register", data);
      console.log(res.data);
      reset(); // Reset the form on successful registration
    } catch (error) {
      setRegisterError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="l">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form onSubmit={handleSubmit(registerSubmit)}>
            <label className="label" htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              className="input"
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
<br/>
            <input
              className="input"
              type="text"
              placeholder="Role"
              {...register("role", { required: "Role is required" })}
            />
            {errors.role && <p className="error">{errors.role.message}</p>}
            <br/>
            <input
              className="input"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
            <br/>
            <input
              className="input"
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}

            <button type="submit" className="button">Sign up</button>

            {registerError && <p className="error">{registerError}</p>}
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleSubmit(loginSubmit)}>
            <label className="label" htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              className="input"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
            <br/>
            <input
              className="input"
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}

            <button type="submit" className="button">Login</button>

            {loginError && <p className="error">{loginError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
