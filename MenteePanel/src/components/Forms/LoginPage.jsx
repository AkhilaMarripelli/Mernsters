import React,{useState} from 'react'
import {useLogin} from './../../hooks/useLogin'
import { Link, useNavigate  } from 'react-router-dom'
import Navbar from './../Navbar/Navbar'
import './Form.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from '../Hero/hero'

const LoginPage = () => {
  
    return (
      <>
      
      <Navbar/>
       <ToastContainer/>
        <HomePage/>
    
      </>
    )
  }
  

export default LoginPage