(() => {
    const PROMPT_MSG = "Choose rock (1), paper (2), or scissors (3): "
    const CHOICES = ["rock", "paper", "scissors"];
    const CHOICE_SET = new Set(CHOICES);

    function getComputerChoice() {
        const choice = Math.floor(Math.random()*CHOICES.length);
        return CHOICES[choice];
    }

    function getHumanChoice() {
        let validChoice = false;

        while (!validChoice) {
            const userInput = prompt(PROMPT_MSG);
            if (!Number.isNaN(userInput)) {
                const numInput = Number(userInput);
                validChoice = numInput >= 1 && numInput <= CHOICES.length;
            }
            
            if (validChoice) {
                const choice = Number(userInput) - 1;
                return CHOICES[choice];
            }
            else {
                console.log(`Invalid choice '${userInput}'. Must choose a number between 1 and ${CHOICES.length} (inclusive).`)
            }
        }

    }
})();