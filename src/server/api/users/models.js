import mongoose from 'mongoose'
mongoose.Promise = global.Promise

const Schema = mongoose.Schema

const userModel = mongoose.model('User', new Schema({
  name: String,
  password: String,
  admin: Boolean
}))

export default userModel
