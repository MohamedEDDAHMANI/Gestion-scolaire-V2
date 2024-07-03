const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRoutes = require('./routs/userRouts')
const departementRoutes = require('./routs/departementRouts')
const formationRouts = require('./routs/formationRouts')
const modulesRouts = require('./routs/modulesRoutes')
const enseignantRouts = require('./routs/enseignantRouts')
const classeRouts = require('./routs/classeRouts')
const etudiantRouts = require('./routs/etudiantRouts')
const updateRouts = require('./routs/updateData')




const cors = require('cors')
app.use(cors()) 
app.use(bodyParser.json())
app.use(express.static('userImages'))
app.use(express.static('enseignantImages'))


app.use('/API/user', userRoutes)

app.use('/API/departement', departementRoutes)
app.use('/API/formation', formationRouts)
app.use('/API/modules', modulesRouts)
app.use('/API/enseignant', enseignantRouts)
app.use('/API/classe', classeRouts)
app.use('/API/etudiant', etudiantRouts)
app.use('/update', updateRouts)




mongoose.connect('mongodb+srv://user2000:user2000@cluster0.qnoka8o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    // console.log(result)
    console.log('dataBase is connected ...')
}).catch((err) => {
    console.log('error connecting dataBase !!')
    console.log(err)
});





app.listen(5500 , () => {
    console.log('http//localhost:5500/')
})