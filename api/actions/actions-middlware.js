const Actions = require("./actions-model")

async function validateActionId (req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if(!action) {
            next({ status: 404, message: [] })
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: "oops 😵"
        })
    }
}

function validateAction (req, res, next) {
    const { notes, description, project_id } = req.body
    if( !notes || !description || !project_id ) {
        res.status(400).json({
            message: "please enter notes, description, and project id"
        })
    } else {
        notes, description
        next()
    }
}

function validateCompleted (req, res, next) {
    const { completed } = req.body 
    !completed ? res.status(400) : completed
    next()
}

module.exports = {
    validateActionId,
    validateAction,
    validateCompleted
}