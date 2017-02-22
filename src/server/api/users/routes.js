import express from 'express'
import * as controllers from './controllers'

const router = express.Router()

router.get('/', controllers.getUsers)
// router.put('/', conrollers.putUser)

// router.get('/:id', controllers.getOneUser)
// router.delete('/:id', controllers.deleteOneUser)


router.get('/setup', controllers.setup)

router.get('/login', controllers.login)
// router.put('/users', conrollers.putUser)


export default router
