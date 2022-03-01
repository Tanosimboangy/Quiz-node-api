const express = require('express')
const router = express.Router()
const Question = require('./models/Question') // includes our model

// get all quiz questions
router.get('/questions', async (req, res) => {
    try {
        const question = await Question.find();
        return res.status(200).json(question);
    } catch {
        return res.status(500).json({"error":error})
    }
})

// get one quiz question
router.get('/questions/:id', async (req, res) => {
    try {
        // get the id from the url
        const _id = req.params.id;
        // get the question according to the id
        const question = await Question.findOne({_id})
        if(!question){
            return res.status(404).json({})
        } else {
            return res.status(200).json(question)
        }
    } catch {
        return res.status(500).json({"error":error})
    }
})

// create one quiz question
router.post('/questions', async (req, res) => {
    try {
        const { description } = req.body
        const { number } = req.body
        const { alternatives } = req.body

        const question = await Question.create({
            description,
            number,
            alternatives
        })
        return res.status(200).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// update one quiz question
router.put('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 
        const { description, number, alternatives } = req.body

        let question = await Question.findOne({_id})
        if(!question){
            question = await Question.create({
                description,
                number,
                alternatives
            })    
            return res.status(201).json(question)
        }else{
            question.description = description
            question.description = number
            question.alternatives = alternatives
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// delete one quiz question
router.delete('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 
        const question = await Question.deleteOne({_id})
        console.log(question);
        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

module.exports = router