import './navBar.css'
import { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SchoolIcon from '@mui/icons-material/School';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';





const NavBar = ({ ActiveCréer , handleButtonClick, nighteMood }) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const handleItemClick = (index) => {
        if (activeIndex === index){
            setActiveIndex(0)
        }else{
            setActiveIndex(index);
        }
        handleButtonClick(index); // Call the handleButtonClick function with the index
    };

    const style = nighteMood 
    ? {backgroundColor: 'rgb(0, 255, 4)', colore: 'rgb(0, 69, 138)', boxShadow: ' 0px 0px 10px 5px rgb(0, 255, 4)'} 
    : {backgroundColor: 'aqua', colore: 'rgb(0, 69, 238)', boxShadow: ' 0px 0px 10px 5px aqua'}


    return(
        <div className={`navbarBigContainer ${nighteMood  ? 'night': 'day'}`}>
            <div className='activiteLinks'>
                <ul>
                    <li className={`accueil ${activeIndex === 0  ? 'active': ''}`} >
                        <a href='#' onClick={() => handleItemClick(0)} >
                            <DashboardIcon className='icon'/>
                            <p>Accueil</p>
                            <div className="indicator" style={activeIndex === 0 ? style : {}} ></div>
                        </a>
                    </li>
                    <li className={`créer ${activeIndex === 1 ? 'active' : ''}`}>
                        <a href='#' onClick={() => handleItemClick(1)}>
                            <AddIcon/>
                            <p>Créer</p>
                            <div className="indicator" style={activeIndex === 1 ? style : {}} ></div>
                        </a>
                    </li>
                    <li className={`modifier ${activeIndex === 2 ? 'active' : ''}`}>
                        <a href='#' onClick={() => handleItemClick(2)}>
                            <ManageAccountsIcon/>
                            <p>Modifier</p>
                            <div className="indicator" style={activeIndex === 2 ? style : {}} ></div>
                        </a>
                    </li>
                    <li className={`lesClasses ${activeIndex === 3 ? 'active' : ''}`}>
                        <a href='#' onClick={() => handleItemClick(3)}>
                            <SchoolIcon/>
                            <p>Les classes</p>
                            <div className="indicator" style={activeIndex === 3 ? style : {}} ></div>
                        </a>
                    </li>
                    <li className={`structureDeDonnées ${activeIndex === 4 ? 'active' : ''}`}>
                        <a href='#' onClick={() => handleItemClick(4)}>
                            <AccountTreeIcon/>
                            <p>Les structures</p>
                            <div className="indicator" style={activeIndex === 4 ? style : {}} ></div>
                        </a>
                    </li>
                    <li className={`statistiques ${activeIndex === 5 ? 'active' : ''}`}>
                        <a href='#' onClick={() => handleItemClick(5)}>
                            <SignalCellularAltIcon/>
                            <p>Statistiques</p>
                            <div className="indicator" style={activeIndex === 5 ? style : {}} ></div>
                        </a>
                    </li>
                    
                </ul>
            </div>
            <div className="parametre">
                <ul>
                    <li className='paramètre'>
                        <a href='#' >
                            <SettingsIcon/>
                            <p>Paramètre</p>
                            <div className="indicator"></div>
                        </a>
                    </li>
                    <li className='déconnecter'>
                        <a href='#' >
                            <LogoutIcon/>
                            <p>Déconnecter</p>
                            <div className="indicator"></div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar