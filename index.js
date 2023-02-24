
let cards = [];
let opponentCards = []
let messageEl = document.getElementById('message-el');
let sumEl = document.getElementById('sum-el');
let cardsEl = document.getElementById('cards-el');

let opponentSumEl = document.getElementById('opponent-sum-el');
let opponentCardsEl = document.getElementById('opponent-cards-el');

const btnStartEl = document.getElementById('btn-start');
const btnNewCardEl = document.getElementById('btn-new-card');
const btnHoldEl = document.getElementById('btn-hold');

/**
 * 
 * @returns random integer between 1-11 inclusive
 */
function getRandomCard() {
  return Math.floor(Math.random() * (11 - 1 + 1) + 1)
}

/**
 * 
 * @param {Array} cards 
 * @returns sum of integers within cards array
 */
function sum(cards) {
  total = 0
  for (let i = 0; i < cards.length; i++) {
    total += cards[i]
  }
  return total
}

/**
 * 
 * @param {Array} cards 
 * @returns string concatenation of all integers within cards array
 */
function printCards(cards) {
  str = ''
  for (let i = 0; i < cards.length; i++) {
    str += cards[i] + ' '
  }
  return str
}


/**
 * renders the blackjack game everytime the "start game" or "Draw card" buttons are clicked
 */
function renderGame() {
  sumCards = sum(cards);
  console.log(sumCards + 'inside here')

  if (sumCards === 0) {
    messageEl.textContent = "Lets play! Draw a card";
  } else if (sumCards < 21) {
    messageEl.textContent = 'Do you want to draw a new card?';
  } else if (sumCards === 21) {
    messageEl.textContent = 'You Won!';
    btnNewCardEl.disabled = true;
    btnHoldEl.disabled = true;
  } else if (sumCards > 21) {
    messageEl.textContent = "You're out of the game";
    btnNewCardEl.disabled = true;
    btnHoldEl.disabled = true;
  }
  cardsEl.textContent = 'Cards: ' + printCards(cards);
  sumEl.textContent = 'Sum: ' + sumCards;
}

/**
 * 
 * @returns renders the opponents blackjack game once the "hold" button is clicked
 */
function renderOpponentGame() {
  opponentSum = sum(opponentCards);
  yourSum = sum(cards);

  while (opponentSum < 22) {
    // update the text within oppoenent elements
    opponentCardsEl.textContent = 'Opponent Cards: ' + printCards(opponentCards);
    opponentSumEl.textContent = 'Opponent Sum: ' + opponentSum;

    if (Math.abs(21 - opponentSum) < Math.abs(21 - yourSum)) {
      messageEl.textContent = "The Opponent Wins!, You Lose!";
      return
    } else if (opponentSum == 21 && yourSum === 21) {
      messageEl.textContent = "Its a Tie!!! OMG 😱 This is unheard of!"
      return
    }

    // increment opponentSum by invoking the getRandomCard()
    number = getRandomCard();
    opponentCards.push(number);
    opponentSum = sum(opponentCards);
  }
  if (opponentSum > 21) {
    messageEl.textContent = "You Win! The Opponent Loses!"
    opponentCardsEl.textContent = 'Opponent Cards: ' + printCards(opponentCards);
    opponentSumEl.textContent = 'Opponent Sum: ' + opponentSum;
  }
}

/**
 * event handler for the "draw card" button
 * will invoke the getRandomCard() function and append to cards array
 */
btnNewCardEl.onclick = () => {
  number = getRandomCard();
  cards.push(number);
  renderGame();
}

/**
 * event handler for the "hold" button
 * will invoke the renderOpponentGame()
 */
btnHoldEl.onclick = () => {
  btnStartEl.disabled = true;
  btnNewCardEl.disabled = true;
  btnHoldEl.disabled = true;
  renderOpponentGame();
  btnStartEl.disabled = false;
  // btnNewCardEl.disabled = false;
}

/**
 * envent hanlder for the "start game" button
 * will invoke the renderGame() function
 */
btnStartEl.onclick = () => {
  // re-enable previously disabled buttons
  if (btnNewCardEl.disabled === true) {
    btnNewCardEl.disabled = false;
  }
  if (btnHoldEl.disabled === true) {
    btnHoldEl.disabled = false;
  }

  messageEl.textContent = "Lets play! Draw a new card";
  opponentCardsEl.textContent = "Opponents Cards:"
  opponentSumEl.textContent = "Opponents Sum:" // will reset info
  cards = [];
  opponentCards = [];

  renderGame();
}