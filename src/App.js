import React from 'react'
import Mine from './components/Mine'

export default function App() {

  const [mines, setMines] = React.useState(allNewMines())

  function allNewMines() {
    const newMine = [];
    for (let i = 0; i < 25; i++) {
      newMine.push({
        value: Math.floor(Math.random() * 2),
        id: i,
        isPushed: false
      })
    }
    return newMine;
  }

  const mineElements = mines.map(mine => (
    <Mine
      key={mine.id}
      value={mine.value}
      isPushed={mine.isPushed}
      pressMine={() => pressMine(mine.id)}
    />
  ))

  function newGame() {
    setMines(allNewMines())
  }

  function pressMine(id) {
    setMines(prevMines => prevMines.map(mine => {
      return mine.id === id && mine.isPushed == false ?
        { ...mine, isPushed: !mine.isPushed } :
        mine
    }))
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