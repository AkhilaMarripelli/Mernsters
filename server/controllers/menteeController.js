const mongoose = require('mongoose');
const User = require("./../models/menteeModel");
const jwt = require('jsonwebtoken');

// Function to create a JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Signup user
const signupUser = async (req, res) => {
    const { name, email, username, password, bio, skills, interests, location } = req.body;

    try {
        // Pass all profile fields to the signup method
        const user = await User.signup(name, email, username, password, bio, skills, interests, location);

        // Create JWT token
        const token = createToken(user._id);

        // Respond with email and token
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const name = user.name;

    // Create JWT token
    const token = createToken(user._id);

    // Respond with name, email, and token
    res.status(200).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
