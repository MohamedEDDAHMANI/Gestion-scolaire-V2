const departementSchema = require('../model/departementSchema')


const postEtudiant = async (req, res) => {
    const { nom, prenom, dateDeNaissance, classe } = req.body;
    const picture = req.file ? req.file.filename : null; 
    const departement = await departementSchema.findOne({ 'formation.classe.designation': classe });
    try {
        const result = await departementSchema.findOneAndUpdate(
            { _id: departement._id, 'formation.classe.designation': classe },
            { $push: {'formation.$[formationElem].classe.$[classeElem].etudiant': {
                        nom,
                        prenom,
                        dateDeNaissance,
                        classe,
                        picture
                    }}
            },
            {
                arrayFilters: [
                    { 'formationElem.classe.designation': classe }, // Target correct formation
                    { 'classeElem.designation': classe }            // Target correct class
                ],
                new: true
            }
        );
        console.log(result)
        res.status(200).json({messaga: 'OK'})
    } catch (error) {
        res.status(202).json({messaga: error.messaga})
        
    }
}

const getEtudiant = async (req, res) => {
    try {
        const etudiants = await departementSchema.aggregate([
            // Unwind formations array
            { $unwind: '$formation' },
            // Unwind classes array within formations
            { $unwind: '$formation.classe' },
            // Unwind etudiants array within classes
            { $unwind: '$formation.classe.etudiant' },
            // Project necessary fields
            {
                $project: {
                    _id: '$formation.classe.etudiant._id',
                    nom: '$formation.classe.etudiant.nom',
                    prenom: '$formation.classe.etudiant.prenom',
                    dateDeNaissance: '$formation.classe.etudiant.dateDeNaissance',
                    classe: '$formation.classe.etudiant.classe',
                    picture: '$formation.classe.etudiant.picture'
                }
            }
        ]);
        console.log(etudiants)

        res.status(200).json(etudiants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const deleteEtudiant = async (req, res) => {
    const {etudiantId , classeDesig} = req.params
    try {
        const departement = await departementSchema.findOne({'formation.classe.designation': classeDesig})

        const result = await departementSchema.findOneAndUpdate(
            { 'formation.classe.designation': classeDesig },
            { $pull: { 'formation.$[].classe.$[].etudiant': { _id: etudiantId } } },
            { new: true }
        );
        console.log(result)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {postEtudiant, getEtudiant, deleteEtudiant}