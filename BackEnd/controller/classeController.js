const departementSchema = require('../model/departementSchema')


const postClasse = async (req, res) => {
    const {designation, formation} = req.body

    try {
        const departement = await departementSchema.findOne({'formation.designation': formation})
        const depId = departement._id
        const result = await departementSchema.findOneAndUpdate(
            {_id: depId, 'formation.designation': formation },
            {$push: {'formation.$.classe': {designation, formation}}},
            {new: true}
        )


        res.status(200).json({message: 'OK'})
    } catch (error) {
        res.status(200).json({error: error.message})
        
    }
}

const getClasse = async (req, res) => {
    try {
        const departements = await departementSchema.find()

        const formations = departements.reduce((acc, dept) => {
            return acc.concat(dept.formation);
        }, []);

        const classes = formations.reduce((acc, dept) => {
            return acc.concat(dept.classe);
        }, []);


        res.json(classes)
    } catch (error) {
        res.status(202).json({error: error.message})
        
    }
}

const deleteClasse = async (req, res) => {
    try {
        const classeID = req.params.classeID
        const forDesi = req.params.forDesi
        const departement = await departementSchema.findOne({'formation.designation': forDesi})
        const depId = departement._id


        const result = await departementSchema.findOneAndUpdate(
            { _id: depId, 'formation.designation': forDesi},
            { $pull: {'formation.$.classe': { _id: classeID}}},
            { new: true}
        )

        res.status(200).json({message: 'OK'})
    } catch (error){
        res.status(201).json({message: error.message })
    }
}


module.exports = {postClasse, getClasse, deleteClasse}