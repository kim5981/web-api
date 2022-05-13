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
    res.json(req.body.id)
})

//* POST /api/projects

module.exports = router 