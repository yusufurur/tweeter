$(document).ready(function() {
  console.log("hello")

  $("#tweet-text").on ("keyup", function() {
    const inputLength = $(this).val().length
    const charsLeft = 140-inputLength
    console.log(charsLeft)
  $(".counter").text(charsLeft)
  if (charsLeft < 0) {
    $(".counter").addClass("invalid");
  } else {
    $(".counter").removeClass("invalid");
  }

  if (charsLeft < 0) {
    $(".counter").css("color", "red");
  } else {
    $(".counter").css("color", "inherit");
  }
});
});