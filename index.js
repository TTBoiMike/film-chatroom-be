const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const {ObjectId} = require('mongodb')
const mongoose = require('mongoose')

// schema
const {Film} = require('./models/film')

const port = 3001
const app = express();

app.use(cors())
app.use(helmet())
app.use(express.json())

app.listen(port, () => {
    console.log(`Listing on port ${port}`)
})

mongoose.connect('mongodb+srv://mikethorpe:testtest@cluster0.cn3w3.mongodb.net/film-chatroom', { useNewUrlParser: true, useUnifiedTopology: true } )

// get all films from database
app.get('/', async (req, res) => {
    try {
        const films = await Film.find()
        res.send(films)
    }
    catch {
        res.sendStatus(500)
    }
})
// add a film to the databse
app.post('/', async (req, res) => {
    const film = new Film(req.body)
    try {
        await film.save()
        res.status(200).send({message: "New film added to the database!"})
    }
    catch {
        res.sendStatus(500)
    }
})
// update film reactions
app.put('/:id', async (req, res) => {
    try {
        await Film.findOneAndUpdate({_id: ObjectId(req.params.id)}, req.body)
        res.sendStatus(200)
    }
    catch {
        res.sendStatus(500)
    }
})