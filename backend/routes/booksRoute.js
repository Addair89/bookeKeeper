//Creating an express router to handle all the routes, this is favorable expecially when we have more models and routes for our application

import express from 'express';
import { Book } from '../models/bookModels.js';

const router = express.Router();

//Route to save a new Book
router.post('/', async (req, res) => {
    try {
        //checking if data has all attributes i want
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear 
        ){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publish year'
            })
        }
        //creating the stuctor i want for the book
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        //creating the book
        const book = await Book.create(newBook)
        //sending the book to the datbase
        return res.status(201).send(book)

    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//Get all books from database
//can use the same route for multiple requests, /books is used above to post a new book
router.get('/', async (req, res) => {
    try {
        //this .find({}) finds all the items in the DB
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        
    }
})

//Get one book from database using ID
//notice again, using the same route for this with :id, then we destructer the ID off below
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        //this checks the DB for the specific ID
        const book = await Book.findById(id)
        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//Route to Update a book
//router.put is used to update the book, rememeber you're not updating the book here, youre just sending the data to update the book
//so on the "result" variable, youre passing the ID of the book you want to update and the req.body(data) that you want in that book
router.put('/:id', async (req, res) => {
    try {
        //checking if data has all attributes i want
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear 
        ){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publish year'
            })
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body)

        if(!result){
            return res.status(404).send({message: 'Book not found'})
        }
        return res.status(200).send({message: 'Book Updated'})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//deleting a book. For deletion we just need the ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            res.status(404).json({message: 'Book not found'})
        }

        return res.status(200).send({message: 'Book deleted'})  
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//export the router for other files to use these routes
export default router;