const Todoist = require('../providers/todoist/todoist-api')


exports.getItems = (req, res, next) => {
    const todoist = new Todoist('e161e8f3da37f6310e45ea29b6f042c2c74620ad')

    todoist.entity('tasks') 
        .get() 
        .then(data => {
            res.status(200).json({
                tasks: data
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })             
}

exports.getProjects = (req, res, next) => {
    const todoist = new Todoist('e161e8f3da37f6310e45ea29b6f042c2c74620ad')

    todoist.entity('projects') 
        .get() 
        .then(data => {
            res.status(200).json({
                projects: data
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })             
}



