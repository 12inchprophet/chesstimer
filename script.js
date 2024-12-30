let player1Time = 300; // Default 5 minutes in seconds
let player2Time = 300; // Default 5 minutes in seconds
let player1Active = false;
let player2Active = false;
let timerInterval1, timerInterval2;
let gameStarted = false; // Track if the game has started

// Grabbing the HTML elements
const player1Display = document.getElementById("player1");
const player2Display = document.getElementById("player2");
const player1StopBtn = document.getElementById("player1-stop");
const player2StopBtn = document.getElementById("player2-stop");
const resetBtn = document.getElementById("reset-btn");
const timeSelect = document.getElementById("time-select");
const setTimeBtn = document.getElementById("set-time-btn");
const startBtn = document.getElementById("start-btn");

// Add sound effect for game over
const gameOverSound = new Audio('https://12inchapps.com/image-bin/uploads/7e06c1acd95439c05a7a9c27052a2a06.mpga');

// Function to update the timer display
function updateDisplay(playerDisplay, time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    playerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to set timers based on the selected value
function setTimers() {
    const selectedTime = parseInt(timeSelect.value);
    player1Time = selectedTime;
    player2Time = selectedTime;
    updateDisplay(player1Display, player1Time);
    updateDisplay(player2Display, player2Time);
}

// Timer functions for Player 1
function startPlayer1Timer() {
    timerInterval1 = setInterval(() => {
        if (player1Time > 0) {
            player1Time--;
            updateDisplay(player1Display, player1Time);
        } else {
            clearInterval(timerInterval1); // Stop timer if time runs out
            gameOverSound.play(); // Play sound
        }
    }, 1000);
}

function stopPlayer1Timer() {
    clearInterval(timerInterval1);
}

// Timer functions for Player 2
function startPlayer2Timer() {
    timerInterval2 = setInterval(() => {
        if (player2Time > 0) {
            player2Time--;
            updateDisplay(player2Display, player2Time);
        } else {
            clearInterval(timerInterval2); // Stop timer if time runs out
            gameOverSound.play(); // Play sound
        }
    }, 1000);
}

function stopPlayer2Timer() {
    clearInterval(timerInterval2);
}

// Start the game (starts Player 1's timer)
startBtn.addEventListener("click", () => {
    if (!gameStarted) {
        startPlayer1Timer();
        player1Active = true;
        gameStarted = true;
    }
});

// When Player 1 presses Stop, Player 2's timer starts
player1StopBtn.addEventListener("click", () => {
    if (player1Active) {
        stopPlayer1Timer();
        startPlayer2Timer();
        player1Active = false;
        player2Active = true;
    }
});

// When Player 2 presses Stop, Player 1's timer starts
player2StopBtn.addEventListener("click", () => {
    if (player2Active) {
        stopPlayer2Timer();
        startPlayer1Timer();
        player2Active = false;
        player1Active = true;
    }
});

// Set the time for both players
setTimeBtn.addEventListener("click", setTimers);

// Reset both timers to the set value and reset the game state
resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval1);
    clearInterval(timerInterval2);
    player1Active = false;
    player2Active = false;
    gameStarted = false;
    setTimers();
});

// Initialize the timers with the default value
setTimers();
