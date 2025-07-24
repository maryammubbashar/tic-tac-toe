let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newBtn = document.querySelector(".newGame");
let overlay = document.querySelector(".overlay");
let announcement = document.querySelector(".announcement");
let count = 0;
let turnO = true;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
//when boxes are clicked
function clicked() {
  if (turnO) {
    this.innerText = "O";
    this.style.color = "#F8B259";
    turnO = false;
  } else {
    this.innerText = "X";
    this.style.color = "#8ABB6C";
    turnO = true;
  }
  this.disabled = true;
  count++;
  checkWinner();
}
//To announce winner
function winnerAnnounce(pos1) {
  announcement.innerText = `🎉 Congratulations! Winner is ${pos1} 🎉`;
  overlay.classList.remove("hide");
  newBtn.classList.remove("hide2");
}
//disable boxes when all three consecutive boxes are same
function disableBoxes() {
  boxes.forEach((box) => {
    box.disabled = true;
  });
}
boxes.forEach((box) => {
  box.addEventListener("click", clicked);
});

//Function to check winner
function checkWinner() {
  for (let i = 0; i < winningPatterns.length; i++) {
    let pattern = winningPatterns[i];
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        winnerAnnounce(pos1);
        disableBoxes();
      }
    }
  }
  if (count === 9) {
    announcement.innerText = "😐 It's a draw!";
    overlay.classList.remove("hide");
    newBtn.classList.remove("hide2");
  }
}
//To enable boxes for new game
function enableBoxes() {
  for (let i = 0; i < 9; i++) {
    boxes[i].disabled = false;
    boxes[i].innerText = "";
  }
  count = 0;
}
//when reset is clicked
function resetGame() {
  enableBoxes();
}
resetBtn.addEventListener("click", resetGame);

//When new game is clicked
function newGame() {
  enableBoxes();
  overlay.classList.add("hide");
  newBtn.classList.add("hide2");
}
newBtn.addEventListener("click", newGame);
