import { useState } from 'react'

const App2 = () => {
    const anecdotes = [
      'If it hurts, do it more often.',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      'The only way to go fast, is to go well.'
    ]
    const [points, setPoints] = useState({
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0  
    })
  
    const [selected, setSelected] = useState(0)

    const anecdotaAleatoria = () => {
        const max = anecdotes.length
        const randomNumber = Math.floor(Math.random() * max)
        console.log(randomNumber)
        setSelected(randomNumber)
        return (
            <p>{anecdotes[selected]}</p>
        )
    }
    
    const votarAnecdota = () => {
        const newPoints = { ...points } 
        newPoints[selected] += 1
        setPoints(newPoints)
        console.log(newPoints)
    }

    const getMaxVotesAnecdote = () => {
        const maxVotes = Math.max(...Object.values(points))
        const maxIndex = Object.keys(points).find(key => points[key] === maxVotes)
        return { anecdote: anecdotes[maxIndex], votes: maxVotes }
    }
    const maxVotesAnecdote = getMaxVotesAnecdote()
  
    return (
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
        <p>Esta anécdota tiene {points[selected]} votos</p>
        <br></br>
        <button onClick={anecdotaAleatoria}>next anecdote</button>
        <button onClick={votarAnecdota}>vote</button>
        
        <h1>Anecdote with most votes</h1>
        <p>{maxVotesAnecdote.anecdote}</p>
        <p>has {maxVotesAnecdote.votes} votes</p>
      </div>
    )
  }

export default App2