const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2];
console.log(password);

const name = process.argv[3];
const number = process.argv[4];

if (name && number) {
  console.log(`added ${name} number ${number} to phonebook`)
} else {
  console.log('name or number is missing')
}
const url =
  `mongodb+srv://root:${password}@cluster0-irkpv.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', noteSchema)

// const note = new Person({
//   name,
//   number,
//   id: Math.floor(Math.random() * 9999),
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })
Person.find().then(result => {
  result.forEach(person => {
    const { name, number } = person;
    console.log(name, number)
  })
  mongoose.connection.close()
})