const departementSchema = require('../model/departementSchema')

const postModule = async (req, res) => {
    const designation = req.body.ModDesignation
    const horaire = req.body.Modhoraire
    const enseignant = req.body.selectEns
    const formation = req.body.selectFor

    try {
        const departement = await departementSchema.findOne({ 'formation.designation': formation });
        const depId = departement._id


        await departementSchema.findOneAndUpdate(
            { _id: depId, 'formation.designation': formation },
            { $push: { 'formation.$.modules': { designation, horaire, enseignant, formation } } },
            { new: true }
        );
        res.status(200).json({message: 'OK'})
    }catch (error) {
        res.status(202).json({message: error.message})
        
    }
}

const getModule = async (req, res) => {
    try {
        const departements = await departementSchema.find({}, 'formation'); 
        
        const formations = departements.reduce((acc, dept) => {
            return acc.concat(dept.formation);
        }, []);

        const modules = formations.reduce((acc, form) => {
            return acc.concat(form.modules);
        }, []);
        
        res.json(modules)
    } catch (error) {
        res.status(201).json({message: error.message})
    }
}

const deleteModule = async (req, res) => {
    try {
            const { moId, forma}= req.params

            const departement = await departementSchema.findOne({'formation.designation': forma })
            const depId = departement._id

            console.log(depId)
            console.log(forma)
            console.log(moId)

            const department = await departementSchema.findOneAndUpdate(
                { _id: depId, 'formation.designation': forma },
                { $pull: { 'formation.$.modules': { _id: moId } } },
                { new: true }
              );
    
            res.status(200).json({message: 'deleted successfully'})
    }catch (error) {
        res.status(201).json({message: error.message})
    }
}

module.exports = {postModule, getModule, deleteModule}