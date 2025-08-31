const express = require('express')
const app = express()

app.use(express.json())

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

const obtenerUltimoId = () => {
    return Math.max(...persons.map(n => n.id))
}

app.get('/api/persons', (req,res) => {
    res.json(persons)
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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)