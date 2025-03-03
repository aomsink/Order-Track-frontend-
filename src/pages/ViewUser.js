import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './ViewUser.css';

function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [order_id, setOrder_id] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/view-user/${id}`);
        setUser(res.data);
        setOrder_id(res.data.order_id);
        setStatus(res.data.status);
      } catch (error) {
        console.log("Error fetching user: " + error);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]);

  if (user === null || order_id === "" || status === "") {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>View Order</h1>
      <div className="card">
        <div className="card-header">
          Order ID: {user.order_id}
        </div>
        <div className="card-body">
          <h5 className="card-title">Status: <span className={`status ${user.status.toLowerCase()}`}>{user.status}</span></h5>
          <p className="card-text">Location: {user.location}</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
