// Write your "projects" router here!
const express = require("express")
const Projects = require("./projects-model")

const router = express.Router()

//* GET /api/projects
router.get("/", (req, res) => {
    console.log("hello?")
})

module.exports = router 