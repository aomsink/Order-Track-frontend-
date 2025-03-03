import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {

  const [data, setData] = useState([]);

  useEffect(() => {
      fetchUser();
  }, []);

  const fetchUser = async () => {
      try {
          const res = await axios.get('http://localhost:5000/');
          console.log("Fetched Data:", res.data);  // ตรวจสอบข้อมูลที่ได้จาก API
          setData(res.data);
          console.log("Success");
      } catch (error) {
          console.log("Fail", error);
      }
  };
  

  const deleteUser = async (id) => {
      if (window.confirm("Are you sure ?")) {
          try {
             await axios.delete(`http://localhost:5000/delete-user/${id}`);
              fetchUser()
              

          } catch (error) {
              console.log("Error deleting user: " + error)
          }
      }
  }
  return (
    <>
      <div className="container text-center">
        <h1>Order Tracking</h1>
        <Link to="/create-user" className="btn btn-primary btn-sm mb-3">
          add order
        </Link>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">order_id </th>
              <th scope="col">status</th>
              <th scope="col">location</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.order_id}</td>
              <td>{item.status}</td>
              <td>{item.location}</td>
              <td>
              <button className="btn btn-warning">  <Link to= {`edit-user/${item.id}`} >Edit</Link></button>
              {" "}
              <button className="btn btn-info"> <Link to= {`view-user/${item.id}`} >View</Link></button>
              {" "}
              <button className="btn btn-danger"> <Link to="#" className='MyFont' onClick={() => deleteUser(item.id)}>Delete</Link> </button>

              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Home;
