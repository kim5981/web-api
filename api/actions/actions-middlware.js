const Actions = require("./actions-model")

async function validateActionId (req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if(!action) {
            next({ status: 404, message: [] })
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: "oops 😵"
        })
    }
}

module.exports = {
    validateActionId
}