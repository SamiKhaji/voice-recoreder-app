import { useState } from 'react'
import './App.css'
import Recorder from './components/Recorder';
function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="app-container">
      <h1>Voice Recorder</h1>
      <Recorder />
    </div>
  )
}

export default App
