'use strict';

var express = require('express');
var router = express.Router();

var TodoController = require('../controllers/todo');

router.get("/", TodoController.getItems);
router.get("/projects", TodoController.getProjects);

module.exports = router;