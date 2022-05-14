const express = require("express")

const router = express.Router()

const {
    validateActionId,
} = require("./actions-middlware")

const Actions = require("./actions-model")

//* GET /api/actions
router.get("/", (req, res, next) => {
    Actions.get()
    .then(actions => {
        res.json(actions)
    })
    .catch(next)
})

//* GET /api/actions/:id

//* POST /api/actions

//* PUT /api/actions/:id

//* DELETE /api/actions/:id



module.exports = router