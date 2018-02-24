'use strict';

var Todoist = require('../providers/todoist/todoist-api');

exports.getItems = function (req, res, next) {
    var todoist = new Todoist('e161e8f3da37f6310e45ea29b6f042c2c74620ad');

    todoist.entity('tasks').get().then(function (data) {
        res.status(200).json({
            tasks: data
        });
    }).catch(function (err) {
        res.status(500).json({
            error: err
        });
    });
};

exports.getProjects = function (req, res, next) {
    var todoist = new Todoist('e161e8f3da37f6310e45ea29b6f042c2c74620ad');

    todoist.entity('projects').get().then(function (data) {
        res.status(200).json({
            projects: data
        });
    }).catch(function (err) {
        res.status(500).json({
            error: err
        });
    });
};