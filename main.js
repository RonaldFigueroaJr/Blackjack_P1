// Creating types and suits of cards
const suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];
const numb = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const cards = [];
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

// Event listeneners
msgUpdate.addEventListener('startGame')




function startGame() {
    let msgUpdate = document.getElementById('msgUpdate')
    let displaySetting = msgUpdate.style.display;
    if (displaySetting == 'block') {
        msgUpdate.style.display = 'none';
    }
}