const express = require("express")

const {
    validateProject,
    validateProjectId
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
    res.json(req.id)
})

//* POST /api/projects
router.post("/", validateProject, (req, res, next) => {
    Projects.insert({
         name: req.body.name, 
         description: req.body.description 
        })
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

//* PUT /api/projects/:id
router.put("/:id", validateProject, validateProjectId, (req, res, next) => {
    Projects.update(req.params.id, { project: req.project })
        .then(updatedProject => {
            res.json(updatedProject)
        })
        .catch(next)
})

module.exports = router 