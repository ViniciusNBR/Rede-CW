const express = require('express')
const usersController = require('./controllers/usersController')
const sessionController = require('./controllers/sessionController')
const routes = express.Router()

routes.post('/session', sessionController.create)

routes.get('/users', usersController.index)

routes.get('/users/:id', usersController.indexFilter)

routes.post('/users', usersController.create)

routes.delete('/users/:id', usersController.delete)

module.exports = routes