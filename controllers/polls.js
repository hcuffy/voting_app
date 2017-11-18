const Poll = require('../models/poll')
const Chart = require('chart.js')
exports.getMyPolls = (req, res, next) => {
  Poll.find({}, (err, polls) => {
    if (err)
      return next(err)
    res.render('mypolls', {polls})
  })

}

exports.addNewPoll = (req, res, next) => {
  const { title, option} = req.body
  const options = {}
for (let key in option) {
  options[option[key]] = 0;
}
  const newUserPoll = new Poll({title, options, user: 'Unknown User', voters: []})
  newUserPoll.save(err => {
    if (err)
      return next(err)
  })
  const id = newUserPoll._id;
  res.render('takepoll', { title, options, id })
}

exports.getNewPollForm = (req, res, next) => {
  res.render('newpoll')
}

exports.getIndex = (req, res, next) => {
  res.render('index')
}

exports.getVotingForm = (req, res, next) => {
  const { id } = req.params
  Poll.findById(req.params.id, function(err, poll) {
    if (err) return (err);
    const { title, options } = poll
    res.render('takepoll', { title, options, id })
  })
}

exports.updatePoll = (req, res, next) => {
  const { choice } = req.body;
  const { id } = req.params

  Poll.findByIdAndUpdate(id, { $inc: { [`options.${choice}`]: 1 } }, { new: true }, function(err, data) {
    if (err) {
      console.log('Database Error', err)
      return next(err)
    }
    res.send(data)
  });
}

exports.deletePoll = (req, res, next) => {
  const test = req.param;
   res.end('success');
   Poll.findByIdAndRemove(req.params.id, (err, poll) => {
      if (err) return (err);
      res.end('success');
   });
}

exports.getSinglePoll = (req, res, next) => {
  const { id } = req.params
  Poll.findById(req.params.id, function(err, poll) {
    if (err) return (err);
    const { title, options } = poll
    res.render('editpoll', { title, options, id })
  })
}

exports.editPoll = (req, res, next) => {
  let {new_option} = req.body;
  const id = req.params.id;

      if (typeof new_option !== 'object'){
         new_option = {new_option};
      }

      for (var key in new_option) {
          var value = new_option[key];

          Poll.findByIdAndUpdate(id, { $set: { [`options.${value}`] : 0 }}, { new: true },function(err, poll) {
            if (err) {
               console.log('Database Error', err)
               return next(err)
            }
          });
      }

      Poll.findById(id, function(err, poll) {
        if (err) return (err);
        const { title, options } = poll
        res.render('takepoll', { title, options, id })
      })

}
////
exports.getChart = (req, res, next) => {

let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Red", "Blue"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
  res.render('chart',myChart)
}
