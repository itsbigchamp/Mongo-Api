import { MongoClient } from 'mongodb'
import { uri } from './dbsecrets.js'
const client = new MongoClient(uri)
const db = client.db('sample_mflix')
const movieCollection = db.collection('movies')

import express from 'express'
import cors from 'cors'
const app = express()
const port = 4000
app.use(cors()) // allow anyone to hit this api
app.use(express.json()) // allow a POST with JSON

//app.get and app.post go here
// if you go to http://localhost:4000/
app.get("/", (req, res) => {
    res.status(200).send('Hello World')
})

// if you go to http://localhost:4000/movies
app.get('/movies', (req,res) => {
    const query = {}
    console.log(movieCollection.countDocuments(query))

    movieCollection.find(query).limit(10).toArray((err, movies) => {
        console.log("no dude really. it worked")
        res.status(200).json(movies)
    })
})

app.post('/movie', (req, res) => {
    const newMovie = req.body

    movieCollection.insertOne(newMovie, (err, results) =>{ 
        if(err) {
            res.status(500).json({error:true})
        }else {
            res.status(201).json(results)
        }
    })
})

app.listen(port, () => {
    console.log('Ready on http://localhost:'+port)
})