const Poll = require('../models/poll');

// Get all polls from DB
exports.getMyPolls = (req, res, next) => {
	Poll.find({}, (err, polls) => {
		if (err) return next(err);

		res.render('mypolls', { polls });
	});
};
// Create new poll
exports.addNewPoll = (req, res, next) => {
	const { title, ...allOptions } = req.body;
	const options = {};
	for (let key in allOptions) {
		options[allOptions[key]] = 0;
	}
	const newUserPoll = new Poll({
		title,
		options,
		user: 'Unknown User',
		voters: []
	});
	newUserPoll.save(err => {
		if (err) return next(err);
	});
	const id = newUserPoll._id;
	let fresh_made = true;
	res.render('takepoll', { title, options, id, fresh_made });
};

exports.getNewPollForm = (req, res, next) => {
	res.render('newpoll');
};

exports.getIndex = (req, res, next) => {
	res.render('index');
};
// Display the poll to be taken.
exports.getVotingForm = (req, res, next) => {
	const { id } = req.params;
	Poll.findById(req.params.id, function(err, poll) {
		if (err) return err;
		const { title, options } = poll;
		let fresh_made = false;
		res.render('takepoll', { title, options, id, fresh_made });
	});
};

// Update a polls votes in the DB and display the chart after the user has voted.
exports.updatePoll = (req, res, next) => {
	const { choice } = req.body;
	const { id } = req.params;

	Poll.findByIdAndUpdate(
		id,
		{
			$inc: {
				[`options.${choice}`]: 1
			}
		},
		{
			new: true
		},
		function(err, poll) {
			if (err) {
				console.log('Database Error', err);
				return next(err);
			}
			const { title, options } = poll;
			let options_label = [],
				options_vote = [];

			for (var key in options) {
				options_label.push(key);
				options_vote.push(options[key]);
			}

			var type = 'bar';
			var data = {
				labels: options_label,
				datasets: [
					{
						label: title,
						data: options_vote,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)'
						],
						borderColor: [
							'rgba(255,99,132,1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)'
						],
						borderWidth: 3
					}
				]
			};
			var chart_options = {
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: false
							}
						}
					]
				}
			};
			res.render('chart', { type, data, chart_options, id });
		}
	);
};
// Delete a poll. Only logged in users can do this.
exports.deletePoll = (req, res, next) => {
	const test = req.param;
	res.end('success');
	Poll.findByIdAndRemove(req.params.id, (err, poll) => {
		if (err) return err;
		res.end('success');
	});
};
// Get a poll to be edited.
exports.getSinglePoll = (req, res, next) => {
	const { id } = req.params;
	Poll.findById(req.params.id, function(err, poll) {
		if (err) return err;
		const { title, options } = poll;
		res.render('editpoll', { title, options, id });
	});
};
// Edit poll after user has made changes.
exports.editPoll = (req, res, next) => {
	let { new_option } = req.body;
	const id = req.params.id;

	if (typeof new_option !== 'object') {
		new_option = {
			new_option
		};
	}

	for (var key in new_option) {
		var value = new_option[key];

		Poll.findByIdAndUpdate(
			id,
			{
				$set: {
					[`options.${value}`]: 0
				}
			},
			{
				new: true
			},
			function(err, poll) {
				if (err) {
					console.log('Database Error', err);
					return next(err);
				}
			}
		);
	}

	Poll.findById(id, function(err, poll) {
		if (err) return err;
		const { title, options } = poll;
		let fresh_made = false;
		res.render('takepoll', { title, options, id, fresh_made });
	});
};

exports.getSignUpForm = (req, res, next) => {
	res.render('signup');
};

exports.getLogin = (req, res, next) => {
	res.render('login');
};
