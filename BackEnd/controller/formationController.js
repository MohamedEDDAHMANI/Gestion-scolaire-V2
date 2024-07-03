const departementSchema = require('../model/departementSchema')


const createFormation = async (req, res) => {

    const data = req.body
    const formation = {
        designation: data.ForDesignation
    }
    console.log(data.selectDep)
    const dep = await departementSchema.findOne({designation: data.selectDep})
    departementIdToUpdate = dep._id
    try {
        const newDep = await departementSchema.findOneAndUpdate(
            { _id: departementIdToUpdate },
            { $push: { formation: formation } },
            { new: true },
        );
        console.log(newDep)

        res.status(201).json({ message: 'Formation created successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
        
    }
}

const getFormation = async (req, res) => {

    try {
        const formationArray = await departementSchema.find({}, 'formation'); 
        
        const formations = formationArray.reduce((acc, dept) => {
            return acc.concat(dept.formation);
        }, []);
        res.json(formations)
    } catch (error) {
        res.status(202).json({message: error.message})
    }
}

const deleteFormation = async (req, res) => {
    
    try {
        const { depId, forId }= req.params
        console.log(depId)

        const dep = await departementSchema.findById(depId)
        

        dep.formation.pull({ _id: forId });

        // Save the updated department document
        await dep.save();

        res.status(200).json({message: 'deleted successfully'})
    } catch (error) {
        res.status(201).json({message: error.message})
    }

}

module.exports = {createFormation, getFormation, deleteFormation}