import React from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

export default function App() {

  const [tenzies, setTenzies] = React.useState(false)

  const [dice, setDice] = React.useState(allNewDice())

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false
    }
  }

  const [numberOfRolls, setNumberOfRolls] = React.useState({
    rolls: (0),
    startTime: new Date()
  })

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setNumberOfRolls(prevNumberOfRolls => {
        return {
          ...prevNumberOfRolls,
          rolls: prevNumberOfRolls.rolls + 1
        }
      })
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
      document.getElementById('youWon').innerHTML = ''
    }
  }

  function holdDice(id) {
    !tenzies && setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
        {
          ...die,
          isHeld: !die.isHeld
        } :
        die
    }))
  }

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      const endTime = new Date()
      const totalTime = Math.round((endTime - numberOfRolls.startTime) / 1000 * 100) / 100
      const newDiv = document.createElement('div')
      console.log(numberOfRolls.rolls)
      newDiv.innerHTML = `You won in ${numberOfRolls.rolls} rolls!\nYour elapsed time is ${totalTime}s`
      document.getElementById('youWon').appendChild(newDiv)
    }

  }, [dice])

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      tenzies={tenzies}
    />
  ))

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {tenzies && <Confetti />}
        {diceElements}
      </div>
      <button className='roll-dice' onClick={rollDice}>{tenzies ? "New game" : "Roll"}</button>
      <div id="youWon"></div>
    </main>
  )
}