import { useState, useEffect } from 'react'
import './createDepartement.css'
import axios from 'axios'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';




const CreateDepartement = ({ActiveCréer, depData, fetchDepartments, nighteMood}) => {

    const [depDesignation , setDepDesignation] = useState('')
    const token = localStorage.getItem('token')


    const postDepartement = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5500/API/departement/create', {
            depDesignation,
            token
        }).then((result) => {
            setDepDesignation('')
            console.log(result)
            fetchDepartments(); 
        }).catch((err) => {
            console.log(err)
        })
    }


    


    const DeleteDepartement = (id, token) => {
        axios.delete(`http://localhost:5500/API/departement/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        .then((result) => {
            console.log(id);
            console.log(result);
            fetchDepartments(); 
        }).catch((err) => {
            console.log(err);
        });
    };
    


    return(
        ActiveCréer ? (
        <div className='fillDepartementContainer' style={{ background: nighteMood  ? 'linear-gradient( to right , rgb(0, 0, 0)10%, rgb(1, 32, 5))' : 'linear-gradient(to right, rgba(2, 2, 49, 0.877), rgba(0, 0, 102, 0.493))' }} >
            
            <form onSubmit={postDepartement} className='form'>
                   <p className="title " style={{color: nighteMood ? 'rgb(6, 107, 6)' : 'aqua'}}>Departement </p>
                   <p className="message P">Créez votre département. </p>
                       <div className="flex">
                   </div>  
                    <label>
                    <input 
                       className="input"
                       type="text"
                       value={depDesignation}
                       onChange={(e) => setDepDesignation(e.target.value)}
                       placeholder="- la designation"
                       required
                    />
                   </label>
                   <button className="submitD" style={{background: nighteMood ? 'rgb(6, 107, 6)' : 'aqua', color: nighteMood ? 'white' : 'black'}}>Ajouter le département</button>

            </form>


            <div className="DepartementData" style={{background: nighteMood ? 'linear-gradient( to right , rgb(0, 0, 0)20%, rgb(1, 32, 5))' : 'linear-gradient(to right, rgba(2, 2, 49, 0.877), rgba(0, 0, 102, 0.493))'}}>
                <h3 style={{color: nighteMood ? 'rgb(6, 107, 6)' : 'aqua'}}>La base de donnée</h3>
                <table className='DataTabel'>
                    <tr>
                        <th>Departement</th>
                    </tr>

                    {depData.map((item, index) => ( 
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(554, 255, 255, 0.689)' }}>
                        <td style={{position: 'relative', right: '0'}}>
                            {item.designation}
                            <button onClick={() => DeleteDepartement(item._id)} className='DeletaBtn' style={{position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)',}}><DeleteForeverIcon className='DeleteForeverIcon' style={{width: '20px'}}/></button>
                        </td> 
                    </tr>
                    ))}
                
                </table>
            </div>
        </div>
        ) : ''
    )
}
export default CreateDepartement