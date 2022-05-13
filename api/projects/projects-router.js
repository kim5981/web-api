const express = require("express")

const {
    validateProject,
    validateProjectId,
    validateCompleted
} = require("./projects-middleware")

const router = express.Router()

const Projects = require("./projects-model")


//* GET /api/projects
router.get("/", (req, res, next) => {
    Projects.get()
     .then(projects => {
         res.json(projects)
     })
     .catch(next)
});

//* GET /api/projects/:id
router.get("/:id", validateProjectId, (req, res) => {
    res.json(req.project)
})

//* POST /api/projects
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

//* PUT /api/projects/:id
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

//* DELETE /api/projects/:id
router.delete("/:id", validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id) 
        .then(() => {
            res.json(req.project)
        })
        .catch(next)
})

//* GET /api/projects/:id/actions

module.exports = router 