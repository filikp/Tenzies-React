import React from 'react'
import Mine from './components/Mine'

export default function App() {

  const [mines, setMines] = React.useState(allNewMines())

  function allNewMines() {
    const newMine = [];
    for (let i = 0; i < 25; i++) {
      newMine.push(Math.floor(Math.random() * 2))
    }
    return newMine;
  }

  const mineElements = mines.map(mine => <Mine value={mine} />)

  function newGame() {
    setMines(allNewMines())
  }

  return (
    <main>
      <div className='mine-container'>
        {mineElements}
      </div>
      <button className='new-game' onClick={newGame}>New Game</button>
    </main>
  )
}