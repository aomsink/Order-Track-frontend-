import React, { Component } from 'react'
import axios from 'axios';

class Employee extends Component {
    constructor(){
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        axios
        .get("http://localhost:5000")  //endpoint
        .then(res => {
            //const { data } = res.data;
            this.setState({
                data: res.data
            });
        })
        .catch( err => {
            console.log("Error");
        });
    }

  render() {
    return (
        <>
        <div className="MyHome">Employee</div>
        <div className="container text-center">
          <h1>Employee</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
              </tr>
            </thead>
            <tbody>
            {this.state.data.map(item => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </>
    )
  }
}
export default Employee;