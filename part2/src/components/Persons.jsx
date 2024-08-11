import Person from "./Person"

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map(person => 
        <Person key={person.name} name={person.name} number={person.number} id={person.id} deletePerson={deletePerson} />
      )}
    </div>
  )
}
export default Persons