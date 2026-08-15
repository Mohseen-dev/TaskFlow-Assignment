import React, { useEffect, useState } from 'react'
import { getBoard } from './services/taskApi';
import Board from './components/Board';

const App = () => {
  return (
    <div>
      <Board/>
    </div>
  )
}

export default App
