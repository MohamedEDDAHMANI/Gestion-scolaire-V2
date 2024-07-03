import { useState, useEffect } from 'react'
import './createEnseignent.css'
import axios from 'axios'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';




const CreateEnseignant = ({ActiveCréer, forData, ensData, fetchEnseignant, nighteMood}) => {


    const token = localStorage.getItem('token')
    const [nom , setNom] = useState('')
    const [prenom , setPrenom] = useState('')
    const [spesialite , setSpesialite] = useState('')
    const [selectFor , setSelectFor] = useState('')
    const [file, setFile] = useState();
    const [isDataBaseActive , setIsDataBaseActive] = useState(false)


    console.log(ensData)



      const postEnseignant = (e) => {
        e.preventDefault()

        if (!file) {
          console.error("No file selected.");
          return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('spesialite', spesialite);
        formData.append('selectFor', selectFor);

        axios.post(`http://localhost:5500/API/enseignant/create`, formData, {
          headers: {
              Authorization: `Bearer ${token}` 
          }
        })
        .then((result) => {
            setNom('')
            setPrenom('')
            setSpesialite('')
            setFile()
            fetchEnseignant();
        }).catch((err) => {
            console.log(err)
        })
    }




    const DeleteEnseignant = (ensId, forDesig) => {
      axios.delete(`http://localhost:5500/API/enseignant/delete/${ensId}/${forDesig}` ,  {
          headers: {
              Authorization: `Bearer ${token}` 
          },
      })
      .then((result) => {
          console.log(result)
          fetchEnseignant();  
      }).catch((err) => {
          console.log(err);
      });
  };

    


    useEffect(() => {
      if (forData.length > 0) {
          setSelectFor(forData[0].designation);
      }
    }, [forData]);

    



    return(
        ActiveCréer ? (
        <div className='fillEnseignantContainer' style={{ background: nighteMood  ? 'linear-gradient( to right , rgb(0, 0, 0)10%, rgb(1, 32, 5))' : 'linear-gradient(to right, rgba(2, 2, 49, 0.877), rgba(0, 0, 102, 0.493))' }}>
            <form className='EnseignantForm' onSubmit={postEnseignant} >
                <div className='EnseignantFormDiv'>
                   <p className="ensDesignationLabel" style={{color: nighteMood ? 'rgb(6, 107, 6)' : 'aqua'}}>Créez votre Enseignant:</p>
                   <p className="nom P">Entrez le Nom du Enseignant:</p>
                   <input type="text" value={nom} placeholder='- le nom...' id="inputs" onChange={(e) => setNom(e.target.value)} required />
                   <p className="prenom P">Entrez le Prenom du Enseignant:</p>
                   <input type="text" value={prenom} placeholder='- le prenom...' id="inputs" onChange={(e) => setPrenom(e.target.value)} required />
                   <p className="spesialite P">Entrez la spesialie du Enseignant:</p>
                   <input type="text" value={spesialite} placeholder='- spécialité...' id="inputs" onChange={(e) => setSpesialite(e.target.value)} required />
                   <p className="ValueOfInputens">Choisissez la designation du Formation:</p>
                   <select className='selectform' 
                        onChange={(e) =>  setSelectFor(e.target.value) }
                        value={selectFor} 
                        required>
                        {forData.map((item, index) => (
                            <option key={index} value={item.designation}>{item.designation}</option>
                        ))}
                    </select>
                   <p className="spesialite P">Entrez un image:</p>
                   <div className='fileContainerE'>
                       <input className="file-input"  type="file" onChange={ e => setFile(e.target.files[0])}/>
                       <AddAPhotoIcon className='AddAPhotoIcon' sx={{ fontSize: 17, color: 'white', position: 'absolute', cursor: 'pointer' }}/>
                   </div>

                  <button type="submit"  className='submitE' style={{background: nighteMood ? 'rgb(6, 107, 6)' : 'aqua', color: nighteMood ? 'white' : 'black'}} >Ajouter l'enseignant</button>
                </div>
            </form>
            <div className="EnseignantData" style={{background: nighteMood ? 'linear-gradient( to right , rgb(0, 0, 0)20%, rgb(1, 32, 5))' : 'linear-gradient(to right, rgba(2, 2, 49, 0.877), rgba(0, 0, 102, 0.493))'}}>
                <h3 style={{color: nighteMood ? 'rgb(6, 107, 6)' : 'aqua'}}>La base de donnée</h3>
                <table >
                      <thead>
                        <tr>
                            <th >Nom</th>
                            <th >Spécialité</th>
                            <th  >Formation</th>
                        </tr>
                      </thead>
                        <tbody >
                        {ensData.map((item, index) => ( 
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(554, 255, 255, 0.689)', position: 'relative' }}>
                                    <td >
                                      {item.nom + ' ' + item.prenom.toUpperCase()} 
                                      <button onClick={() => DeleteEnseignant(item._id,item.formation)} style={{position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none'}}><DeleteForeverIcon style={{width: '20px', color: 'red', cursor: 'pointer'}}/></button>
                                    </td> 
                                    <td >
                                      {item.spesialite} 
                                    </td> 
                                    <td  >
                                        <div key={index}>{item.formation}</div>
                                    </td> 
                                </tr>
                            ))}
                        </tbody>
                </table>
                
            </div>
        </div>
        ) : ''
    )
}

export default CreateEnseignant