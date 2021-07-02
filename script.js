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

var playerHand = [];
var computerHand = [];

var dealCards = function (hand) {
  hand.push(deck.pop());
};

var GAME_MODE_FIRST_CARDS = "GAME_MODE_FIRST_CARDS";
var GAME_MODE_HIT_STAND = "GAME_MODE_HIT_STAND";
var GAME_MODE_WINNER = "GAME_MODE_WINNER";

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
    return "continue game";
  }
};

var generateSumOfPlayerHand = function (playerHand) {
  // extract rank into new array and push it in.
  var counter = 0;
  var sumOfPlayerCards = 0;
  while (counter < playerHand.length) {
    if (playerHand[counter].rank > 10) {
      playerHand[counter].rank = 10;
    }
    sumOfPlayerCards = sumOfPlayerCards + playerHand[counter].rank;
    counter++;
  }
  return sumOfPlayerCards;
};

var generateSumOfComputerHand = function (computerHand) {
  // extract rank into new array and push it in.
  var counter = 0;
  var sumOfComputerCards = 0;
  while (counter < computerHand.length) {
    if (computerHand[counter].rank > 10) {
      computerHand[counter].rank = 10;
    }
    sumOfComputerCards = sumOfComputerCards + computerHand[counter].rank;
    counter++;
  }
  return sumOfComputerCards;
};

var checkDealerHands = function (computerHand) {
  var currentSum = generateSumOfComputerHand(computerHand);
  while (currentSum < 17) {
    dealCards(computerHand);
    console.log(computerHand);
    currentSum = generateSumOfComputerHand(computerHand);
    console.log(currentSum);
  }
  return currentSum;
};

var checkWinner = function (sumOfPlayerCards, sumOfComputerCards) {
  generateSumOfComputerHand(computerHand);
  generateSumOfPlayerHand(playerHand);
  if (sumOfPlayerCards > sumOfComputerCards && sumOfPlayerCards <= 21) {
    return "player win";
  }
  if (sumOfComputerCards > sumOfPlayerCards && sumOfComputerCards <= 21) {
    return "computer win";
  }
  if (sumOfComputerCards == sumOfPlayerCards) {
    return "draw";
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
    if (checkHand == "continue game") {
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
      if (generateSumOfPlayerHand(playerHand) < 21) {
        myOutputValue =
          "Your current sum of cards is " +
          generateSumOfPlayerHand(playerHand) +
          "! Type hit if you would like more cards! If not type stand!";
      } else {
        gameMode = GAME_MODE_WINNER;
        myOutputValue =
          "Your current sum of cards is " +
          generateSumOfPlayerHand(playerHand) +
          "! You bust!";
      }
    } else if (input == "stand") {
      gameMode = GAME_MODE_WINNER;
    }
  }

  if (gameMode == GAME_MODE_WINNER) {
    checkDealerHands(computerHand);
    var winner = checkWinner(
      generateSumOfPlayerHand(playerHand),
      generateSumOfComputerHand(computerHand)
    );
    if (winner == "player win") {
      myOutputValue = "Player wins!";
    } else if (winner == "computer win") {
      myOutputValue = "Computer wins!";
    } else if (winner == "draw") {
      myOutputValue = "Draw!";
    }
    return myOutputValue;
  }

  return myOutputValue;
};

// the cards are analysed for game winning conditions, e.g. blackjack or two aces

// cards are displayed to user

// user's cards are analysed for winning or losing conditions (21 or less - win) / (more than 21 - lose) [5,6,8] [10,9]

// computer decides to hit or stand based on rules (if less than 17, need to hit)

// game ends or continues
