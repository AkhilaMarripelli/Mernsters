import React from 'react'
import { Routes, Route,Navigate } from "react-router-dom"
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import useAuthContext from './hooks/useAuthContext'
import SaveSlotForm from './components/Forms/SaveSlotForm'
import MySessions from './components/Forms/MySessions'
import MentorSessions from './components/Forms/MentorSessions'
import KommunicateChat from './components/Forms/chat'
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
              path='/saveSlot' 
              element={!user ? <Login/> : <SaveSlotForm/> }/>
              <Route 
              path='/viewSlots' 
              element={!user ? <Login/> : <MySessions/> }/>
               <Route 
              path='/upcommingsessions' 
              element={!user ? <Login/> : <MentorSessions/> }/>
            <Route 
              path='/signup' 
              element={!user ? <Signup/> : <Navigate to="/"/>}/>
          </Routes>
          <KommunicateChat/>
    </>
  )
}

export default App