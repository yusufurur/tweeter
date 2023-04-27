$(document).ready(function() {

  $("#tweet-text").on ("input", function() {
    const inputLength = $(this).val().length
    const charsLeft = 140-inputLength
  $(".counter").text(charsLeft)
  if (charsLeft < 0) {
    $(".counter").addClass("error");
  } else {
    $(".counter").removeClass("error");
  }
});
});