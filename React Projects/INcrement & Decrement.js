import { useState } from 'react'
import './App.css';

function App() {
  const [counter, setCounter]  = useState(15)

  //let counter = 15

  const addValue = () => {
    //counter = counter + 1
    if(counter<20){setCounter(prevCounter => prevCounter + 1)
    }
    
    
  }

  const removeValue = () => {
    if(counter>0)setCounter(counter - 1)
  }
  return (
    <div className="App">
      <header className="App-header">
      <h1>Chai aur react</h1>
      <h2>Counter value: {counter}</h2>

      <button
      onClick={addValue}
      >Add value {counter}</button> 
      <br />
      <button
      onClick={removeValue}
      >remove value {counter}</button>
      <p>footer: {counter}</p>
      </header>
    </div>
  );
}

export default App;
