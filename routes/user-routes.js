const express = require('express')
const { addUser,
        getUser,
        getAllUsers, 
        updateUser,
        deleteUser
      } = require('../controllers/userController')

const router = express.Router()

router.post('/user', addUser)
router.get('/user/:id', getUser)
router.get('/users', getAllUsers)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)


module.exports = {
    routes: router
}
