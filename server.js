const express = require('express')
const app = express()
const cors = require('cors')
const { urlencoded } = require('express')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const PORT = 9000

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'sample_geospatial',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`Connected to Database`)
        db = client.db(dbName)
        collection = db.collection('shipwrecks')
    })

//setting middleware
app.set('views engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())

app.get('/', async (request, response) => {
    try{
        response.render('index.ejs')
    }catch (error) {
        response.status(500).send({message: error.message})
    }
    
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`listening on port ${PORT}`)
})


