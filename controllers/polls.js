const Poll = require('../models/poll')

exports.getMyPolls = (req, res, next) => {
  Poll.find({}, (err, polls) => {
    if (err) return next(err)
    res.render('mypolls', {
      polls
    })
  })
}

exports.getNewPollForm = (req, res, next) => {
  const {
    title
  } = req.params.question
  const {
    options
  } = req.params.option
  const newUserPoll = new Poll({
    title,
    options: [],
    user: ,
    voters: []
  })

  newUserPoll.save(err => {
    if (err) return next(err)
    res.render('newpoll')
  })
}

exports.getVotingForm = (req, res) => {
  const {
    title
  } = req.params
  res.render('takepoll', {
    title
  })
}
