import './contenteContainer.css'
import CreateContainer from "./CreateContainer/createContainer"
import StatustiquesContainer from "./StatustiquesContainer/statustiquesContainer"
import DataViewContainer from "./DataViewContainer/dataViewContainer"



const ContenteContainer = ({ActiveCréer, ActiveModifier,handleButtonClick, nighteMood, ActiveStatistiques, Active}) => {




    return(
        <div className='contenteContainer'>
            <div className="activiteContainer">
                <h3 className="currentActivity">{Active}</h3>
            </div>

            <StatustiquesContainer ActiveModifier={ActiveModifier} ActiveStatistiques={ActiveStatistiques} ActiveCréer={ActiveCréer}/>

            <CreateContainer ActiveModifier={ActiveModifier} nighteMood={nighteMood} handleButtonClick={handleButtonClick} ActiveStatistiques={ActiveStatistiques} ActiveCréer={ActiveCréer}/>

            <DataViewContainer ActiveModifier={ActiveModifier} nighteMood={nighteMood} ActiveStatistiques={ActiveStatistiques} ActiveCréer={ActiveCréer}/>

        </div>
    )
}

export default ContenteContainer