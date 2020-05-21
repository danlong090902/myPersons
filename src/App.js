import React, { useState, useEffect } from 'react'
import personsServices from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    personsServices.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])


  const nameChangeHandle = (e) => {
    setNewName(e.target.value)
  }

  const numberChangeHandle = (e) => {
    setNewNumber(e.target.value)
  }

  const addSubmitHandle = event => {
    event.preventDefault();
    // const isReapt = persons.some((element, index, array) => {
    //   return element.name === newName
    // })
    // if (isReapt) {
    //   alert(`${newName} is already add to phonebook`)
    // } else {
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personsServices.create(newPerson)
      .then(res => {
        if (res.data.message) {
          console.log(res.data.message)
          setErrorText(res.data.message)
        } else {
          setPersons(persons.concat(res.data))

        }
      })
    // }

    setNewName('')
    setNewNumber('')
  }
  const filerChangeHandle = (e) => {
    setFilterName(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      {errorText && <h5>{errorText}</h5>}
      <Filter filterName={filterName} filerChangeHandle={filerChangeHandle} />
      <h2>add a new</h2>
      <PersonForm
        addSubmitHandle={addSubmitHandle}
        newName={newName}
        newNumber={newNumber}
        nameChangeHandle={nameChangeHandle}
        numberChangeHandle={numberChangeHandle}
      />
      <h2>Numbers</h2>
      <Persons filterName={filterName} persons={persons} />
    </div>
  )
}


export default App