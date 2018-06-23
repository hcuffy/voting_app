$(document).ready(function() {
	//Take user to edit poll page. in order to edit a poll.
	$('.edit_btn').click(function singlePoll() {
		var id = location.pathname.split('/')[3];
		$.ajax({
			url: '/polls/newpoll/',
			type: 'GET',
			success: function(result) {
				document.location.href = '/polls/singlepoll/' + id;
			},
			error: function() {
				alert('Cannot find poll. Something went wrong');
			}
		});
	});
	// When the additional option button is clicked, add a new option text field to the list.
	$('.choice_btn').click(function() {
		var newOptionNum = $('.poll-option').length + 1;
		var newName = 'option' + newOptionNum;
		$('#options').append(
			'<input class="poll-option" type="text" placeholder="Additional Option" name="' +
				newName +
				'" />'
		);

		$('#options').off('input', 'input.poll-option', handleInputChange);
		$('#options').on('input', 'input.poll-option', handleInputChange);
	});

	//Make the submit button on the new poll creation page active only after the fields have been filled.
	function handleInputChange(e) {
		if (e.target.value) {
			$('#submit_btn').prop('disabled', false);
		} else {
			$('#submit_btn').prop('disabled', true);
		}
	}

	$('#options').on('input', 'input.poll-option', handleInputChange);

	$('#submit_btn').prop('disabled', true);

	$('#vote_btn').prop('disabled', true);

	$('input[type="radio"]').on('change', function() {
		$('#vote_btn').prop('disabled', false);
	});
});

// Give users to delete a poll.
$('.delete_btn').click(function() {
	var id = this.id;
	$.ajax({
		url: '/polls/deletepoll/' + id,
		type: 'DELETE',
		success: function(result) {
			alert('Item Deleted');
			window.location.reload();
		},
		error: function() {
			alert('The item cannot be deleted at this time.');
		}
	});
});

// Copy URL to clipboard in-order for users to share a specific poll.
$('.share_btn').click(function() {
	var urlText = document.createElement('textarea');
	urlText.style.background = 'transparent';
	urlText.value = location.href;
	document.body.appendChild(urlText);
	urlText.select();
	document.execCommand('copy');
	document.body.removeChild(urlText);
	alert('The poll link was successfully copied!');
});
