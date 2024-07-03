import { useState, useEffect } from 'react'
import './createModules.css'
import axios from 'axios'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';




const CreateModules = ({ActiveCréer, forData, fetchModules,ensData, modData, nighteMood}) => {

    const token = localStorage.getItem('token')
    const [ModDesignation , setModDesignation] = useState('')
    const [Modhoraire , setModhoraire] = useState('')
    const [selectEns , setSelectEns] = useState('')
    const [selectFor , setSelectFor] = useState('')

    const ensDataPur = ensData.data


    const postFormation = (e) => {
        e.preventDefault()

        const formData = {
            ModDesignation: ModDesignation,
            Modhoraire: Modhoraire,
            selectEns: selectEns,
            selectFor: selectFor
        };
        console.log(formData)

        axios.post('http://localhost:5500/API/modules/create', formData,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        }).then(() => {
            setModDesignation('')
            setModhoraire('')
            fetchModules();
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (forData.length > 0) {
            setSelectFor(forData[0].designation);
        }
    }, [forData]);


    useEffect(() => {
        if (ensData.length > 0) {
            setSelectEns(ensData[0].nom + ' ' + ensData[0].prenom);
        }
    }, [ensData]);


    


    const DeleteModule = (moId, forma) => {
        axios.delete(`http://localhost:5500/API/modules/delete/${moId}/${forma}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        .then((result) => {
            console.log(result);
            fetchModules()
        }).catch((err) => {
            console.log(err);
        });
    };


    return(
        ActiveCréer ? 
        ( 
        <div className='fillModulesContainer' style={{ background: nighteMood  ? 'linear-gradient( to right , rgb(0, 0, 0)10%, rgb(1, 32, 5))' : 'linear-gradient(to right, rgba(2, 2, 49, 0.877), rgba(0, 0, 102, 0.493))' }}>
            <form className='ModulesForm' onSubmit={postFormation}>
                <div className='ModulesFormDiv'>
                   <p className="modDesignationLabel"  style={{color: nighteMood ? 'rgb(6, 107, 6)' : 'aqua'}}>Créez votre Module:</p>
                   <p className="ValueOfInputModules">Entrez la désignation du module:</p>
                   <input type="text" value={ModDesignation} placeholder='- Designation...' id="designationDeModulesInput" onChange={(e) => setModDesignation(e.target.value)} required />
                   <p className="ValueOfInputModules">Entrez l'horaire du module:</p>
                   <input type="number" value={Modhoraire} placeholder='- Horaire par houre...' id="designationDeModulesInput" onChange={(e) => setModhoraire(e.target.value)} required />
                   <p className="ValueOfInputFormation">Choisissez l'enseignant de module :</p>
                   <select className='selectEns' value={selectEns} onChange={ e => setSelectEns(e.target.value)} required>
                        {ensData.map((item, index) => (
                            <option key={index} value={item.nom + ' ' + item.prenom}>{item.nom + ' ' + item.prenom}</option>
                        ))}
                    </select>
                   <p className="ValueOfInputFormation">Choisissez la désignation du formation :</p>
                   <select className='selectEns' value={selectFor} onChange={(e) => setSelectFor(e.target.value)} required>
                        {forData.map((item, index) => (
                            <option key={index} value={item.designation}>{item.designation}</option>
                        ))}
                    </select>
                   <button type="submit" className='submitM' style={{background: nighteMood ? 'rgb(6, 107, 6)' : 'aqua', color: nighteMood ? 'white' : 'black'}}>Ajouter le Module</button>
                </div>
            </form>
            <div className="longModulesData" style={{ background: nighteMood  ? 'linear-gradient( to right , rgb(0, 0, 0)10%, rgb(1, 32, 5))' : 'linear-gradient(to right, rgba(2, 2, 49, 0.877), rgba(0, 0, 102, 0.493))' }}>
                <h3  style={{color: nighteMood ? 'rgb(6, 107, 6)' : 'aqua'}}>La base de donnée</h3>
                <table className='DataTabelModules'>
                        <tr className='tabelHeader'>
                            <th className='firstModuleTH'>Modules</th>
                            <th className='secandModuleTH' >Horaire</th>
                            <th className='secandModule' >Enseignant</th>
                            <th className='therdModuleTH'>Formation</th>
                        </tr>
                        {modData.map((item, index) => ( 
                                <tr key={index} style={{position: 'relative', backgroundColor: index % 2 === 0 ? 'white' : 'rgba(554, 255, 255, 0.689)' }}>
                                    <td  style={{position: 'relative'}}>
                                        {item.designation}
                                    </td> 
                                    <td >
                                        {item.horaire}
                                    </td> 
                                    <td >
                                        {item.enseignant}
                                    </td> 
                                    <td >
                                        {item.formation}
                                    </td> 
                                    <td>
                                      <button onClick={() => DeleteModule(item._id, item.formation)} className='DeletaBtn' style={{position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)',}}><DeleteForeverIcon className='DeleteForeverIcon' style={{width: '20px'}}/></button>
                                    </td>
                                </tr>
                                ))}
                </table>
                
            </div>
        </div>
        ) : ''
    )
}

export default CreateModules