// Creating types and suits of cards
const suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];
const cards = [];
let blackjackGame = {
    you : {
        scoreSpan : '#your-hand-result',
        div : '.playerHand',
        score: 0,
    },
    
    dealer: {
        scoreSpan: 'dealer-hand-result',
        div: '.dealerHand',
        score: 0,
    },
    
    'numb': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    
    numbMap : {
        2:2,
        3:3,
        4:4,
        5:5,
        6:6,
        7:7,
        8:8,
        9:9,
        10:10,
        J:10,
        Q:10,
        K:10,
        A:[1,11],
    },
    
    wins: 0,
    losses: 0,
    draws: 0,
    isStand: false,
    isTurnsOver: false,
    pressOnce: false,
};

let windowWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;

document.querySelector('#hitBtn').addEventListener("click", blackjackHit);

const PLAYER = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
// Variables for gameplay
const playerBalance = 5000;
const endGame = false;
const playerCards = []; // array to hold cards help by player
const dealerCards = []; // to hold cards held by dealer
const cardCount = 0; // to know which card we are at


// Elements
const pCards = document.getElementById('pCards');
const dCards = document.getElementById('dCards');
const playBtn = document.getElementById('playBtn')
const nmsgUpdate = document.getElementById('msgUpdate')
const pMoney = document.getElementById('pMoney')

// renders
pMoney.textContent = "$"+playerBalance.toFixed(2)

// // Event listeneners
// msgUpdate.addEventListener('startGame')




function startGame() {
    let msgUpdate = document.getElementById('msgUpdate')
    let displaySetting = msgUpdate.style.display;
    if (displaySetting == 'block') {
        msgUpdate.style.display = 'none';
    }
}

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, PLAYER);
    }
}

function randomCard() {
    let randomIdx = Math.floor(Math.random() * 13);
    return blackjackGame["numb"][randomIdx];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement("img")
        cardImage.src = `/css/card-deck-css/css/image.svg`;
        cardImage.style = `width : ${widthSize()}; height:${heightSize()};`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
    }
}

function widthSize() {
    if (windowWidth > 1000) {
        let newWidthSize = window.screen.width * 0.1;
        return newWidthSize;
    } else {
        return window.screen.width * 0.17;
    }
}

function heightSize() {
    if (windowHeight > 700) {
        let newHeightize = window.screen.Height * 0.17;
        return newHeightize;
    } else {
        return window.screen.height * 0.14;
    }
}