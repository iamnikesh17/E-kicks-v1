import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header,Footer } from './components/main'
import { HomePage } from './pages/main'
import AllRoutes from './routes/AllRoutes'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from'react-toastify'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ToastContainer autoClose={3000} position="bottom-right"/>
      <Header/>
      <AllRoutes/>
      <Footer/>
    </>
  )
}

export default App
