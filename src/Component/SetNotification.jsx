import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SetNotification = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/dashboard", {
          headers: {
            Authorization: token,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error);
          navigate("/login");
          return;
        }
      } catch (err) {
        //console.log("FULL ERROR:", err);
        alert("Server Error");
        navigate("/login");
      }
    };
    checkAuth();
  }, []);
  return (
    <div>
      setNotification By users
      <h1>Notification Users</h1>
    </div>
  );
};

export default SetNotification;
