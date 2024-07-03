import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './createClasse.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


function createClasse({forData, classes,fetchClasses , nighteMood, ActiveCréer}) {

    console.log(classes)


    const token = localStorage.getItem('token')
    const [designation, setDesignation] = useState('')
    const [formation, setFormation] = useState('')
    const [isDataBaseActive , setIsDataBaseActive] = useState(false)




    const postClasse = (e) => {
        e.preventDefault()

        const formData = {
            designation: designation,
            formation: formation,
        };
        console.log(formData)

        axios.post('http://localhost:5500/API/classe/create', formData, {
          headers: {
              Authorization: `Bearer ${token}` 
          }
        })
        .then((result) => {
            setDesignation('')
            setFormation('')
            fetchClasses(); 
        }).catch((err) => {
            console.log(err)
        })
    }


    useEffect(() => {
        if (forData.length > 0){
            setFormation(forData[0].designation)
        }
    },[forData])



    

    const DeleteClasse = (classeID, forDesi) => {
        axios.delete(`http://localhost:5500/API/classe/delete/${classeID}/${forDesi}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        .then((result) => {
            console.log(result)
            fetchClasses();  
        }).catch((err) => {
            console.log(err);
        });
    };




  return (
    <div className='fillClasseContainer' style={{ background: nighteMood  ? 'linear-gradient( to right , rgb(0, 0, 0)10%, rgb(1, 32, 5))' : 'linear-gradient(to right, rgba(2, 2, 49, 0.877), rgba(0, 0, 102, 0.493))' }}>
        <form className='ClasseForm' onSubmit={postClasse}  >
                <div className='ClasseFormDiv'>
                   <p className="classeDesignationLabel" style={{color: nighteMood ? 'rgb(6, 107, 6)' : 'aqua'}}>Créez votre Classe:</p>
                   <p className="nom P">Entrez la designation de la classe:</p>
                   <p className="Remarque">La désignation doit être une abréviation de la formation <br/> avec le nombre de classes.</p>
                   <input type="text" placeholder='- la designation...' id="inputs" value={designation} onChange={(e) => setDesignation(e.target.value)}/>
                   <p className="nombre P">le nombre maximal d'étudiant dans la classe:</p>
                   <p className="Remarque"> (Fixer)</p>
                   <input type="text" defaultValue={25}  id="inputs" readOnly/>
                   <p className="formation P">Choisissez la formation de la classe:</p>
                   <select className='selectFormation' value={formation} onChange={(e) => setFormation(e.target.value)} required>
                    {forData.map((item, index ) => (
                        <option key={index}  value={item.designation}>{item.designation}</option>
                    ))}
                   </select>

                  <button type="submit"  className='submitC' style={{background: nighteMood ? 'rgb(6, 107, 6)' : 'aqua', color: nighteMood ? 'white' : 'black'}} >Ajouter la classe</button>
                </div>
            </form>
            <div className="longClasseData" style={{ background: nighteMood  ? 'linear-gradient( to right , rgb(0, 0, 0)10%, rgb(1, 32, 5))' : 'linear-gradient(to right, rgba(2, 2, 49, 0.877), rgba(0, 0, 102, 0.493))' }}>
            <h3 style={{color: nighteMood ? 'rgb(6, 107, 6)' : 'aqua'}}>La base de donnée</h3>
                <table className='DataTabel' style={{position: 'relative'}}>
                        <tr>
                            <th>Designation</th>
                            <th>Formation</th>
                        </tr>
                        {classes.map((item, index) => ( 
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(554, 255, 255, 0.689)',position: 'relative'}}>
                                    <td>
                                        {item.designation}
                                      <button onClick={() => DeleteClasse(item._id,item.formation)} className='DeletaBtn' style={{position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)',}}><DeleteForeverIcon className='DeleteForeverIcon' style={{width: '20px'}}/></button> 
                                    </td> 
                                    <td >
                                        {item.formation}
                                    </td> 
                                </tr>
                                ))}
                </table>
            </div>
      
    </div>
  )
}

export default createClasse
