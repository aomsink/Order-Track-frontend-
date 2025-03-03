import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
    
    const[status, setStatus] = useState("");
    const[location, setLocation] = useState("");
    const [message, setMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/user/${id}`);
                
                setStatus(res.data.status);
                setLocation(res.data.location);

            } catch (error) {
                setMessage("Error Fetching User")

            }
            //ถ้า ไม่มี Dependency => useEffect() จะทำงานทุกครั้งที่ Component ทำการ render
            //ถ้า [] ว่างเปล่า => useEffect() จะทำฃานแค่ตอน mount (โหลดครั้งแรกเท่านั้น)
            //ถ้ามีค่าใน Dependency => useEffect() จะทำงานเมื่อค่าที่กำหนดเปลี่ยนแปลง
        }
        if (id) {
            fetchUser();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
           await axios
                .put(`http://localhost:5000/update-user/${id}`, {  status, location });
            navigate("/")

        } catch (error) {
            setMessage("Error Updating User. Please Try Again")

        }
    }

    return (
        <div className='container'>
            <h2>Update User</h2>
            {message && <p className='text-danger'>{message}</p>}
            <form onSubmit={handleSubmit}>
                

                <div className='w-25 mb-3'>
                    <label className='form-label'>Status: {status}</label>
                    <input
                        type='text'
                        className='form-control'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    />
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>Location: {location}</label>
                    <input
                        type='text'
                        className='form-control'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <button type='submit' className='btn btn-success'>Submit</button>
            </form>
        </div>
    )
}
export default UpdateUser;
