let isGameRunning = false;
let balance = 1000;
let previousBalance = 1000;
const gameOutput = document.getElementById("gameOutput");
const startButton = document.getElementById("startGameButton");
const playButton = document.getElementById("playGameButton");
const withdrawButton = document.getElementById("withdrawButton");
const betAmountInput = document.getElementById("betAmount");
const betNumberInput = document.getElementById("betNumber");
const balanceDisplay = document.getElementById("balanceDisplay");
const winMessage = document.getElementById("winMessage");

startButton.addEventListener("click", function () {
    if (isGameRunning) return;

    isGameRunning = true;
    if (balance === 0) {
        balance = 1000;
    } else {
        balance = previousBalance;
    }
    gameOutput.innerHTML = `<p>Game started! Your initial balance is: $${balance}</p>`;
    playButton.disabled = false;
    withdrawButton.disabled = false;
    updateBalanceDisplay();
    winMessage.innerHTML = "";
});

playButton.addEventListener("click", function () {
    if (!isGameRunning) return;

    const betAmount = parseInt(betAmountInput.value);
    const betNumber = parseInt(betNumberInput.value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        gameOutput.innerHTML = `<p>Please enter a valid bet amount within your balance.</p>`;
        return;
    }

    if (isNaN(betNumber) || betNumber < 0 || betNumber > 10) {
        gameOutput.innerHTML = `<p>Please enter a valid number to bet on (between 0 and 10).</p>`;
        return;
    }

    let randomNumber = Math.floor(Math.random() * 11);
    let result = "";

    if (randomNumber === betNumber) {
        balance += betAmount * 3;
        result = `<p>You have won! $${balance}</p>`;
        winMessage.innerHTML = "YOU WON!";
        winMessage.classList.add("winMessage");
    } else {
        balance -= betAmount;
        result = `<p>You have lost $${betAmount}!</p>`;
        winMessage.innerHTML = "";
    }

    result += `<p>The winning number was: ${randomNumber}</p>`;
    gameOutput.innerHTML = result;

    if (balance <= 0) {
        gameOutput.innerHTML += `<p>You have run out of money. Game over!</p>`;
        isGameRunning = false;
        playButton.disabled = true;
        withdrawButton.disabled = true;
    }
    updateBalanceDisplay();
});

withdrawButton.addEventListener("click", function () {
    if (!isGameRunning) return;

    previousBalance = balance;
    isGameRunning = false;
    playButton.disabled = true;
    withdrawButton.disabled = true;
    gameOutput.innerHTML = `<p>You have withdrawn from the game. Final balance: $${balance}</p>`;
    updateBalanceDisplay();
});

function updateBalanceDisplay() {
    balanceDisplay.innerHTML = `Your balance: $${balance}`;
}
