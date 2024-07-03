import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css'
import axios from 'axios'




const login = () => {
    const [isActive , setIsActive] = useState(false)
    const [singUpError , setSingUpError] = useState("")
    const [singUpDone , setSingUpDone] = useState("")
    const navigate = useNavigate()
    const handleChange = () => {
        setIsActive(!isActive)
    }

//Sing Up functions
    const [nom , setNom] = useState('')
    const [prenom , setPrenom] = useState('')
    const [userType, setUserType] = useState('Admin')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')

    const [isPassCorrect , setIsPassCorrect] = useState(true)

    const newUserPost = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            console.log("Password and confirm password do not match.");
            setIsPassCorrect(false);
            setTimeout(() => {
                setIsPassCorrect(true);
            }, 5000);
            return;
        } else {
            setIsPassCorrect(true);
        }

        axios.post('http://localhost:5500/API/user/createUser', {
            nom,
            prenom,
            userType,
            email,
            password
        })
        .then((result) => {
            setNom('')
            setPrenom('')
            setUserType('Admin')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            console.log(result.data)
            if (result.data) {
                setSingUpDone(result.data);
                setTimeout(() => {
                    setSingUpDone('');
                }, 5000);
            } else {
                // No error, clear the error state
                setSingUpDone('');
            }
        }).catch((err) => {
            console.log(err.response.data)
            setSingUpError(err.response.data + " from error");
            setTimeout(() => {
                setSingUpError('');
              }, 5000);
        });

    }


    
    //Login functions
    const [emailSingin , setEmailSingin] = useState('')
    const [passwordSingin , setPasswordSingin] = useState('')
    

    const LoginPost = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5500/API/user/loginUser', {
            emailSingin,
            passwordSingin
        })
        .then((result) => {
            console.log(result)
            if (result.data.token) {
                localStorage.setItem('token', result.data.token)
                localStorage.setItem('id', result.data.userId)
                const path = `/home/${result.data.userId}`
                // Redirect to the home page after successful login
                navigate(path);
            }
        }).catch((err) => {
            console.log(err)
            // setSingUpError(err.response.data);
            setTimeout(() => {
                setSingUpError('');
              }, 5000);
        });

    }

    


  return (
    <div className='loginBigContainer'>
        <div className='singUpcon'>
            {singUpError && <div className="error-message">{singUpError}</div>}
            {singUpDone && <div className="done-message">{singUpDone}</div>}
            <div className='singupTitel'> 
                <h2 onClick={handleChange}>S'inscrire</h2>
            </div>
            <form>
                <div className='containetSingup'>
                    <div className='presonnelInputs'>
                        <input type="text" placeholder='Nom' value={nom} onChange={(e) =>setNom(e.target.value)}/>
                        <input type="text" placeholder='Prenom' value={prenom} onChange={(e) =>setPrenom(e.target.value)}/>
                            <h4>choisie votre fonction</h4>
                            <div className='userTypeInput'>
                             <select className='userType' name="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
                                <option value="Admin">Admin</option>
                                <option value="Etudiant">Etudiant</option>
                              </select>
                            </div>
                    </div>
                    <div className='loginInputs'>
                        <input className='email' type="email" placeholder='E-mail'  value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input className={isPassCorrect ? '' : 'password-error'} type="password" placeholder='Mot de passe'  value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <input className={isPassCorrect ? '' : 'password-error'} type="password" placeholder='Retapez le mot de passe'  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <button className='btnSubmit' type='submit' onClick={newUserPost}>Sing Up</button>
                    </div>
                </div>
            </form>
        </div>
        {/* Login form section */}
        <div className={isActive ? "loginConActive" : "loginCon"}>
            <div className="LoginTitel"> 
                <h2 onClick={handleChange}>se connecter</h2>
            </div>
            <form className='loginForm'>
                <div className='containetLogin'>
                    <div className='LoginInp'>
                        <input type="email" placeholder='E-mail' value={emailSingin} onChange={(e) => setEmailSingin(e.target.value)}/>
                        <input type="password" placeholder='Mot de passe' value={passwordSingin} onChange={(e) => setPasswordSingin(e.target.value)}/>
                        <button className='btnLogin' type='submit' onClick={LoginPost}>Login</button>
                    </div>
                    <div className='ForgetPassLink'>
                        <a>Forget Password !</a>
                    </div>
                </div>
            </form>
        </div>
      
    </div>
  )
}

export default login
