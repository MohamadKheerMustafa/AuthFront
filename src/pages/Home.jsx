import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [showFullToken, setShowFullToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const toggleTokenDisplay = () => {
    setShowFullToken(!showFullToken);
  };

  const formatToken = (token) => {
    const chunkSize = 10;
    const chunks = [];
    for (let i = 0; i < token.length; i += chunkSize) {
      chunks.push(token.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const handleLogout = () => {
    if (!userData || !userData.token) {
      Swal.fire({
        icon: "error",
        text: "No user data found. Please log in first.",
        timer: 2000,
        background: "white",
        color: "black",
      });
      return;
    }

    axios
      .post(
        "/users/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            text: "Logged out successfully",
            timer: 2000,
            background: "white",
            color: "black",
          });
          localStorage.removeItem("userData");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error)
        Swal.fire({
          icon: "error",
          text: "Failed to log out. Please try again.",
          timer: 2000,
          background: "white",
          color: "black",
        });
      });
  };

  return (
    <div className="flex flex-col justify-center border rounded-[20px] items-center w-[400px] m-auto mt-20 shadow-lg shadow-white p-6">
      <h1 className="flex justify-center mt-4 text-4xl font-extrabold text-sky-500">
        Profile Info:
      </h1>
      <div className="text-xl text-gray-300 mt-6 space-y-4">
        {userData ? (
          <div>
            <h2>Welcome, {userData.name}</h2>
            <p>id: {userData.id}</p>
            <p>Email: {userData.email}</p>
            <p>Email Verified At: {userData.email_verified_at}</p>
            <p>Created At: {userData.created_at}</p>
            <p>Updated At: {userData.updated_at}</p>
            <p>Token Type: {userData.token_type}</p>
            <p className="break-words">
              Token:
              {showFullToken ? (
                <div>
                  {formatToken(userData.token).map((chunk, index) => (
                    <div key={index}>{chunk}</div>
                  ))}
                </div>
              ) : (
                `${userData.token.slice(0, 30)}...`
              )}
              <button
                className="ml-2 text-blue-500 hover:underline"
                onClick={toggleTokenDisplay}
              >
                {showFullToken ? "Show Less" : "Show More"}
              </button>
            </p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <p>No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
