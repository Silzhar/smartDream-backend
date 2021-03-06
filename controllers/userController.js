'use strict'

const firebase = require('../db')
const firestore = firebase.firestore()
const User = require('../models/user')

const addUser = async (req, res, next) => {
    try {
        const data = req.body
        await firestore.collection('users').doc().set(data)
        res.send('Record saved successfuly')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await firestore.collection('users').doc(id)
        const data = await user.get()
        if(!data.exists) {
            res.status(404).send('User with the given ID not found')
        }else {
            res.send(data.data())
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await firestore.collection('users')
        const data = await users.get()
        const usersList = []
        if(data.empty) {
            res.status(404).send('No user found')
        }else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().phone,
                    doc.data().email,
                )
                usersList.push(user)
            })
            res.send(usersList)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body
        const user =  await firestore.collection('users').doc(id)
        await user.update(data)
        res.send('User updated successfuly')       
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('users').doc(id).delete()
        res.send('deleted successfuly')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    addUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
}
