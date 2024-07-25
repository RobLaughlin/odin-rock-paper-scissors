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

function playRound(humanChoice, computerChoice) {
    const res = result(humanChoice, computerChoice);
    
    console.log(`CURRENT ROUND: ${currentRound}\n\n`);
    console.log(`You chose ${humanChoice}.`);
    console.log(`The computer chose ${computerChoice}.`);
    console.log('\n');

    switch (res) {
        case 0:
            console.log(`Tie! Both players picked ${humanChoice}.`); 
            break;
        case 1:
            console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
            humanScore++;
            document.getElementById("PlayerScore").textContent = `Player: ${humanScore}`;
            break;
        case 2:
            console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
            computerScore++;
            document.getElementById("ComputerScore").textContent = `Computer: ${computerScore}`;
            break;
        default: break;
    }

    currentRound++;
    document.getElementById("CurrentRound").textContent = `Round: ${currentRound}`;
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
        console.log("The game ends in a tie!")
    }
    else if (humanScore > computerScore) {
        console.log("Congratulations! You beat the computer!");
    }
    else {
        console.log("The computer wins this time.")
    }
}

function choiceBtnHandler(e) {
    playRound(e.target.value, getComputerChoice());
}

function addEventHandlers() {
    let choiceBtns = document.getElementsByClassName("choiceBtn");

    for (let i = 0; i < choiceBtns.length; i++) {
        let choiceBtn = choiceBtns[i];
        choiceBtn.addEventListener("click", choiceBtnHandler);
    }
}

addEventHandlers();