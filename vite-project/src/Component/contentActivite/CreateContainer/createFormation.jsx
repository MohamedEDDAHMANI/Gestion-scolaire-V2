import { useState, useEffect } from 'react'
import './createFormation.css'
import axios from 'axios'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';




const CreateFormation = ({ActiveCréer, depData, forData, fetchDepartments, nighteMood}) => {

    const token = localStorage.getItem('token')
    const [ForDesignation , setForDesignation] = useState('')
    const [selectDep , setSelectDep] = useState('')
    const [depID , setDepID] = useState('')
    const [isDataBaseActive , setIsDataBaseActive] = useState(false)





    const postFormation = (e) => {
        e.preventDefault()

        const formData = {
            ForDesignation: ForDesignation,
            selectDep: selectDep,
            depID: depID
        };

        axios.post('http://localhost:5500/API/formation/create', formData,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        }).then((result) => {
            setForDesignation('')
            console.log(result)
            fetchDepartments(); 
            
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (depData.length > 0) {
            setSelectDep(depData[0].designation);
        }
    }, [depData]);


    


    const DeleteFormation = (depID, forID) => {

        axios.delete(`http://localhost:5500/API/formation/delete/${depID}/${forID}` ,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        .then((result) => {
            console.log(result);
            fetchDepartments(); 
        }).catch((err) => {
            console.log(err);
        });
    };



    return(
        ActiveCréer ? (
        <div className='fillFormationContainer' style={{ background: nighteMood  ? 'linear-gradient( to right , rgb(0, 0, 0)10%, rgb(1, 32, 5))' : 'linear-gradient(to right, rgba(2, 2, 49, 0.877), rgba(0, 0, 102, 0.493))' }} >
        { depData.length === 0 ? (
            <h1>you have to create departement first</h1>
        ) : (
            <>
            <form onSubmit={postFormation} className='FormationForm'>
                <div className='FormationFormDiv'>
                   <p className="forDesignationLabel" style={{color: nighteMood ? 'rgb(6, 107, 6)' : 'aqua'}}>Créez votre Formation:</p>
                   <p className="ValueOfInputFormation P">Entrez la designation du Formation:</p>
                   <input type="text" value={ForDesignation} placeholder='- Designation...' id="designationDeFormationInput" onChange={(e) => setForDesignation(e.target.value)} required />
                   <p className="ValueOfInputFormation P">Choisissez la designation du département:</p>
                   <select className='selectDepartement' 
                        value={selectDep} 
                        onChange={(e) => {
                            setSelectDep(e.target.value)
                        }}
                        required>
                        {depData.map((item, index) => (
                            <option key={index} value={item.designation}>{item.designation}</option>
                        ))}
                    </select>
                   <button type="submit" className='submitF' style={{background: nighteMood ? 'rgb(6, 107, 6)' : 'aqua', color: nighteMood ? 'white' : 'black'}}>Ajouter la Formation</button>
                </div>
            </form>
            <div className={"longFormationData" } style={{ background: nighteMood  ? 'linear-gradient( to right , rgb(0, 0, 0)10%, rgb(1, 32, 5))' : 'linear-gradient(to right, rgba(2, 2, 49, 0.877), rgba(0, 0, 102, 0.493))' }}>
                <h3 style={{color: nighteMood ? 'rgb(6, 107, 6)' : 'aqua'}}>La base de donnée</h3>
                <table className='DataTabel'>
                        <tr>
                            <th className='firstTH'>Formation</th>
                            <th >Departement</th>
                        </tr>
                        {depData.map((item, index) => ( 
                             item.formation.map((formation, formationIndex) => (
                                <tr key={index + '-' + formationIndex} style={{ backgroundColor: formationIndex % 2 === 0 ? 'white' : 'rgba(554, 255, 255, 0.689)' }}>
                                    <td style={{position: 'relative', right: '0'}}>
                                        {formation.designation}
                                    </td>
                                    <td style={{position: 'relative', right: '0' }}>
                                        {item.designation}
                                      <button onClick={() => DeleteFormation(item._id, formation._id)} className='DeletaBtnF' style={{position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)',}}><DeleteForeverIcon className='DeleteForeverIcon' style={{width: '20px'}}/></button>
                                    </td> 
                                </tr>
                            ))
                        ))}
                </table>
            </div>
            </>
        )}
        </div>
        ) : ''
    )
}

export default CreateFormation