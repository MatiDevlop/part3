const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const nombre = process.argv[3]
const numero = process.argv[4]

const url =
    `mongodb+srv://matias:${password}@cluster0.q2mbinu.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length===3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
else{
    const person = new Person({
        name: nombre,
        number: numero,
        })

    person.save().then(result => {
        console.log(`added ${nombre} number ${numero} to phonebook`)
        mongoose.connection.close()
    })
}