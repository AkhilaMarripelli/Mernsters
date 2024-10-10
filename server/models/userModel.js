const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Email is not valid'],
  },
  password: {
    type: String,
    required: true,
    validate: [validator.isStrongPassword, 'Password is not strong enough'],
  },
  role: {
    type: String,
    default: 'mentor',
  },
  profile: {
    bio: { type: String },
    skills: [String],
    expertise: [String],
    location: { type: String },
    availability: [
      {
        day: { type: String },
        startTime: { type: String },
        endTime: { type: String },
      },
    ],
    image: { type: String }, // Add this field for the image URL
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Static signup method
userSchema.statics.signup = async function (
  name,
  email,
  username,
  password,
  bio,
  skills,
  expertise,
  location,
  image // Add image parameter
) {
  // Validation
  if (!name || !email || !username || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create user with all fields including profile
  const user = await this.create({
    name,
    email,
    username,
    password: hash,
    profile: {
      bio,
      skills,
      expertise,
      location,
      image, // Include image in profile
    },
  });

  return user;
};

module.exports = mongoose.model("Mentor", userSchema);
