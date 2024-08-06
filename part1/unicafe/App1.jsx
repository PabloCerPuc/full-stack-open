import { useState } from 'react'

const Headers = (props) => {
    return (
      <h1> 
        {props.cabecera}
      </h1>
    )
  }

const Button = (props) => {
    return (
      <button onClick={props.onClick}>
        {props.text}
      </button>
    )
}

const StatisticLine = (props) => {
    return (
      <tr>
        <td>{props.newText}</td>
        <td>{props.newValue}</td>
      </tr>
    )
}

const Statistics = (props) => {
    if (props.all === 0){
        return (
            <div>
                No feedback given
            </div> 
        )
    }
    return(
        <div>
            <StatisticLine newText='good ' newValue={props.good}/>
            <StatisticLine newText='neutral ' newValue={props.neutral}/>
            <StatisticLine newText='bad ' newValue={props.bad}/>
            <StatisticLine newText='all ' newValue={props.all}/>
            <StatisticLine newText='average ' newValue={props.average}/>
            <StatisticLine newText='positive ' newValue={props.positive}/>
        </div>
    )
}

const App1 = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const cabeceraUno = 'give feedback'
  const cabeceraDos = 'statistics'
  const average = (good - bad) / all
  const positive = good / all

  const handleGood  = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutral  = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBad  = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }


  return (
    <div>
      <Headers cabecera={cabeceraUno}/>
      <Button onClick={handleGood} text='Good'/>
      <Button onClick={handleNeutral} text='Neutral'/>
      <Button onClick={handleBad} text='Bad'/>
      <Headers cabecera={cabeceraDos}/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App1