import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Form.scss';
import Navbar from './../Navbar/Navbar';
import useSignup from './../../hooks/useSignup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const { signup, isLoading, error, success } = useSignup();

  const [FormData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    bio: '',
    skills: '',
    expertise: '',
    location: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  const RegisterUser = async (e) => {
    e.preventDefault();
    const { name, email, username, password, bio, skills, expertise, location } = FormData;

    // Convert comma-separated strings to arrays
    const skillsArray = skills.split(',').map((skill) => skill.trim());
    const expertiseArray = expertise.split(',').map((interest) => interest.trim());

    // Pass the converted arrays to the signup function
    await signup(name, email, username, password, bio, skillsArray, expertiseArray, location);
  };

  const toast_property = () => {
    const obj = {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    };
    return obj;
  };

  return (
    <>
      <Navbar isLogin="false" />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {error && toast.error(error, toast_property())}
      {success && toast.success(success, toast_property())}

      <div className="form-body">
        <div className="form-box">
          <div className="form-header">
            <h3>Sign up</h3>
          </div>
          <div className="form-inner-body">
            <form method="post" onSubmit={RegisterUser}>
              <div className="input-group">
                <input value={FormData.name} onChange={handleInput} type="text" placeholder="Name" name="name" id="name" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-group">
                <input value={FormData.username} onChange={handleInput} type="text" placeholder="Username" name="username" id="username" />
                <label htmlFor="username">Username</label>
              </div>
              <div className="input-group">
                <input value={FormData.email} onChange={handleInput} type="email" placeholder="Email" name="email" id="email" />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-group">
                <input value={FormData.password} onChange={handleInput} type="password" placeholder="Password" name="password" id="password" />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-group">
                <input value={FormData.bio} onChange={handleInput} type="text" placeholder="Bio" name="bio" id="bio" />
                <label htmlFor="bio">Bio</label>
              </div>
              <div className="input-group">
                <input value={FormData.skills} onChange={handleInput} type="text" placeholder="Skills (comma separated)" name="skills" id="skills" />
                <label htmlFor="skills">Skills</label>
              </div>
              <div className="input-group">
                <input value={FormData.expertise} onChange={handleInput} type="text" placeholder="expertise (comma separated)" name="expertise" id="expertise" />
                <label htmlFor="expertise">expertise</label>
              </div>
              <div className="input-group">
                <input value={FormData.location} onChange={handleInput} type="text" placeholder="Location" name="location" id="location" />
                <label htmlFor="location">Location</label>
              </div>
              <div className="input-group">
                <input type="checkbox" name="term" id="term" />
                <label htmlFor="term" className="checkbox">
                  I agree with terms & conditions
                </label>
              </div>
              <div className="input-group">
                <button className="btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
            <p>
              Already have an account? <Link to={'/login'}>Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
