(() => {
    const PROMPT_MSG = "Choose rock, paper, or scissors: "
    const CHOICES = ["rock", "paper", "scissors"];
    const CHOICES_SET = new Set(CHOICES);

    const WIN_MAP = {
        'rock': 0,
        'paper': 1,
        'scissors': 2
    };

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
        console.log(`You chose ${humanChoice}.`);
        console.log(`The computer chose ${computerChoice}.`);
        console.log();
        switch (res) {
            case 0:
                console.log(`Tie! Both players picked ${humanChoice}.`); 
                break;
            case 1:
                console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
                humanScore++;
                break;
            case 2:
                console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
                computerScore++;
                break;
            default: break;
        }
    }

    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    
    playRound(humanSelection, computerSelection);
})();