const express = require('express')
const router = express.Router()
const pollsController = require('../controllers/polls')

router.get('/mypolls', pollsController.getMyPolls)
router.get('/newpoll', pollsController.getNewPollForm)
router.get('/vote/:id', pollsController.getVotingForm)
router.post("/newpoll", pollsController.addNewPoll)
router.post("/takepoll/:id", pollsController.updatePoll)
router.delete('/deletepoll/:id', pollsController.deletePoll)
router.post('/editpoll/:id', pollsController.editPoll)
router.get('/singlepoll/:id', pollsController.getSinglePoll)

module.exports = router
