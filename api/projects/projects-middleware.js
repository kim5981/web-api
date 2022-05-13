// add middlewares here related to projects

const Projects = require("./projects-model");

async function validateProjectId (req, res, next) {
    try{
        const project = await Projects.get(req.params.id)
        if(!project){
            res.json({
                message: "This user ID does not exist"
            })
        } else {
            req.project = project
        }
    } catch(err) {
        res.status(500).json({
            message: "oops 😵"
        })
    }
    next()
}

module.exports = {
    validateProjectId
}