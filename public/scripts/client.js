/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetsData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  let $tweet = $("<article>").addClass("tweet");
  const html = `
    <header>
      <img class="tweet--avatar" src="${tweet.user.avatars}"> 
      <h2>${tweet.user.name}</h2>
      <small>${tweet.user.handle}</small>
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
    console.log("clicked");
    console.log($("#tweet-text").val().length)
    const tweetArea = $("#tweet-text").val().length;
    if (tweetArea === 0) {
      alert("empty");
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
    let input = $("#tweet-text").val()
    if (validateUserInput(input)) {
      $.ajax("/tweets", {
        method: "POST",
        data: $(this).serialize()
      }).then(response => {
        loadTweets();
        $('#tweet-text').val(''); 
        }) 
    } 
    console.log(event);
  })
  loadTweets();

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});

const loadTweets = function() {
  $.get("/tweets/", function(newTweet) {
    console.log("hello", newTweet);
    renderTweets(newTweet.reverse());
  });
};

const renderTweets = function(tweetsData) {
  const tweetsContainer = $("#tweets-container").html("");
  for (let tweet of tweetsData) {
    let tweetElement = createTweetElement(tweet)
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

// const renderTweets = $("#tweets-container").html("") 
//   for (let tweet of tweetsData) {
//     let tweetElement = createTweetElement(tweet)
//     tweetsContainer.prepend(tweetElement)
//   }