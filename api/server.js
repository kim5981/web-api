const express = require("express")
const server = express()

const router = express.Router()

const projectsRouter = require("./projects/projects-router")
// const actionsRouter = require("./actions/actions-router")

server.use(express.json())

server.use("/api/projects", projectsRouter)
// server.use("/api/actions", actionsRouter)

server.get("/", (req, res) => {
    res.send("<h1>Sprint Challenge 4.1</h1>")
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status( err.status || 500).json({
        customMessage: "welp..",
        message: err.message,
        stack: err.stack
    })
})

module.exports = server;
