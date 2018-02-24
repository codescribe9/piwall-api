const Todo = require('../providers/todoist/client')


exports.getTodoList = (req, res, next) => {
    Todo
        .oauth()
        .then(() => {
            res.status(200).json({
                message: 'success'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })             // handle your error response
}



