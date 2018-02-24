const express = require('express')
const router = express.Router()

const TodoController = require('../controllers/todo')

router.get("/", TodoController.getTodoList)

module.exports = router;