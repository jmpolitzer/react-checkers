import React from 'react'
import ReactDOM from 'react-dom'
import { Checkerboard } from 'react-checkers'

import './styles.css'

function App() {
  return (
    <div className='App'>
      <Checkerboard />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
