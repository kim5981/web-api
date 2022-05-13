const Projects = require("./projects-model");

async function validateProjectId (req, res, next) {
    try{
        const id = await Projects.get(req.params.id)
        if(!id){
            next({ status: 404, message: "project not found" })
        } else {
            req.id = id
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


module.exports = {
    validateProjectId,
    validateProject,
}