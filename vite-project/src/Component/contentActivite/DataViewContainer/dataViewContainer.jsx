import * as React from 'react';
import './dataViewContainer.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'



const DataViewContainer = ({ ActiveModifier, ActiveStatistiques, ActiveCréer, nighteMood }) => {

    const token = localStorage.getItem('token')
    const [depData, setDepData] = useState([])
    const [forData, setForData] = useState([])
    const [modData, setModData] = useState([])
    const [ensData, setEnsData] = useState([])
    const [classes, setClasses] = useState([])
    const [etudiant, setEtudiant] = useState([])
    const [data, setData] = useState('Enseignant')
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);



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




    useEffect(() => {
        handleChenge(data);
    }, [depData, forData, ensData, modData, classes, etudiant, data]);


    const handleChenge = (data) => {
        if (data.length === 0) {
            console.log('not')
        }
        switch (data) {
            case 'Departement':
                setRows(depData);
                setColumns([
                    { field: 'designation', headerName: 'Designation', Name: 'departement', flex: 1, editable: true },
                    { field: '_id', headerName: 'ID', Name: 'departement', flex: 1, editable: true },
                ]);
                break;
            case 'Formation':
                setRows(forData)//why dont work the value of rows dont change in this case
                setColumns([
                    { field: 'designation', headerName: 'Designation', Name: 'formation', flex: 1, editable: true },
                    { field: '_id', headerName: 'ID', Name: 'formation', flex: 1, editable: true },
                ]);
                break;
            case 'Enseignant':
                setRows(ensData);
                setColumns([
                    {
                        field: 'picture',
                        headerName: 'IMG',
                        Name: 'enseignant',
                        flex: 1,
                        renderCell: (params) => (
                            <div className='cellContainer'>
                                <img
                                    className='headerProfilePic'
                                    src={`http://localhost:5500/${params.value}`}
                                    alt='Profile Picture'
                                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                />
                            </div>
                        ),
                        editable: true,
                    },
                    { field: 'nom', headerName: 'Nom', Name: 'enseignant', flex: 1, editable: true },
                    { field: 'prenom', headerName: 'Prenom', Name: 'enseignant', flex: 1, editable: true },
                    { field: 'spesialite', headerName: 'Spesialite', Name: 'enseignant', flex: 1, editable: true },
                    { field: 'formation', headerName: 'Formation', Name: 'enseignant', flex: 1, editable: true },
                    { field: '_id', headerName: 'ID', flex: 1, Name: 'enseignant', editable: true },
                ]);
                break;
            case 'Modules':
                setRows(modData);
                console.log(modData)
                setColumns([
                    { field: 'designation', headerName: 'Designation', Name: 'module', flex: 1, editable: true },
                    { field: 'horaire', headerName: 'Horaire', flex: 1, Name: 'module', editable: true },
                    { field: 'enseignant', headerName: 'Enseignant', Name: 'module', flex: 1, editable: true },
                    { field: 'formation', headerName: 'Formation', Name: 'module', flex: 1, editable: true },
                    { field: '_id', headerName: 'ID', flex: 1, Name: 'module', editable: true },
                ]);
                break;
            case 'Classe':
                setRows(classes);
                setColumns([
                    { field: 'designation', headerName: 'Designation', Name: 'classe', flex: 1, editable: true },
                    { field: 'nombreMaximal', headerName: 'Nombre Maximal', Name: 'formation', flex: 1, editable: true },
                    { field: 'formation', headerName: 'Formation', Name: 'formation', flex: 1, editable: true },
                    { field: '_id', headerName: 'ID',  Name: 'formation',flex: 1, editable: true },
                ]);
                break;
            case 'Etudiant':
                setRows(etudiant);
                setColumns([
                    {
                        field: 'picture',
                        headerName: 'IMG',
                        Name: 'etudiant',
                        flex: 1,
                        renderCell: (params) => (
                            <div className='cellContainer'>
                                <img
                                    className='headerProfilePic'
                                    src={`http://localhost:5500/${params.value}`}
                                    alt='Profile Picture'
                                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                />
                            </div>
                        ),
                        editable: true
                    },
                    { field: 'nom', headerName: 'Nom', Name: 'etudiant', flex: 1, editable: true },
                    { field: 'prenom', headerName: 'Prenom', Name: 'etudiant', flex: 1, editable: true },
                    { field: 'dateDeNaissance', headerName: 'Date de naissance', Name: 'etudiant', flex: 1, editable: true },
                    { field: 'classe', headerName: 'Classe', Name: 'etudiant', flex: 1, editable: true },
                    { field: '_id', headerName: 'ID', Name: 'etudiant', flex: 1, editable: true },
                ]);
                break;
            default:
                setRows([]);
                setColumns([]);
                break;
        }
    };


    const handleCellChange = (rowIndex, field, value) => {
        const updatedRows = rows.map((row, index) => {
            if (index === rowIndex) {
                return { ...row, [field]: value };
            }
            return row;
        });
        setRows(updatedRows);
    };



    const processRowUpdate = async (event,  row, column) => {
        const name = column.Name
        console.log(name)
        try {
            const response = await axios.put(`http://localhost:5500/update/all/${name}` , row);
            console.log(response)
            return response.data;
        } catch (error) {
            console.error('Failed to update row:', error);
        }
    };

    return (
        ActiveStatistiques || ActiveCréer ? '' : (
            <div className={ActiveModifier ? 'selectedDataView' : 'ShowDataViewContainer'} >
                <div className="deps">
                    <h2>les Donnée enregistrée</h2>
                    <select name="" value={data} onChange={(e) => setData(e.target.value)}>
                        <option value="Departement">Departement</option>
                        <option value="Formation">Formation</option>
                        <option value="Enseignant">Enseignant</option>
                        <option value="Modules">Modules</option>
                        <option value="Classe">Classe</option>
                        <option value="Etudiant">Etudiant</option>
                    </select>
                </div>
                <div style={{ height: 380, width: '100%' }}>
                    <Paper sx={{ height: '100%', backgroundColor: 'transparent' }}>
                        <TableContainer sx={{ height: '100%', backgroundColor: 'transparent' }}>
                            <Table stickyHeader sx={{ backgroundColor: 'transparent' }}>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: 'transparent' }}>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.field}
                                                sx={{
                                                    backdropFilter: 'blur(5px)',
                                                    backgroundColor: 'transparent',
                                                    padding: '5px 0px 5px 20px',
                                                    fontSize: 17,
                                                    fontFamily: "Poetsen One",
                                                    color: 'aqua'
                                                }}
                                                className="tableHeader"
                                            >{column.headerName}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows && rows.map((row, rowIndex) => (
                                        <TableRow key={rowIndex} >
                                            {columns.map((column, colIndex) => (
                                                <TableCell key={colIndex} sx={{ backdropFilter: 'blur(5px)', padding: '0px 0px 0px 10px', margin: '0px' }}>
                                                    {column.field === 'picture' ? (
                                                        <img
                                                            className='headerProfilePic'
                                                            src={`http://localhost:5500/${row[column.field]}`}
                                                            alt='Profile Picture'
                                                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                        />
                                                    ) : (
                                                        <TextField
                                                            value={row[column.field]}
                                                            onBlur={(event) => processRowUpdate(event, row, column)}
                                                            onChange={(event) =>
                                                                handleCellChange(rowIndex, column.field, event.target.value)
                                                            }
                                                            fullWidth
                                                            sx={{ padding: 0, border: 'none' }}
                                                            InputProps={{
                                                                sx: {
                                                                    color: 'white',
                                                                    padding: 0,
                                                                    border: 'none',
                                                                    height: 30,
                                                                    transition: 'all 0.1s ease',
                                                                    '&:hover': {
                                                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                                    },
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </div>
        )
    )
}

export default DataViewContainer