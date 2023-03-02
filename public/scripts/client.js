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

$("#tweetForm").on("submit", function(event) {
  event.preventDefault();
  $.ajax("/tweets", {
    method: "POST",
    data: $(this).serialize()
  })
  console.log(event);
})

const createTweetElement = function(tweet) {
  let $tweet = $("<article>").addClass("tweet");
  const html = `
    <header>
      <img class="tweet--avatar" src="${tweet.user.avatars}"> 
      <h2>${tweet.user.name}</h2>
      <small>${tweet.user.handle}</small>
    </header>
    <div>
      <p>${tweet.content.text}</p>
    </div>
    <hr />
    <footer>
      <h2>10 days ago</h2>
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

// const renderTweets = $("#tweets-container").html("") 
//   for (let tweet of tweetsData) {
//     let tweetElement = createTweetElement(tweet)
//     tweetsContainer.prepend(tweetElement)
//   }