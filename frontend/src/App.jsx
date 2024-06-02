import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import About from './components/About/About'
import Feature from './components/Feature/Feature'
import Features from './components/Features/Features'
import Testimonial from './components/Testimonial/Testimonial'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import HowItWorks from './components/HowItWorks/HowItWorks'
import Loader from './components/Loader/Loader'
import MentorshipProgram from './components/MentorshipProgrma/MentorshipProgram'


function App() {

  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    },3000 )
  }, [])

 return (
  <>

  { loading && 
  
  <>
  <Loader/>
  </>
  }
  
  { !loading && 
  (
    <>
  <Header/>
  <About/>
  <Features/>
  <HowItWorks/>
  <MentorshipProgram/>
  <Testimonials/>
  <Contact/>
  </>
  )
  
  }
  
  </>
 )
}

export default App
