import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    name: [],
    email: [],
    password: [],
    password_confirmation: [],
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "/users/register",
        { ...data },
        { headers: { Accept: "application/json" } }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200 && response.statusText === "OK") {
          Swal.fire({
            icon: "success",
            text: `${response.data.data.name}`,
            timer: 2000,
            background: "white",
            color: "black",
          });
          navigate("/home");
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const errors = error.response.data.message;
          setErrorMessage({
            name: errors.name ? errors.name.join(", ") : [],
            email: errors.email ? errors.email.join(", ") : [],
            password: errors.password ? errors.password.join(", ") : [],
            password_confirmation: errors.password_confirmation
              ? errors.password_confirmation.join(", ")
              : [],
          });
          Swal.fire({
            icon: "error",
            text: `Registration failed. Please check the errors.`,
            timer: 2000,
            background: "white",
            color: "black",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "An unexpected error occurred. Please try again later.",
            timer: 2000,
            background: "white",
            color: "black",
          });
        }
      });
  };

  return (
    <div className="">
      <div className="flex justify-center mt-4 text-4xl font-extrabold text-sky-500">
        Register !!
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[350px] h-[50%] p-4 mt-10 justify-center items-center m-auto border rounded-xl shadow-slate-600 shadow-2xl"
      >
        {errorMessage && (
          <div className="mt-5 ml-4">
            {errorMessage.name && (
              <div className="text-red-500">{errorMessage.name}</div>
            )}
            {errorMessage.email && (
              <div className="text-red-500">{errorMessage.email}</div>
            )}
            {errorMessage.password && (
              <div className="text-red-500">{errorMessage.password}</div>
            )}
            {errorMessage.password_confirmation && (
              <div className="text-red-500">
                {errorMessage.password_confirmation}
              </div>
            )}
          </div>
        )}
        <div className="flex flex-1 pt-4 ">
          <Input
            lable="Name:"
            type="text"
            placeHolder="Enter your full name:"
            onChange={(e) =>
              setData({
                ...data,
                name: e.target.value,
              })
            }
            value={data.name}
          />
        </div>
        <div className="flex flex-1 pt-4 ">
          <Input
            lable="Email:"
            type="email"
            placeHolder="Enter your email:"
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            value={data.email}
          />
        </div>
        <div className="flex flex-1 pt-4">
          <Input
            lable="Password:"
            type="password"
            placeHolder="Enter your password:"
            onChange={(e) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
            value={data.password}
          />
        </div>
        <div className="flex flex-1 pt-4 ">
          <Input
            lable="Confirm Password:"
            type="password"
            placeHolder="Enter your password again:"
            onChange={(e) =>
              setData({
                ...data,
                password_confirmation: e.target.value,
              })
            }
            value={data.password_confirmation}
          />
        </div>
        <Button title={"Register"} className="bg-sky-500" type={"submit"} />

        <Button
          className="bg-sky-500 mt-2 w-[250px]"
          onClick={() => handleLogin()}
          title="You have an account, login"
        />
      </form>
    </div>
  );
};

export default Register;
