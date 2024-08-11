import { useState, useEffect } from 'react'


import personsAxios from './services/personsAxios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Error from './components/Error'


const App = () => {
  const [persons, setPersons] = useState([]) 
  useEffect(() => {
    personsAxios.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notifMessage, setnotifMessage] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.find(n => n.name === newName)
    if(exists !== undefined){
      const confirmChange = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(confirmChange){
        const idChange = exists.id
        const personName = persons.find(n => n.name === newName)
        const changePerson = { ...personName, number: newPhone}
        personsAxios.updatePhone(idChange, changePerson).then(response => {
          setPersons(persons.map(person => person.id !== idChange ? person : response.data))
          setnotifMessage(`Updated '${newName}' phone`)
          setTimeout(() => {
            setnotifMessage(null)
          }, 5000)
          setNewName('')
          setNewPhone('') 
        })
        .catch(error => {
          setnotifMessage(
            `Information of '${newName}' has already been removed from server`
          )
          setTimeout(() => {
            setnotifMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== idChange))
        })
      }
    }
    else{
      const nameObject = {
        name: newName,
        number: newPhone
      }
      personsAxios.create(nameObject).then(response => {
        setPersons(persons.concat(nameObject))
        setnotifMessage(`Added '${newName}'`)
          setTimeout(() => {
            setnotifMessage(null)
          }, 5000)
        setNewName('')
        setNewPhone('')
      }) 
    } 
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person => 
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    const confirmDelete = window.confirm(`Delete ${personToDelete.name} ?`)
    
    if (confirmDelete) {
      personsAxios.deletePerson(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage}/>
      <Error message={notifMessage}/>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>

      <PersonForm 
        onSubmit={addPerson} 
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App