  import { useState } from 'react'
  import './App.css'
  import Images from './components/Images';
  import GenerateImage from './components/GenerateImage';

  function App() {
    const [count, setCount] = useState(0)

    return (
      <>
      <Images/>
      </>
    )
  }

  export default App
