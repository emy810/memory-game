async function getCards() {
  try {
    const response = await fetch("http://localhost:3000/cards");
    const cardDetails = await response.json();
    const emojiArray = cardDetails.map((item) => item.emoji);

    console.log(cardDetails, "card details");
    createCards(emojiArray, numberOfCards);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

let numberOfCards = 8;

let revealCount = 0;
let timer = 0;
let timerInterval = null;
let gameStarted = false;

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

const cardsContainer = document.querySelector(".cards-container");
const revealCountEl = document.getElementById("reveal-count");
const timerEl = document.getElementById("timer");
const gameBoard = document.getElementById("gameBoard");
const gameButton = document.getElementById("gameButton");




function createCard(emoji) {
  const card = document.createElement("div");
  card.classList.add("flip-card");

  const emojiSpan = document.createElement("span");
  emojiSpan.innerHTML = emoji;
  emojiSpan.classList.add("emoji");

  card.append(emojiSpan);

  return { card, emojiSpan };
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);
}

function handleCardClick(card) {
  if (lockBoard) return;
  if (card.classList.contains("matched")) return;
  if (card === firstCard) return;

  if (!gameStarted) {
    gameStarted = true;
    startTimer();
  }

  if (!card.classList.contains("flip-card-flipped")) {
    revealCount++;
    revealCountEl.textContent = revealCount;
  }

  openCard(card);

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  setTimeout(checkMatch, 600);
}

function createCards(emojiArray, numberOfCards) {
  const gameEmojiArray = [];

  for (let round = 0; round < 2; round++) {
    for (let idx = 0; idx < numberOfCards / 2; idx++) {
      gameEmojiArray.push(emojiArray[idx]);
    }
  }

  const shuffledGameEmojiArray = gameEmojiArray
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  for (let i = 0; i < shuffledGameEmojiArray.length; i++) {
    const { card, emojiSpan } = createCard(shuffledGameEmojiArray[i]);
    cardsContainer.append(card);
    card.addEventListener("click", () => handleCardClick(card, emojiSpan));
  }
}

function openCard(card) {
  card.classList.add("flip", "flip-card-flipped");
  card.querySelector(".emoji").classList.add("emoji-flipped");
}

function closeCard(card) {
  card.classList.remove("flip", "flip-card-flipped");
  card.querySelector(".emoji").classList.remove("emoji-flipped");
}

function checkMatch() {
  const firstEmoji = firstCard.querySelector(".emoji").textContent;
  const secondEmoji = secondCard.querySelector(".emoji").textContent;

  if (firstEmoji === secondEmoji) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedPairs++;

    if (matchedPairs === numberOfCards / 2) {
      clearInterval(timerInterval);
      gameButton.textContent = "Restart the game";
      checkWin ();
    }

    resetTurn();
  } else {
    setTimeout(() => {
      closeCard(firstCard);
      closeCard(secondCard);
      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkWin() {
if (matchedPairs === numberOfCards/2) {
  alert("You Win");
 }
}

function resetGame() {
  timer = 0;
  revealCount = 0;
  matchedPairs = 0;
  gameStarted = false;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  clearInterval(timerInterval);
  timerEl.textContent = "0:00";
  revealCountEl.textContent = "0";

  cardsContainer.innerHTML = "";
  getCards();

  gameButton.textContent = "Reset the game";
}

gameButton.addEventListener("click", () => {
      resetGame ();
} );
getCards();
