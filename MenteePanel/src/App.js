import React from 'react'
import { Routes, Route,Navigate } from "react-router-dom"
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import useAuthContext from './hooks/useAuthContext'
import AllMentors from './components/Forms/AllMentors'
import LatestSessions from './components/Forms/LatestSessions'
import MentorDetail from './components/Forms/MentorDetail'
import MenteeSessions from './components/Forms/MenteeSessions'
const App = () => {
  const {user} = useAuthContext()
  return (
    <>
          <Routes>
            <Route 
              path='/' 
              element={user ? <HomePage/> : <Navigate to="/login"/>}/>
            <Route 
              path='/login' 
              element={!user ? <Login/> : <Navigate to="/"/>}/>
            <Route 
              path='/signup' 
              element={!user ? <Signup/> : <Navigate to="/"/>}/>
              <Route 
              path='/latestsessions' 
              element={!user ? <Signup/> : <LatestSessions/>}/>
              <Route 
              path='/allmentors' 
              element={!user ? <Login/> : <AllMentors/>}/>
              <Route 
              path='/upcommingsessions' 
              element={!user ? <Login/> : <MenteeSessions/>}/>
              <Route path="/mentor/:email" element={<MentorDetail />} />
          </Routes>
    </>
  )
}

export default App