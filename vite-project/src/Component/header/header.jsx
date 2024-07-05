import React from 'react'
import './header.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import personePic from '../images/pic.avif'
import LogoPic from '../images/logo.png'
import SearchIcon from '@mui/icons-material/Search'
import Profile from '../profile/profile'


const Header = ({ nighteMood }) => {
    const token = localStorage.getItem('token')
    const [data, setData] = useState({
        nom: '',
        prenom: '',
        userType: '',
        email: '',
    })

    const [isProfileActive, setIsProfileActive] = useState(false)

    const fetchData = async () => {
        const _id = localStorage.getItem('id');
        if (!_id) {
            console.error('User ID not found in local storage');
            return;
        }
        try {
            const result = await axios.get(`http://localhost:5500/API/user/getData/${_id}`);
            setData(result.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [isProfileActive]);



    return (
        <div className='headerContainer'>
            <div className='Logocontainer'>
                <img className='logoPic' src={LogoPic} alt='Profile Picture' />
            </div>
            <div className='recherchContainer'>
                <form>
                    <input className={`recherche ${nighteMood ? 'recherche-night' : 'recherche-day'}`} placeholder="Recherche" ></input>
                    <button className={`${nighteMood ? 'btnNight' : 'btnDay'}`} type='submit'><SearchIcon /></button>
                </form>
            </div>
            <div className='adminProfileContainer' onClick={() => setIsProfileActive(true)}>
                <div className='infoCon'>
                    <h3>{data.prenom} {data.nom} </h3>
                    <h4 className='profileUserType'><div className='online'></div>{data.userType}</h4>
                </div>

                <div className='imgCon' >
                    {data.picture !== undefined ? (
                        <img className='headerProfilePic' src={`http://localhost:5500/${data.picture}`} alt='Profile Picture' />
                    ) : (
                        <img className='headerProfilePic' src={personePic} alt='Profile Picture' />
                    )}
                </div>
            </div>
            {isProfileActive ? <Profile data={data} token={token} setIsProfileActive={setIsProfileActive} /> : ''}
        </div>
    )

}

export default Header