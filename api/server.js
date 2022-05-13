const express = require('express');
const {
    validateProject
} = require("./projects/projects-middleware");

const server = express();
const router = express.Router()


// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js

const projectsRouter = require("./projects/projects-router");

server.use(express.json()) //allows parsing

server.use("/api/projects", projectsRouter)

server.get("/", (req, res) => {
    res.send("<h1>Sprint Challenge 4.1</h1>")
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: "welp..",
        message: err.message,
        stack: err.stack
    })
})

module.exports = server;
