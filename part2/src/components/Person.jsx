const Person = ({ name, number, id, deletePerson }) => {
  const baseUrl = 'http://localhost:3001/persons/'
  const urlId = baseUrl.concat(id)

    return (
      <div>
        <p>{name} {number}</p>
        <button onClick={() => deletePerson(id)}>delete</button>
      </div>
      )
    }
    
    export default Person