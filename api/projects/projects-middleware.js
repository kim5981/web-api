const Projects = require("./projects-model");

async function validateProjectId (req, res, next) {
    try{
        const project = await Projects.get(req.params.id)
        if(!project){
            res.status(404).json({
                message: "project id not valid"
            })
        } else {
            req.body.id = project
        }
    } catch(err) {
        res.status(500).json({
            message: "oops 😵"
        })
    }
    next()
}

function validateProject (req, res, next) {
    const { name, description } = req.body 
    if (  (!description && !name)
            || !description.trim() && !name.trim()
        ) {
        res.status(400).json({
            message: "please enter a name and description"
        })
    } else {
        res.json({ name, description })
        next()
    }
}

module.exports = {
    validateProjectId,
    validateProject,
}