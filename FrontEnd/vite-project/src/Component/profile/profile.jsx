import React from "react"
import './profile.css'
import { useState, useEffect } from "react";
import axios from "axios";
import personePic from '../images/pic.avif'
import MoreVertIcon from '@mui/icons-material/MoreVert';import HighlightOffIcon from '@mui/icons-material/HighlightOff';





const Profile = ({ setIsProfileActive}) => {

    const [file, setFile] = useState()
    const  [data, setData] = useState('')

    const userId = data._id


    const fetchData = async () => {
        const _id = localStorage.getItem('id');
        if (!_id) {
            console.error('User ID not found in local storage');
            return;
        }
        try {
            const result = await axios.get(`http://localhost:5500/API/user/getData/${_id}`);
            setData(result.data);
            console.log(result.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [data.picture]); 
    

 
    const hundelUpload = async () => {

        if (!file) {
            console.error("No file selected.");
            return;
        }
        console.log(file)
        
        const formData = new FormData()
        formData.append('file', file)
        console.log(formData)

        await axios.post(`http://localhost:5500/API/user/uploadPic/${userId}`, formData)
        .then(res => {
            console.log(res)
            fetchData();
        })
        .catch(err => console.log(err))
    }







    return(
        <div className="profileContainer" >
            <div className="profileCard">
                <div className="pivbtn">
                <HighlightOffIcon className="HighlightOffIcon" onClick={() => setIsProfileActive(false)}/>
                <MoreVertIcon className="MoreVertIcon"/>
                <h1>Profile</h1>
                {data.picture !== undefined ? (
                        <img className='profilePic' src={`http://localhost:5500/${data.picture}`} alt='Profile Picture' />
                    ) : (
                        <img className='profilePic' src={personePic} alt='Profile Picture' />
                    )}
                </div>
               <h2> {data.nom}<br></br> {data.prenom && data.prenom.toUpperCase()}</h2>
                <p>User Type: {data.userType}</p>
                <p>Email: {data.email}</p>
                <p>Created at: {new Date(data.createdAt).toLocaleDateString()}</p>
                {/* <input type="file" onChange={ e => setFile(e.target.files[0])}/>
                <button onClick={hundelUpload}>upload</button> */}
                
            </div>
        </div>
    )
}

export default Profile