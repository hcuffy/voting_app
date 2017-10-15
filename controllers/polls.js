exports.getMyPolls = (req, res) => {
  res.render('mypolls')
}

exports.getNewPollForm = (req, res) => {
  res.render('newpoll')
}

exports.getVotingForm = (req, res) => {
  const { title } = req.params
  res.render('takepoll', { title })
}
