'use strict'
const express = require('express')
const cors = require('cors')
const config = require('./config')
const userRoutes = require('./routes/user-routes')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', userRoutes.routes)


app.listen(config.port, () => console.log('App url http://localhost:' + config.port))
