const cards = [
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
];

const memoryGame = new MemoryGame(cards);

memoryGame.shuffleCards();

window.addEventListener("load", (event) => {
  let html = "";
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector("#memory-board").innerHTML = html;

  // Bind the click event of each element to a function
  let turnedCards = [];
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.add("turned");
      turnedCards.push(card);
      if (turnedCards.length < 2) {
        return;
      }
      const card1Name = turnedCards[0].getAttribute("data-card-name");
      const card2Name = turnedCards[1].getAttribute("data-card-name");
      if (memoryGame.checkIfPair(card1Name, card2Name)) {
        turnedCards.forEach((card) => {
          card.classList.add("blocked");
        });
        turnedCards = [];
        memoryGame.pairsClicked = [];
        if (memoryGame.checkIfFinished()) {
          alert("You won!");
        }
      } else {
        setTimeout(() => {
          turnedCards.forEach((card) => {
            card.classList.remove("turned");
          });
          turnedCards = [];
          memoryGame.pairsClicked = [];
        }, 1000);
      }
      document.querySelector("#pairs-clicked").innerText =
        memoryGame.pairsClicked;
      document.querySelector("#pairs-guessed").innerText =
        memoryGame.pairsGuessed;
    });
  });
});
