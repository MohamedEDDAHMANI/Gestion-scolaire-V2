const  departementSchema  = require('../model/departementSchema')



const postDepartement = async (req, res) => {
    const designation = req.body.depDesignation
    const token = req.body.token
    try {
        if(!token){
            res.status(400).json({message: 'undefined token'})
        }
        const departement = await departementSchema.create({designation})
        res.status(201).json({ message: 'Departement created successfully', data: departement })
    } catch (error) {
        res.status(500).json({err: error.message})
    }
}

const getDepartement = async (req, res) => {
    try {
        const departements = await departementSchema.find()
        res.json(departements)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const deleteDepartement = async (req, res) => {
    const id = req.params.id
    try {
        const deleteDep = await departementSchema.findByIdAndDelete(id)
        console.log(deleteDep)
        res.status(200).json({message: 'OK'})
    } catch (error) {
        res.status(201).json({message: error.message})
        
    }
}

module.exports = { postDepartement, getDepartement, deleteDepartement }