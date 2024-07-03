const Departement = require('../model/departementSchema')





const updateDepartement = async (req, res) => {
    const name = req.params.name
    const data = req.body
    const id = data._id
    console.log('data', data)
    switch (name) {
        case 'departement':
            try {
                const result = await Departement.findByIdAndUpdate(id, data, { new: true })
                console.log('resut---', result)
            } catch (error) {
                return res.status(202).json({ message: 'update filde' })
            }
            break;
        case 'formation':
            const { designation, _id } = data;
            console.log(designation)
            console.log(_id)
            try {
                const result = await Departement.findOneAndUpdate(
                    { 'formation._id': _id },
                    { $set: { 'formation.$.designation': designation } },
                    { new: true }
                )
                if (!result) {
                    return res.status(404).json({ message: 'Formation not found' });
                }
        
                return res.status(200).json(result);
            } catch (error) {
                return res.status(202).json({ message: 'update filde' })
            }
        case 'enseignant':
            try {
                const result = await Departement.findByIdAndUpdate(id, data, { new: true })
                console.log(result)
            } catch (error) {
                return res.status(202).json({ message: 'update filde' })
            }
            break;
        case 'module':
            try {
                const result = await Departement.findByIdAndUpdate(id, data, { new: true })
                console.log(result)
            } catch (error) {
                return res.statue(202).json({ message: 'update filde' })
            }
            break;
        case 'classe':
            try {
                const result = await Departement.findByIdAndUpdate(id, data, { new: true })
                console.log(result)
            } catch (error) {
                return res.statue(202).json({ message: 'update filde' })
            }
            break;
        case 'etudiant':
            try {
                const result = await Departement.findByIdAndUpdate(id, data, { new: true })
                console.log(result)
            } catch (error) {
                return res.statue(202).json({ message: 'update filde' })
            }
            break;
    }
};

module.exports = { updateDepartement }