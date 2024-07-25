const PROMPT_MSG = "Choose rock, paper, or scissors: "
const CHOICES = ["rock", "paper", "scissors"];
const CHOICES_SET = new Set(CHOICES);

const WIN_MAP = {
    'rock': 0,
    'paper': 1,
    'scissors': 2
};

const NUM_ROUNDS = 5;

let currentRound = 1;
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choice = Math.floor(Math.random()*CHOICES.length);
    return CHOICES[choice];
}

function getHumanChoice() {
    // Loop until a valid prompt is entered
    while (true) {
        const userInput = prompt(PROMPT_MSG);
        const userInputLower = userInput.toLowerCase();

        // Check if input is valid
        if (CHOICES_SET.has(userInputLower)) {
            return userInputLower;
        }

        // Otherwise reprompt
        console.log(`Invalid choice '${userInput}'. Choose a hand type from the following: ${CHOICES.join("|")}.`);
    }
}

function result(humanChoice, computerChoice) {
    let h = WIN_MAP[humanChoice];
    let c = WIN_MAP[computerChoice];
    
    switch (h-c) {
        case 0: 
            return 0; // Tie
        case 1: 
        case -2:
            return 1; // Human wins
        default:
            return 2; // Computer wins
    }
}

function logMessage(msg) {
    const elem = document.createElement("li")
    elem.textContent = msg;

    document.getElementById("GameHistory").appendChild(elem);
}

function playRound(humanChoice, computerChoice) {
    const res = result(humanChoice, computerChoice);
    
    logMessage(`CURRENT ROUND: ${currentRound}`);
    logMessage(`You chose ${humanChoice}.`);
    logMessage(`The computer chose ${computerChoice}.`);
    
    switch (res) {
        case 0:
            logMessage(`Tie! Both players picked ${humanChoice}.`); 
            break;
        case 1:
            logMessage(`You win! ${humanChoice} beats ${computerChoice}.`);
            humanScore++;
            document.getElementById("PlayerScore").textContent = `Player: ${humanScore}`;
            break;
        case 2:
            logMessage(`You lose! ${computerChoice} beats ${humanChoice}.`);
            computerScore++;
            document.getElementById("ComputerScore").textContent = `Computer: ${computerScore}`;
            break;
        default: break;
    }

    if (currentRound == NUM_ROUNDS) {
        logMessage('-------------------------------------');
        logMessage("Game over!");

        let gameResultText = document.getElementById("GameResultTxt");
        if (humanScore == computerScore) {
            logMessage("The game ends in a tie!");
            gameResultText.textContent = "The game ends in a tie!";
        }
        else if (humanScore > computerScore) {
            logMessage("Congratulations! You beat the computer!");
            gameResultText.textContent = "Congratulations! You beat the computer!";
        }
        else {
            logMessage("The computer wins this time.");
            gameResultText.textContent = "The computer wins this time.";
        }
        document.getElementById("PlayAgainContainer").classList.toggle("invisible");

        let choiceButtons = document.getElementsByClassName("choiceBtn");
        for (let i = 0; i < choiceButtons.length; i++) {
            let choiceBtn = choiceButtons[i];
            choiceBtn.disabled = true;
            choiceBtn.classList.toggle("enabled");
        }
    }
    else {
        currentRound++;
        document.getElementById("CurrentRound").textContent = `Round: ${currentRound}`;
    }
    logMessage('-------------------------------------');
}

function playGame(numRounds) {
    let humanScore = 0;
    let computerScore = 0;

    for (let i = 0; i < numRounds; i++) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        
        playRound(humanSelection, computerSelection);
        console.log(`The score is now Player (${humanScore}) to Computer (${computerScore})\n\n`);
    }
    
    console.log("Game over!")
    if (humanScore == computerScore) {
        console.log("The game ends in a tie!");
    }
    else if (humanScore > computerScore) {
        console.log("Congratulations! You beat the computer!");
    }
    else {
        console.log("The computer wins this time.");
    }
}

function choiceBtnHandler(e) {
    playRound(e.target.value, getComputerChoice());
}

function playAgainBtnHandler() {
    // Reset the game state
    document.getElementById("PlayAgainContainer").classList.toggle("invisible");
    humanScore = 0;
    computerScore = 0;
    currentRound = 1;

    document.getElementById("PlayerScore").textContent = `Player: ${humanScore}`;
    document.getElementById("ComputerScore").textContent = `Computer: ${computerScore}`;
    document.getElementById("CurrentRound").textContent = `Round: ${currentRound}`;

    document.getElementById("GameHistory").replaceChildren();

    let choiceButtons = document.getElementsByClassName("choiceBtn");
    for (let i = 0; i < choiceButtons.length; i++) {
        let choiceBtn = choiceButtons[i];
        choiceBtn.disabled = false;
        choiceBtn.classList.toggle("enabled");
    }
}

function addEventHandlers() {
    let choiceBtns = document.getElementsByClassName("choiceBtn");

    for (let i = 0; i < choiceBtns.length; i++) {
        let choiceBtn = choiceBtns[i];
        choiceBtn.addEventListener("click", choiceBtnHandler);
    }

    document.getElementById("PlayAgainBtn").addEventListener("click", playAgainBtnHandler);
}

addEventHandlers();