$(document).ready(function() {

  function singlePoll() {
    var id = location.pathname.split('/')[3]
    $.ajax({
      url: '/polls/singlepoll/' + id,
      type: 'GET',
      success: function(result) {
        document.location.href = '/polls/singlepoll/' + id;
      },
      error: function() {
        alert('Cannot find poll. Something went wrong');
      }
    });
  }

  $('.edit_btn').click(singlePoll)

  $('.choice_btn').click(function(e) {
    $("#options").append('<input class="newOption" type="text" placeholder="Additional Option" name="new_option">')
  });

  $('#options').on('input', 'input.newOption', function(e) {
    if (e.target.value.trim() === '') {
      $('#submit_btn').prop('disabled', true);
    } else {
      $('#submit_btn').prop('disabled', false);
    }
  })

  $('#submit_btn').prop('disabled', true);

  function backtoPoll() {
    var id = location.pathname.split('/')[3]
    $.ajax({
      url: '/polls/takepoll/' + id,
      type: 'POST',
      success: function(result) {
        document.location.href = '/polls/vote/' + id;
      },
      error: function() {
        alert("Cannot find poll. Something went wrong");
      }
    });
  }

  $('#chart_back').click(backtoPoll)

  $('#vote_btn').prop('disabled', true);

  $('input[type="radio"]').on('change', function() {
    $('#vote_btn').prop('disabled', false);
  });
})
