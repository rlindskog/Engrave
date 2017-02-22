import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  admin: Boolean
})

const User = mongoose.model('User', userSchema)

export default User
