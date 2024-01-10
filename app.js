//HTML ELEMENTS
const welcome = document.querySelector(".welcome");
const loginInput = document.querySelector(".login-input");
const pinInput = document.querySelector(".pin-input");
const loginBtn = document.querySelector(".login-btn");
const playerScoreDiv = document.querySelector(".player-score");
const computerScoreDiv = document.querySelector(".computer-score");
const namePlayerTitle = document.querySelector(".name-player");
const optionsForPlayer = document.querySelectorAll(".option-player-thing");
const RestartBtn = document.querySelector(".restart-btn");
const historyPanel = document.querySelector(".history-panel");
const main = document.querySelector("main");
const optionPlayerDiv = document.querySelector(".options-player");
const optionsPlayerDivs = [
  ...document.querySelectorAll(".option-player-thing"),
];
const optionsForComputerDivs = document.querySelectorAll(
  ".option-computer-thing"
);
//OBJECTS OF PLAYER /FAKE PLAYERS

////Display last three Result of game WORK ON THIS

const account1 = {
  name: "Tylor Terrence",
  wins: 0,
  loss: 0,
  draws: 0,
  LastThreeRound: [],
  LastThreeResult: [],
  pin: 1111,
  arrDivsResult: [],
  computerChoices: [],
  maxLengthOfHistory: 3,
};
const account2 = {
  name: "Callista Sylas",
  wins: 0,
  loss: 0,
  draws: 0,
  LastThreeRound: [],
  LastThreeResult: [],
  pin: 2222,
  arrDivsResult: [],
  computerChoices: [],
  maxLengthOfHistory: 3,
};
const account3 = {
  name: "Salina Gregory",
  wins: 0,
  loss: 0,
  draws: 0,
  LastThreeRound: [],
  LastThreeResult: [],
  pin: 3333,
  arrDivsResult: [],
  computerChoices: [],
  maxLengthOfHistory: 3,
};

const accounts = [account1, account2, account3];
let activeUser;
const choices = ["paper", "rock", "scissors"];
//Set username : function set username to all players. This username allow to login to application

const setUserName = function (acc) {
  acc.forEach((obj) => {
    let name = obj.name.toLowerCase();
    obj.username = name.split(" ").reduce((acc, cur) => acc + cur[0], "");
    obj.firstName = obj.name.split(" ")[0];
  });
};
setUserName(accounts);

//Restart UI Option players and computer
const restartUiOption = function () {
  optionsPlayerDivs.forEach((div, i) => {
    optionsForComputerDivs[i].classList.remove("class_choice_computer");
    div.classList.remove("class_choice");
  });
};

//Display UI Message to active player
const displayBasicInfo = function (acc) {
  main.style.opacity = 100;
  welcome.textContent = `Welcome ${acc.firstName}`;
  namePlayerTitle.textContent = `${acc.firstName}`;
};

//Display result beetwen player a computer
const displayResult = function (acc) {
  playerScoreDiv.textContent = acc.wins;
  computerScoreDiv.textContent = acc.loss;
};

//Function which set class to winner and to loser // Correct this function
const checkWinnerClass = function (itemUser, resultUser) {
  if (resultUser == 1) {
    classOfPlayer = "wins_class";
    classOfComputer = "loss_class";
  } else if (resultUser == -1) {
    classOfPlayer = "loss_class";
    classOfComputer = "wins_class";
  } else if (resultUser == 0) {
    classOfPlayer = classOfComputer = "draw_class";
  }

  return [classOfPlayer, classOfComputer];
};

//Display last three Result of game
const displayLastResults = function (acc) {
  if (acc.arrDivsResult.length === acc.maxLengthOfHistory) {
    acc.arrDivsResult.pop();
  }
  let divsResult;
  let flag = true;
  acc.LastThreeRound.forEach((result, i) => {
    const itemUser = result;
    const resultUser = acc.LastThreeResult[i];
    const [classOfPlayer, classOfComputer] = checkWinnerClass(
      itemUser,
      resultUser
    );

    divsResult = `<div class="history-panel-wrapper">
        <div class="history-panel-result-player">
          <img
            src="images/${itemUser}.png"
            alt="icon"
            class="icon-history-player"
          />
          <p class="history-name-player ${classOfPlayer}">${acc.firstName}</p>
        </div>

        <div class="history-panel-result-computer">
          <img
            src="images/${acc.computerChoices[i]}.png"
            alt="icon"
            class="icon-history-computer"
          />
          <p class="history-name-computer ${classOfComputer}">Computer</p>
        </div>
      </div>`;
    if (flag) {
      acc.arrDivsResult.unshift(divsResult);
      flag = false;
    }
  });

  historyPanel.innerHTML = "";
  historyPanel.insertAdjacentHTML("beforeend", acc.arrDivsResult.join(""));
};

//Function check if login and pin is correct
const checkLoginAndPin = function (loginValue, pinValue, accs) {
  const checkAccount = accs.find((acc) => acc.username === loginValue);
  if (checkAccount && checkAccount.pin === pinValue) return checkAccount;
  else return false;
};

//UPDATE UI
const updateUI = function (acc) {
  displayLastResults(acc);
  displayResult(acc);
  restartUiOption();
};

//Function check choice of user
const markChoice = function (e, acc) {
  const div = e.target.closest(".option-player-thing");
  if (!div) return;
  const handPlayer = div.getAttribute("data-type");
  div.classList.add("class_choice");
  acc.LastThreeRound.unshift(handPlayer);
  if (acc.LastThreeRound.length == acc.maxLengthOfHistory + 1) {
    acc.LastThreeRound.pop();
  }
  return handPlayer;
};

//Function check Computer Choice
const checkAndDisplayComputerChoice = function (acc) {
  let lenChoices = choices.length;
  const computerHand = Math.floor(Math.random() * lenChoices);
  acc.computerChoices.unshift(choices[computerHand]);
  if (acc.computerChoices.length == acc.maxLengthOfHistory + 1) {
    acc.computerChoices.pop();
  }

  return choices[computerHand];
};

//Function set resul to Array
const setResultToArray = function (acc, num) {
  if (acc.LastThreeResult.length == acc.maxLengthOfHistory) {
    acc.LastThreeResult.pop();
  }
  acc.LastThreeResult.unshift(num);
  if (num == 1) acc.wins++;
  else if (num == 0) acc.draws++;
  else if (num == -1) acc.loss++;
};

//Function Set who wins the game
const checkWinners = function (acc) {
  const [choicePlayer] = acc.LastThreeRound;
  const [choiceComputer] = acc.computerChoices;

  if (choicePlayer == choiceComputer) {
    // LastThreeResult: [0, -1, 1],
    // acc.LastThreeResult.push(0);
    // acc.LastThreeResult.pop();
    setResultToArray(acc, 0);
  } else if (choicePlayer == "rock") {
    if (choiceComputer == "scissors") {
      setResultToArray(acc, 1);
    } else if (choiceComputer == "paper") {
      setResultToArray(acc, -1);
    }
  } else if (choicePlayer == "scissors") {
    if (choiceComputer == "paper") {
      setResultToArray(acc, 1);
    } else if (choiceComputer == "rock") {
      setResultToArray(acc, -1);
    }
  } else if (choicePlayer == "paper") {
    if (choiceComputer == "rock") {
      setResultToArray(acc, 1);
    } else if (choiceComputer == "scissors") {
      setResultToArray(acc, -1);
    }
  }
};

const DisplayComputerChoice = function (computerHand) {
  optionsForComputerDivs.forEach((div) =>
    div.classList.remove("class_choice_computer")
  );

  optionsForComputerDivs.forEach((div) => {
    if (div.getAttribute("data-type") == computerHand) {
      div.classList.add("class_choice_computer");
    }
  });
};
//Function clean players div
const cleanPlayerDiv = function () {
  optionsForPlayer.forEach((div) => div.classList.remove("class_choice"));
};
//Function Restart Game
const restartGame = function (acc) {
  acc.wins = 0;
  acc.loss = 0;
  acc.draws = 0;
  acc.LastThreeRound = [];
  acc.LastThreeResult = [];
  acc.arrDivsResult = [];
  acc.computerChoices = [];
  updateUI(activeUser);
};

//ADDEVENT LISTENER

//Function which login to game
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  activeUser = checkLoginAndPin(
    loginInput.value,
    Number(pinInput.value),
    accounts
  );

  if (activeUser) {
    displayBasicInfo(activeUser);
    updateUI(activeUser);
  }
  loginInput.value = "";
  pinInput.value = "";
});

//Function set Wins

//Function supports all the game.
optionPlayerDiv.addEventListener("click", function (e) {
  cleanPlayerDiv();
  const userHand = markChoice(e, activeUser);
  if (!userHand) return;
  const computerHand = checkAndDisplayComputerChoice(activeUser);
  DisplayComputerChoice(computerHand);

  checkWinners(activeUser);
  updateUI(activeUser);
});

RestartBtn.addEventListener("click", function () {
  restartGame(activeUser);
});
