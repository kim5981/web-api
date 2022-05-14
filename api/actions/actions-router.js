const express = require("express")

const router = express.Router()

const {
    validateActionId,
    validateAction,
    validateCompleted
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


router.put("/:id",
 validateAction, 
 validateActionId, 
 validateCompleted, 
 (req, res, next) => {
  Actions.update(req.params.id, { 
    notes: req.body.notes, 
    description: req.body.description,
    completed: req.body.completed,
    project_id: req.body.project_id
   })
  .then(updatedAction => {
      res.json(updatedAction)
  })
  .catch(next)  
})


router.delete("/:id", validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
    .then(() => {
        res.json(req.action)
    })
    .catch(next)
})


module.exports = router