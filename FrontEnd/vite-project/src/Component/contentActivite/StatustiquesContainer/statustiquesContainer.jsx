import './statustiquesContainer.css'



const StatustiquesContainer = ({ActiveStatistiques, ActiveModifier, ActiveCréer}) => {


    return(
        ActiveModifier || ActiveCréer ? '' : (
        <div className={ActiveStatistiques ? 'selectedStatustiques' : 'ShowStatustiquesContainer'}>
            
        </div>
        )
    )
}

export default StatustiquesContainer