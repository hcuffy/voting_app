$(document).ready(function() {

  $('.edit_btn').click(function singlePoll() {
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
  })

  $('.choice_btn').click(function() {
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

  $('#chart_back').click(function backtoPoll() {
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
  })

  $('#vote_btn').prop('disabled', true);

  $('input[type="radio"]').on('change', function() {
    $('#vote_btn').prop('disabled', false);
  });
})

$('.delete_btn').click(function() {
  var id = this.id;
  $.ajax({
    url: '/polls/deletepoll/' + id,
    type: 'DELETE',
    success: function(result) {
      alert("Item Deleted");
      window.location.reload();
    },
    error: function() {
      alert("The item cannot be deleted at this time.");
    }
  });
})

$('.share_btn').click(function() {
  var urlText = document.createElement("textarea");
  urlText.style.background = 'transparent';
  urlText.value = location.href;
  document.body.appendChild(urlText);
  urlText.select();
  document.execCommand('copy');
  document.body.removeChild(urlText);
  alert("The poll link was successfully copied!");
})
