const Projects = require("./projects-model");

async function validateProjectId (req, res, next) {
    try{
        const project = await Projects.get(req.params.id)
        if(!project){
            next({ status: 404, message: "project not found" })
        } else {
            req.project = project
            next()
        }
    } catch(err) {
        res.status(500).json({
            message: "oops 😵"
        })
    }
}

function validateProject (req, res, next) {
    const { name, description } = req.body
   
    if( !name || !description ) {
        res.status(400).json({
            message: "please enter a name and description"
        })
    } else {
        name, description
        next()
    }
}

function validateCompleted (req, res, next) {
    const { completed } = req.body
    !completed ? res.status(400) : completed
    next()
}

module.exports = {
    validateProjectId,
    validateProject,
    validateCompleted
}