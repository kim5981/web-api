const express = require("express")

const {
    validateProject,
    validateProjectId,
    validateCompleted
} = require("./projects-middleware")

const router = express.Router()

const Projects = require("./projects-model")

router.get("/", (req, res, next) => {
    Projects.get()
     .then(projects => {
         res.json(projects)
     })
     .catch(next)
});


router.get("/:id", validateProjectId, (req, res) => {
    res.json(req.project)
})


router.post("/", validateProject, (req, res, next) => {
    Projects.insert({
         name: req.body.name, 
         description: req.body.description,
         completed: req.body.completed 
        })
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})


router.put("/:id",
 validateProject, 
 validateProjectId, 
 validateCompleted,
(req, res, next) => {
    Projects.update(req.params.id, { 
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed 
    })
        .then(updatedProject => {
            res.json(updatedProject)
        })
        .catch(next)
})


router.delete("/:id", validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id) 
        .then(() => {
            res.json(req.project)
        })
        .catch(next)
})


router.get("/:id/actions", validateProjectId, async (req, res, next) => {
    try { 
        const actions = await Projects.getProjectActions(req.params.id)
        res.json(actions)
        }
    catch(err){
        next(err)
        }
})


module.exports = router 