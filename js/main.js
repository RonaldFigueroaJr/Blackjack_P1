// Const Variables
const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"];
const cardsVal = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    J: 10,
    Q: 10,
    A: [1, 11],
  };

const blackjackGame = {
    you: {
      scoreSpan: "#playerResult",
      div: "#your-box",
      boxSize: ".flex-blackjack-row-2 div",
      score: 0,
    },
  
    dealer: {
      scoreSpan: "#dealerResult",
      div: "#dealer-box",
      boxSize: ".flex-blackjack-row-2 div",
      score: 0,
    },
    wins: 0,
    losses: 0,
    draws: 0,
    isStand: false,
    isTurnsOver: false,
    pressOnce: false,
  };
const player = blackjackGame["you"];
const dealer = blackjackGame["dealer"];
let windowWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;

  
// Sounds
const hitSound = new Audio("sounds/swish.m4a");
const winSound = new Audio("sounds/cash.mp3");
const loseSound = new Audio("sounds/aww.mp3");
  

// EVENT LISTENERS 
  document.querySelector("#hitBtn").addEventListener("click", blackjackHit);
  document.querySelector("#standBtn").addEventListener("click", blackjackStand);
  document.querySelector("#dealBtn").addEventListener("click", blackjackDeal);
  document.querySelector("#resetBtn").addEventListener("click", blackjackRestart);

// FUNCTIONS
  
function blackjackHit() {
    if (blackjackGame["isStand"] === false) {
      let card = randomCard();
      showCard(card, player);
      updateScore(card, player);
      showScore(player);
    }
  }
  
function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return cards[randomIndex];
  }
  
function showCard(card, activePlayer) {
    if (activePlayer["score"] <= 21) {
      let cardImage = document.createElement("img");
      cardImage.src = `images/${card}.png`;
      cardImage.style = `width:${widthSize()}; height:${heightSize()};`;
      document.querySelector(activePlayer["div"]).appendChild(cardImage);
    }
  }
  
  
function updateScore(card, activePlayer) {
      if (card === "A") {
          if (activePlayer["score"] + cardsVal[card][1] <= 21) {
              activePlayer["score"] += cardsVal[card][1];
            } else {
                activePlayer["score"] += cardsVal[card][0];
            }
        } else {
            activePlayer["score"] += cardsVal[card];
        }
        
        console.log(activePlayer["score"]);
    }
    
function showScore(activePlayer) {

        if (activePlayer["score"] > 21) {
            document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
            document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
        } else {
            document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"];
        }
    }
    
function blackjackStand() {
        if (blackjackGame.pressOnce === false) {
            blackjackGame["isStand"] = true;
            let yourImages = document.querySelector("#your-box").querySelectorAll("img");
            
            for (let i = 0; i < yourImages.length; i++) {
                let card = randomCard();
                showCard(card, dealer);
                updateScore(card, dealer);
                showScore(dealer);
            }
            
            blackjackGame["isTurnsOver"] = true;
            
            computeWinner();
            showWinner(winner);
        }
        
        blackjackGame.pressOnce = true;
    }
    
function computeWinner() {
        if (player["score"] <= 21) {
            if (player["score"] > dealer["score"] || dealer["score"] > 21) {
                winner = player;
            } else if (player["score"] < dealer["score"]) {
                winner = dealer;
            } else if (player["score"] === dealer["score"]) {
                winner = "Draw";
            }
        } else if (player["score"] > 21 && dealer["score"] <= 21) {
            winner = dealer;
        } else if (player["score"] > 21 && dealer["score"] > 21) {
            winner = "dealer";
        }
        
        return winner;
    }
    
function showWinner(winner) {
        let message, messageColor;
        
        if (winner === player) {
            message = "You Won";
            messageColor = "#00e676";
            document.querySelector("#wins").textContent = blackjackGame["wins"] += 1;
            winSound.play();
        } else if (winner === dealer) {
            message = "You Lost";
            messageColor = "red";
            document.querySelector("#losses").textContent = blackjackGame["losses"] += 1;
            loseSound.play();
        } else if (winner === "Draw") {
            message = "You Drew";
            messageColor = "yellow";
            document.querySelector("#draws").textContent = blackjackGame["draws"] += 1;
            loseSound.play();
        } else if (winner === "None") {
            message = "You Both Busted!";
            messageColor = "orange";
            loseSound.play();
        }
        
        document.querySelector("#blackjack-result").textContent = message;
        document.querySelector("#blackjack-result").style.color = messageColor;
    }
    
function blackjackDeal() {
        if (blackjackGame["isTurnsOver"] === true) {

            let yourImages = document.querySelector("#your-box").querySelectorAll("img");
            let dealerImages = document.querySelector("#dealer-box").querySelectorAll("img");
            
            document.querySelector("#blackjack-result").style.color = "white";
            
            player["score"] = dealer["score"] = 0;
            document.querySelector("#playerResult").textContent = 0;
            document.querySelector("#dealerResult").textContent = 0;
            document.querySelector("#playerResult").style.color = "white";
            document.querySelector("#dealerResult").style.color = "white";
            document.querySelector("#blackjack-result").textContent = "Lets Play";
            
            for (let i = 0; i < yourImages.length; i++) {
                yourImages[i].remove();
                dealerImages[i].remove();
            }
            
            blackjackGame["isStand"] = false;
            blackjackGame.pressOnce = false;
            blackjackGame["isTurnsOver"] = false;
        }
    }
    
function blackjackRestart() {
        blackjackDeal();
        document.querySelector("#wins").textContent = 0;
        document.querySelector("#losses").textContent = 0;
        document.querySelector("#draws").textContent = 0;
        
        blackjackGame.wins = 0;
        blackjackGame.losses = 0;
        blackjackGame.draws = 0;
    }

function widthSize() {
        if (windowWidth > 1000) {
          let newWidthSize = window.screen.width * 0.1;
          return newWidthSize;
        } else {
          return window.screen.width * 0.15;
        }
      }
      
function heightSize() {
        if (windowHeight > 700) {
          let newHeightSize = window.screen.height * 0.18;
          return newHeightSize;
        } else {
          return window.screen.height * 0.15;
        }
      }