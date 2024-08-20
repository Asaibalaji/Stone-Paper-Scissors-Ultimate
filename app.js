let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const startGameBtn = document.querySelector("#start-game");
const resetGameBtn = document.querySelector("#reset-game");
const exitGameBtn = document.querySelector("#exit-game");
const userNameInput = document.querySelector("#user-name");
const displayedUserName = document.querySelector("#displayed-user-name");

const userChoiceDisplay = document.querySelector("#user-choice");
const compChoiceDisplay = document.querySelector("#comp-choice");

startGameBtn.addEventListener("click", () => {
  const userName = userNameInput.value.trim();
  if (userName === "") {
    alert("Please enter your name before starting the game.");
    return;
  }
  displayedUserName.innerText = userName;
  userNameInput.value = "";
  userNameInput.disabled = true;
  startGameBtn.disabled = true;
});

resetGameBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Game reset. Play your move.";
  msg.style.backgroundColor = "#081b31";
  userChoiceDisplay.innerText = "";
  compChoiceDisplay.innerText = "";
});

exitGameBtn.addEventListener("click", () => {
  const exitConfirmation = confirm("Do you want to exit?");
  if (exitConfirmation) {
    let exitMessage = "You're leaving the game. ";
    if (userScore > compScore) {
      exitMessage += `You're in the lead by ${userScore - compScore} points and you won!`;
    } else if (userScore < compScore) {
      exitMessage += `You're trailing by ${compScore - userScore} points and you lost.`;
    } else {
      exitMessage += "The game is a draw!";
    }
    alert(exitMessage);
    window.open("", "_self").close();
  }
});

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `${displayedUserName.innerText} wins! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `${displayedUserName.innerText} lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }

  userChoiceDisplay.innerText = userChoice;
  compChoiceDisplay.innerText = compChoice;
};

const playGame = (userChoice) => {
  const userName = displayedUserName.innerText;
  if (userName === "") {
    alert("Please enter your name before entering the game.");
    return;
  }

  // Generate computer choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    // Draw Game
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      // scissors, paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      // rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      // rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});