import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModels.js';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express()
app.use(cors()) 
//gotta use this line so express can recieve and deliver json objects
app.use(express.json())

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to my server')
});

//this will use the booksRoute file for all requests using "/books", so in the router we dont need to write "/books" for all our routes
app.use('/books', booksRoute)

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
        console.log(`App is listening on PORT ${PORT}`)
    })
})
.catch((erorr) => {
    console.log(erorr)
})