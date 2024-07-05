import { useState, useEffect } from 'react'
import './createContainer.css'
import axios from 'axios'
import CreateDepartement from './createDepartement'
import CreateFormation from './createFormation'
import CreateModules from './createModules'
import CreateEnseignant from './createEnseignant'
import CreateClasse from './createClasse'
import CreateEtudiant from './createEtudiant'

const CreateContainer = ({ ActiveCréer, ActiveModifier, ActiveStatistiques, handleButtonClick, nighteMood }) => {



    const [isActive, setIsActive] = useState('departement')
    const [depData, setDepData] = useState([])
    const [forData, setForData] = useState([])
    const [modData, setModData] = useState([])
    const [ensData, setEnsData] = useState([])
    const [classes, setClasses] = useState([])
    const [etudiant, setEtudiant] = useState([])


    useEffect(() => {
        fetchClasses();
        fetchDepartments();
        fetchModules();
        fetchFormations();
        fetchEnseignant();
        fetchEtudiant();
    }, []);

    const fetchDepartments = () => {
        axios.get('http://localhost:5500/API/departement/get')
            .then((result) => {
                setDepData(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };





    const fetchModules = async () => {
        await axios.get('http://localhost:5500/API/modules/get')
            .then((result) => {
                setModData(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };





    const fetchFormations = async () => {
        await axios.get('http://localhost:5500/API/formation/get')
            .then((result) => {
                setForData(result.data);

            })
            .catch((err) => {
                console.log(err);
            });
    };





    const fetchEnseignant = async () => {
        await axios.get('http://localhost:5500/API/enseignant/get')
            .then((result) => {
                setEnsData(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const fetchClasses = () => {
        axios.get('http://localhost:5500/API/classe/get')
            .then((result) => {
                setClasses(result.data)

            })
            .catch((err) => {
                console.log(err);
            });
    };


    const fetchEtudiant = () => {
        axios.get('http://localhost:5500/API/etudiant/get')
            .then((result) => {
                setEtudiant(result.data)
            })
            .catch((err) => {
                console.log(err);
            });
    };





    return (
        ActiveModifier || ActiveStatistiques ? '' : (
        <div className={ActiveCréer ? 'selectedCreér' : 'ShowCreateContainer'} style={{ background: nighteMood ? 'linear-gradient(to right,rgba(0, 0, 0, 0.715)5%, rgba(0, 0, 0, 0.838))' : 'transparent' }}>
            <div className="createContainer" style={{ display: ActiveCréer ? 'none' : 'block' }}>
                <div className="Showtitel">
                    <p>Créez votre <br />première</p>
                    <p>departement <br />pour commencer</p>
                    <p>la gestion <br /></p>
                    <button className='btnSubmit' onClick={() => handleButtonClick(0)} style={{ marginLeft: '35px' }}>Commencer</button>
                </div>
            </div>

            <div className={`chooseContainer ${nighteMood ? 'night' : ''}`} style={{ display: !ActiveCréer ? 'none' : 'block' }}>
                <div className='ChoicesContainer'>
                    <span onClick={() => setIsActive('departement')} style={{ backgroundColor: isActive === 'departement' ? (nighteMood ? 'rgb(1, 57, 1)' : 'rgb(3, 44, 101)') : '' }}>Departement</span>
                    <span onClick={() => setIsActive('formation')} style={{ backgroundColor: isActive === 'formation' ? (nighteMood ? 'rgb(1, 57, 1)' : 'rgb(3, 44, 101)') : '' }}>Formation</span>
                    <span onClick={() => { fetchFormations(), fetchModules(), setIsActive('enseignant') }} style={{ backgroundColor: isActive === 'enseignant' ? (nighteMood ? 'rgb(1, 57, 1)' : 'rgb(3, 44, 101)') : '' }}>Enseignant</span>
                    <span onClick={() => { fetchDepartments(), setIsActive('module') }} style={{ backgroundColor: isActive === 'module' ? (nighteMood ? 'rgb(1, 57, 1)' : 'rgb(3, 44, 101)') : '' }}>Module</span>
                    <span onClick={() => { fetchClasses(), setIsActive('classe') }} style={{ backgroundColor: isActive === 'classe' ? (nighteMood ? 'rgb(1, 57, 1)' : 'rgb(3, 44, 101)') : '' }}>Classe</span>
                    <span onClick={() => setIsActive('etudiant')} style={{ backgroundColor: isActive === 'etudiant' ? (nighteMood ? 'rgb(1, 57, 1)' : 'rgb(3, 44, 101)') : '' }}>Etudiant</span>
                </div>
            </div>
            <div className="createComponent">
                {isActive === 'departement' && <CreateDepartement nighteMood={nighteMood} depData={depData} fetchDepartments={fetchDepartments} ActiveCréer={ActiveCréer} />}
                {isActive === 'formation' && <CreateFormation nighteMood={nighteMood} depData={depData} fetchDepartments={fetchDepartments} forData={forData} ActiveCréer={ActiveCréer} />}
                {isActive === 'enseignant' && <CreateEnseignant nighteMood={nighteMood} ensData={ensData} forData={forData} fetchEnseignant={fetchEnseignant} fetchFormations={fetchFormations} ActiveCréer={ActiveCréer} />}
                {isActive === 'module' && <CreateModules nighteMood={nighteMood} fetchModules={fetchModules} ensData={ensData} forData={forData} modData={modData} ActiveCréer={ActiveCréer} />}
                {isActive === 'classe' && <CreateClasse nighteMood={nighteMood} forData={forData} classes={classes} fetchClasses={fetchClasses} ActiveCréer={ActiveCréer} />}
                {isActive === 'etudiant' && <CreateEtudiant nighteMood={nighteMood} fetchEtudiant={fetchEtudiant} etudiant={etudiant} classes={classes} ActiveCréer={ActiveCréer} />}


            </div>



        </div>
        )
    )
}

export default CreateContainer