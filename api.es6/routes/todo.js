const express = require('express')
const router = express.Router()

const TodoController = require('../controllers/todo')

router.get("/", TodoController.getItems)
router.get("/projects", TodoController.getProjects)

module.exports = router;