/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  let $tweet = $("<article>").addClass("tweet");
  const html = `
    <header>
      <div class="avatar-username">
        <img class="tweet--avatar" src="${tweet.user.avatars}"> 
         <h2>${tweet.user.name}</h2>
      </div>
      <p>
      <small>${tweet.user.handle}</small>
      </p>
    </header>
    <div>
      <p>${escape(tweet.content.text)}</p>
    </div>
    <hr />
    <footer>
    ${timeago.format(tweet.created_at)}
      <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
      </div>
    </footer>`;
  const tweetElement = $tweet.append(html); 
  return tweetElement;
};

$(document).ready(function() {
  $("#tweetForm").on("submit", function(event) {
    event.preventDefault();
    const tweetArea = $("#tweet-text").val().length;
    if (tweetArea === 0) {
      $(".error").text("Tweet Area cannot be empty");
      $(".error").slideDown("slow")
      $(".error").delay(4000).slideUp("slow");

      return;
    }
    if (tweetArea > 140) {
      $(".error").text("Tweet cannot be more than 140 characters‼️");
      $(".error").slideDown("slow")
      $(".error").delay(4000).slideUp("slow");

      return;
    }
    const input = $("#tweet-text").val()
    if (validateUserInput(input)) {
      $.ajax("/tweets", {
        method: "POST",
        data: $(this).serialize()
      }).then(response => {
        loadTweets();
        $('#tweet-text').val(''); 
        $('.counter').text('140');
        }) 
    } 
  })
  loadTweets();


});

const loadTweets = function() {
  $.get("/tweets/", function(newTweet) {
    renderTweets(newTweet);
  });
};

const renderTweets = function(tweetsData) {
  const tweetsContainer = $("#tweets-container").html("");
  for (let tweet of tweetsData) {
    const tweetElement = createTweetElement(tweet)
    tweetsContainer.prepend(tweetElement)
  }
}

const validateUserInput = (input) => {
  if (input === "") {
    alert("Tweet field cannot be left blank");
    return false;
  } else if (input.length > 140) {
    alert("Tweet cannot be more than 140 characters.");
    return false;
  }

  return true;
};