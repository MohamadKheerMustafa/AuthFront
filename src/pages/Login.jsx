import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        "/users/login",
        { email, password },
        { headers: { Accept: "application/json" } }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200 && response.statusText === "OK") {
          const userData = response.data.data;
          let data = {
            ...userData,
            token: response.data.token,
            token_type: response.data.token_type,
          };

          Swal.fire({
            icon: "success",
            text: "Signed in successfully, Welcome " + userData.name,
            timer: 2000,
            background: "white",
            color: "black",
          });
          // Store user data in localStorage
          localStorage.setItem("userData", JSON.stringify(data));
          navigate("/home");
        }
      })
      .catch((error) => {
        if (error.response.status === 422 || error.response.status === 401) {
          setErrorMessage(error.response.data.message);
          Swal.fire({
            icon: "error",
            text: `${error.response.data.message}`,
            timer: 2000,
            background: "white",
            color: "black",
          });
          setPassword("");
          return;
        }
        Swal.fire({
          icon: "error",
          text: "something wrong, try again",
          timer: 2000,
          background: "white",
          color: "black",
        });
        setPassword("");
      });
  }

  return (
    <div className="">
      <div className="flex justify-center mt-4 text-4xl font-extrabold text-sky-500">
        Welcome !!
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex-col w-[300px] h-[400px] p-4 mt-10 justify-center items-center m-auto border rounded-xl shadow-slate-600 shadow-2xl"
      >
        <div className="flex flex-1 pt-4 ">
          <Input
            lable="Email:"
            type="email"
            placeHolder="Enter your email:"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex flex-1 pt-4 ">
          <Input
            lable="Password:"
            type="password"
            placeHolder="Enter your password:"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 mt-5 ml-4">{errorMessage}</div>
        )}
        <Button title={"Login"} className="bg-sky-500" type={"submit"} />
        <div className="text-gray-300 mt-4"> Not a user? Sign up</div>
        <Button
          className="bg-sky-500 mt-2"
          onClick={() => handleRegister()}
          title="Sign up"
        />
      </form>
    </div>
  );
};

export default Login;
