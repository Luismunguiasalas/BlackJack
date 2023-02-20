
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
 * returns random number between 1-21 inclusive. 
 */
function getRandomCard() {
  return Math.floor(Math.random() * (11 - 1 + 1) + 1)
}

function sum(cards) {
  total = 0
  for (let i = 0; i < cards.length; i++) {
    total += cards[i]
  }
  return total
}

function printCards(cards) {
  str = ''
  for (let i = 0; i < cards.length; i++) {
    str += cards[i] + ' '
  }
  return str
}

function renderGame() {
  sumCards = sum(cards);
  console.log(sumCards + 'inside here')

  if (sumCards === 0) {
    messageEl.textContent = "Lets play! Draw a card";
  } else if (sumCards < 21) {
    messageEl.textContent = 'Do you want to  draw a new card?';
  } else if (sumCards === 21) {
    messageEl.textContent = 'You Won!';
    btnNewCardEl.disabled = true;
  } else if (sumCards > 21) {
    messageEl.textContent = "You're out of the game";
    btnNewCardEl.disabled = true;
  }
  cardsEl.textContent = 'Cards: ' + printCards(cards);
  sumEl.textContent = 'Sum: ' + sumCards;
}



btnNewCardEl.onclick = () => {
  if (messageEl.textContent === "You're out of the game") {
    messageEl.textContent = 'Start a new game'
    // btnNewCardEl.disabled = true;
  } else {
    number = getRandomCard();
    cards.push(number);
    renderGame();
  }
}

btnHoldEl.onclick = () => {
  btnStartEl.disabled = true;
  btnNewCardEl.disabled = true;
  renderOpponentGame();
  btnStartEl.disabled = false;
  btnNewCardEl.disabled = false;
}

function renderOpponentGame() {
  opponentSum = sum(opponentCards);
  yourSum = sum(cards);
  while (opponentSum < 22) {
    opponentCardsEl.textContent = 'Opponent Cards: ' + printCards(opponentCards);

    opponentSumEl.textContent = 'Opponent Sum: ' + opponentSum;

    if (Math.abs(21 - opponentSum) < Math.abs(21 - yourSum)) {
      messageEl.textContent = "The Opponent Wins!, You Lose!";
      return
    } else if (opponentSum == 21 && yourSum === 21) {
      messageEl.textContent = "Its a Tie!!! OMG 😱 This is unheard of!"
      return
    }

    number = getRandomCard();
    opponentCards.push(number);
    opponentSum = sum(opponentCards);
  }
  messageEl.textContent = "You Win! The Opponent Loses!"
  return
}



btnStartEl.onclick = () => {
  if (btnNewCardEl.disabled === true) {
    btnNewCardEl.disabled = false;
  }

  messageEl.textContent = "Lets play! Draw a new card";
  cards = [];
  renderGame();
}

const func = () => {

}