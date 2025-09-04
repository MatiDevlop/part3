require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('dist'))

app.use(express.json())

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})


app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

const generateId = () => {
  return Math.floor(Math.random() * 1000000)
}

app.get('/api/persons', (req,res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/info', (req,res)=>{
    const contactos = persons.length
    const fecha = new Date()
    res.send(`<p>Phonebook has info for ${contactos} people</p> <p>${fecha}</p>`)
})

app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person){
        return res.json(person)
    }
    res.status(404).end()
})

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req,res) => {
    const body = req.body
    if(!body.name || !body.number){
        return res.status(400).json({error: 'name or number is missing'})
    }
    else if (persons.find(p => p.name === body.name)){
        return res.status(400).json({error: 'name must be unique'})
    }
    const person = {
        "id": generateId(),
        "name": body.name,
        "number": body.number
    }
    persons = persons.concat(person)
    res.status(201).end()
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)