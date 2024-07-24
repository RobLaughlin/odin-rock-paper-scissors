(() => {
    const PROMPT_MSG = "Choose rock, paper, or scissors: "
    const CHOICES = ["rock", "paper", "scissors"];
    const CHOICES_SET = new Set(CHOICES);
    const WIN_CONDITION = {
        "rock": "paper",
        "paper": "scissors",
        "scissors": "rock"
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
            console.log(`Invalid choice '${userInput}'. Choose a hand type from the following: ${CHOICES.join("|")}.`);
        }
    }

    getHumanChoice();
})();