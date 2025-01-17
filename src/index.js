import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Set axios to a window property for easy access
window.axios = axios;
// // Default headers for API calls
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// // Base URL for your API calls
window.axios.defaults.baseURL = "http://localhost:8000/api/";
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
