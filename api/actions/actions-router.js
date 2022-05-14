const express = require("express")

const router = express.Router()

const {
    validateActionId,
    validateAction
} = require("./actions-middlware")

const Actions = require("./actions-model")

router.get("/", (req, res, next) => {
    Actions.get()
    .then(actions => {
        res.json(actions)
    })
    .catch(next)
})

router.get("/:id", validateActionId, (req, res) => {
    res.json(req.action)
})

//* POST /api/actions

router.post("/", validateAction, (req, res, next) => {
    Actions.insert({
        notes: req.body.notes, 
        description: req.body.description,
        completed: req.body.completed,
        project_id: req.body.project_id
    })
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(next)
})

//* PUT /api/actions/:id

//* DELETE /api/actions/:id



module.exports = router