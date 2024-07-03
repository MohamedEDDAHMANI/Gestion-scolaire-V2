const departementSchema = require('../model/departementSchema')



const postEnseignent = async (req, res) => {

    const { nom, prenom, spesialite, selectFor } = req.body;
    const formation = selectFor
        const picture = req.file ? req.file.filename : null;    

        try {
            const departement = await departementSchema.findOne({'formation.designation': formation})
            const depId = departement._id
            console.log(depId)
            const addEnseignant = await departementSchema.findOneAndUpdate(
                {_id: depId, 'formation.designation': formation},
                {$push: {'formation.$.enseignant': {nom, prenom, spesialite, formation, picture }}},
                { new: true }
            )
            console.log(departement.formation)
        res.status(200).json({message: 'Enseignant created successfully'})
    } catch (error) {
        res.status(500).json({ message: 'Error creating enseignant', error: error.message });
    }
}

const getEnseignent = async (req, res) => {
    try {
        const enseignantsArray = await departementSchema.distinct('formation.enseignant', {});
        res.json(enseignantsArray)
    } catch (error) {
        res.status(202).json({message: error.message})
    }
}

const deleteEnseignent = async (req, res) => {
    try {
        const { ensId, forDesig } = req.params;
        console.log('id' ,ensId)
        console.log('designation' ,forDesig)


        const departement = await departementSchema.findOne(
            {'formation.designation': forDesig},
            { 'formation.$': 1 }
        )
        console.log(departement)
            const depId = departement._id

            console.log('-----',depId)
            if (!departement) {
                return console.log('not found')
            }
            

            const addEnseignant = await departementSchema.findOneAndUpdate(
                {_id: depId, 'formation.designation': forDesig},
                {$pull: {'formation.$.enseignant': { _id: ensId }}},
                { new: true }
            )

            console.log('ensegnant result' ,addEnseignant)
        if (!addEnseignant) {
            return console.log('not found')
        }

        res.status(200).json({message: 'deleted successfully'})
    } catch (error) {
        res.status(202).json({error: error.message})
        
    }
}

module.exports = {postEnseignent, getEnseignent, deleteEnseignent}