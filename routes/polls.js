const express = require('express')
const router = express.Router()
const pollsController = require('../controllers/polls')

router.get('/mypolls', pollsController.getMyPolls)
router.get('/new', pollsController.getNewPollForm)
router.get('/vote/:title', pollsController.getVotingForm)

module.exports = router
