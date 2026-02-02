const cardDetails = [
  {
    id: 1,
    name: "green-apple",
    emoji: "🍏",
  },
  {
    id: 2,
    name: "grape",
    emoji: "🍇",
  },
  {
    id: 3,
    name: "hamburger",
    emoji: "🍔",
  },
  {
    id: 4,
    name: "avocado",
    emoji: "🥑",
  },
  {
    id: 5,
    name: "pizza",
    emoji: "🍕",
  },
  {
    id: 6,
    name: "sushi",
    emoji: "🍣",
  },
  {
    id: 7,
    name: "sushi",
    emoji: "🍰",
  },
  {
    id: 8,
    name: "popcorn",
    emoji: "🍿",
  },
  {
    id: 9,
    name: "cherry",
    emoji: "🍒",
  },
  {
    id: 10,
    name: "donut",
    emoji: "🍩",
  },
];

const emojiArray = cardDetails.map((item) => item.emoji);
console.log(emojiArray);

const cardsContainer = document.querySelector(".cards-container");

let numberOfCards = 10;

function createCards(numberOfCards) {
  const gameEmojiArray = [];

  for (let i = 0; i < 2; i++) {
    for (let i = 0; i < numberOfCards / 2; i++) {
      gameEmojiArray.push(emojiArray[i]);
    }
  }

  console.log(gameEmojiArray);

  const shuffledGameEmojiArray = gameEmojiArray
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  console.log("game emoji array shuffled" + shuffledGameEmojiArray);

  for (let i = 0; i < shuffledGameEmojiArray.length; i++) {
    let newFlipCard = document.createElement("div");
    newFlipCard.classList.add("flip-card");
    let emojiSpan = document.createElement("span");
    emojiSpan.innerHTML = shuffledGameEmojiArray[i];
    emojiSpan.classList.add("emoji");
    newFlipCard.append(emojiSpan);

    cardsContainer.append(newFlipCard);

    newFlipCard.addEventListener("click", () => {
      newFlipCard.classList.toggle("flip");

      setTimeout(() => {
        newFlipCard.classList.toggle("flip-card-flipped");
        emojiSpan.classList.toggle("emoji-flipped");
      }, 300);
    });
  }
}

createCards(numberOfCards);
