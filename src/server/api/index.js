import express from 'express'
import mongoose from 'mongoose'
import usersRoutes from './users/routes'


const router = express.Router()

router.get('/', (req, res) => {
  res.json({ msg: 'This is the API. Have at it! :)' })
})
router.use('/users', usersRoutes)

// es6 promises - mongoose promises are deprecated.
mongoose.Promise = global.Promise

// database connection
mongoose.connect('mongodb://localhost:27017/engrave')
mongoose.connection.once('connection', () => {
  console.log('Connected to the DB...')
})

export default router
