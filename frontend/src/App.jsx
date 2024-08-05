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
import ProfileForm from './components/ProfileForm/ProfileForm'
import ProfileSummary from './components/ProfileSummary/ProfileSummary'
import UserDashboard from './components/UserDashboard/UserDashboard'
import Discover from './components/Discover/Discover'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import DiscoverPage from './pages/Discover/DiscoverPage'
import Dashboard from './pages/Dashboard/Dashboard'
import RegisterForm from './components/RegisterForm/RegisterForm'
import Login from './components/Login/Login'
import { useSetRecoilState } from 'recoil'
import { authState } from './recoil/authState'
import axios from 'axios'
function App() {

  const [loading, setIsLoading] = useState(false);
  const setAuth = useSetRecoilState(authState);


  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   },3000 )
  // }, [])

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, you can verify the token with a backend endpoint to ensure it's valid
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuth({ token, isAuthenticated: true });
    }
  }, [setAuth]);


 return (
  <>

  { loading && 
  
  <>
  <Loader/>
  </>
  }
  
  { !loading && 
  (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/discover" element={<DiscoverPage/>} />
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  )
  
  }
  
  </>
 )
}

export default App
