import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './createEtudiant.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function createEtudiant({ classes, etudiant, fetchEtudiant, ActiveCréer, nighteMood }) {

    const token = localStorage.getItem('token')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [dateDeNaissance, setDateDeNaissance] = useState('')
    const [classe, setClasse] = useState('')
    const [file, setFile] = useState()
    const [isDataBaseActive, setIsDataBaseActive] = useState(false)


    const handleDateChange = (e) => {
        const input = e.target.value;
        // Ensure input matches the format MM/DD/YYYY
        if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
            setDateDeNaissance(input);
        }
    };



    const postEtudiant = (e) => {
        e.preventDefault()


        if (!file) {
            console.error("No file selected.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('dateDeNaissance', dateDeNaissance);
        formData.append('classe', classe);
        console.log(file)
        console.log(nom)
        console.log(prenom)
        console.log(dateDeNaissance)
        console.log(classe)

        axios.post('http://localhost:5500/API/etudiant/create', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((result) => {
                setNom('')
                setPrenom('')
                setDateDeNaissance('');
                setClasse('')
                fetchEtudiant()
            }).catch((err) => {
                console.log(err)
            })
    }

    const DeleteEnseignant = (etudiantId, classeDesig) => {
        console.log(etudiant)
        axios.delete(`http://localhost:5500/API/etudiant/delete/${etudiantId}/${classeDesig}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((result) => {
                console.log(result)
                fetchEtudiant()
            }).catch((err) => {
                console.log(err);
            });
    };


    useEffect(() => {
        if (classes.length > 0) {
            setClasse(classes[0].designation)
        }
    }, [classe])




    return (
        ActiveCréer ? (
            <div className='fillEtudiantContainer' style={{ background: nighteMood ? 'linear-gradient( to right , rgb(0, 0, 0)10%, rgb(1, 32, 5))' : 'linear-gradient(to right, rgba(2, 2, 49, 0.877), rgba(0, 0, 102, 0.493))' }}>
                <form className='etudiantForm' onSubmit={postEtudiant} >
                    <div className='etudiantFormDiv'>
                        <p className="etudiantDesignationLabel" style={{ color: nighteMood ? 'rgb(6, 107, 6)' : 'aqua' }}>Créez votre Classe:</p>
                        <p className="nom P">Entrez le nom de l'étudiant:</p>
                        <input type="text" placeholder='- le nom...' id="inputs" value={nom} onChange={(e) => setNom(e.target.value)} />
                        <p className="nombre P">Entrez le prenom de l'étudiant:</p>
                        <input type="text" placeholder='- prenom...' id="inputs" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                        <p className="naissance P">la date de naissance:</p>
                        <input type="date" className='dateDeNaissance' value={dateDeNaissance} onChange={handleDateChange} required />
                        <p className="Classe P">Choisissez la classe de l'étudiant:</p>
                        <select className='selectClasse' value={classe} onChange={(e) => setClasse(e.target.value)} required>
                            {classes.map((item, index) => (
                                <option key={index} value={item.designation}>{item.designation}</option>
                            ))}
                        </select>
                        <p className="spesialite P">Entrez un image:</p>
                        <div className='fileContainer'>
                            <input className="file-input" type="file" onChange={e => setFile(e.target.files[0])} />
                            <AddAPhotoIcon className='AddAPhotoIcon' sx={{ fontSize: 17, color: 'white', position: 'absolute' }}/>
                        </div>

                        <button type="submit" className='submitE' style={{ background: nighteMood ? 'rgb(6, 107, 6)' : 'aqua', color: nighteMood ? 'white' : 'black' }} >Ajouter la classe</button>
                    </div>
                </form>
                <div className="longEtudiantData" style={{ background: nighteMood ? 'linear-gradient( to right , rgb(0, 0, 0)10%, rgb(1, 32, 5))' : 'linear-gradient(to right, rgba(2, 2, 49, 0.877), rgba(0, 0, 102, 0.493))' }}>
                    <h3 style={{ color: nighteMood ? 'rgb(6, 107, 6)' : 'aqua' }}>La base de donnée</h3>
                    <table className='DataTabel'>
                        <tr>
                            <th >Nom</th>
                            <th >La date de naissance</th>
                            <th >Classe</th>
                        </tr>
                        {etudiant.map((item, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(554, 255, 255, 0.689)', position: 'relative' }}>
                                <td >
                                    {item.nom + ' ' + item.prenom}
                                    <button className='DeletaBtn' onClick={() => DeleteEnseignant(item._id, item.classe)} style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', }}><DeleteForeverIcon className='DeleteForeverIcon' style={{ width: '20px' }} /></button>
                                </td>
                                <td  >
                                    {new Date(item.dateDeNaissance).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}
                                </td>
                                <td  >
                                    {item.classe}
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>

            </div>
        ) : ''
    )
}

export default createEtudiant
