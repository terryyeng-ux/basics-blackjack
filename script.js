var makeDeck = function () {
  // Initialise an empty deck array
  var deck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      deck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter = rankCounter + 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex = suitIndex + 1;
  }

  // Return the completed card deck
  return deck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cards) {
  // Loop over the card deck array once
  var index = 0;
  while (index < cards.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    var currentItem = cards[index];
    // Select the card that corresponds to currentIndex
    var randomItem = cards[randomIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    // Increment currentIndex
    index = index + 1;
  }
  // Return the shuffled deck
  return cards;
};

// deck is shuffled
var deck = shuffleCards(makeDeck());
console.log(deck);

// max sum = 21
var totalSumLimit = 21;

// dealer has to hit unless 17 and above
var dealerHit = 16;

var playerHand = [];
var computerHand = [];

var dealCards = function (hand) {
  hand.push(deck.pop());
};

var GAME_MODE_FIRST_CARDS = "GAME_MODE_FIRST_CARDS";
var GAME_MODE_HIT_STAND = "GAME_MODE_HIT_STAND";

var gameMode = GAME_MODE_FIRST_CARDS;

var checkBlackjack = function (playerHand, computerHand) {
  if (playerHand[0].rank == 1 && playerHand[1].rank > 9) {
    return "player wins";
  }
  if (playerHand[0].rank > 9 && playerHand[1].rank == 1) {
    return "player wins";
  }
  if (computerHand[0].rank == 1 && computerHand[1].rank > 9) {
    return "computer wins";
  }
  if (computerHand[0].rank > 9 && computerHand[1].rank == 1) {
    return "computer wins";
  } else {
    return "Continue Game";
  }
};

var checkWinner = function (playerHand, computerHand) {
  var sumOfPlayerCards = playerHand["rank"].reduce(function (a, b) {
    return a + b;
  }, 0);
  var sumofComputerCards = computerHand["rank"].reduce(function (a, b) {
    return a + b;
  });
  if (sumOfPlayerCards > sumofComputerCards && sumOfPlayerCards < 22) {
    return "Player wins!";
  } else {
    return "Computer wins!";
  }
};

var main = function (input) {
  var myOutputValue;

  // user clicks submit to deal cards
  if (gameMode == GAME_MODE_FIRST_CARDS) {
    dealCards(playerHand);
    dealCards(computerHand);

    dealCards(playerHand);
    dealCards(computerHand);

    var checkHand = checkBlackjack(playerHand, computerHand);

    if (checkHand == "player wins") {
      return "Player wins!";
    }
    if (checkHand == "computer wins") {
      return "Computer wins!";
    }
    if (checkHand == "Continue Game") {
      // if no one got blackjack, change to hit stand for player to choose
      gameMode = GAME_MODE_HIT_STAND;
    }

    console.log(playerHand);
    console.log(computerHand);
    console.log(gameMode);

    myOutputValue =
      "You have drawn " +
      playerHand[0].name +
      " of " +
      playerHand[0].suit +
      " for your 1st card and " +
      playerHand[1].name +
      " of " +
      playerHand[1].suit +
      " for your 2nd card! Type hit or stand!";
  } else if (gameMode == GAME_MODE_HIT_STAND) {
    // user decides whether to hit or stand, using the submit button to submit their choices
    if (input == "hit") {
      dealCards(playerHand);
      console.log(playerHand);
      myOutputValue =
        "You have drawn " +
        playerHand[0].name +
        " of " +
        playerHand[0].suit +
        " for your 1st card and " +
        playerHand[1].name +
        " of " +
        playerHand[1].suit +
        " for your 2nd card! And " +
        playerHand[2].name +
        " of " +
        playerHand[2].suit +
        " for your 3rd card";
    } else if (input == "stand") {
      console.log(playerHand);
      console.log(computerHand);
      checkWinner(playerHand, computerHand);
      console.log(checkWinner);
      // call in function to check who is the winner, dealer or player
    }
  }

  return myOutputValue;
};

// the cards are analysed for game winning conditions, e.g. blackjack or two aces

// cards are displayed to user

// user's cards are analysed for winning or losing conditions (21 or less - win) / (more than 21 - lose) [5,6,8] [10,9]

// computer decides to hit or stand based on rules (if less than 17, need to hit)

// game ends or continues
