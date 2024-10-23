

import './App.css'
import { determineOffspringBloodType } from './utils/bloodTypes'

function App() {
  

  return (
    console.log(determineOffspringBloodType(['A', 'O'], ['+', '-'], ['B', 'O'], ['-', '-']))
  )
}

export default App
