const resetButton = document.getElementById("resetButton");
const scoreDisplay = document.getElementById("highScoreValue");
function showHighScore() {
    const highScore = localStorage.getItem("memoryblink_highscore");
    if (highScore) {
        scoreDisplay.textContent = "Level " + highScore;
    } else {
        scoreDisplay.textContent = "No high score yet. Play the game!";
    }
}
resetButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset your high score?")) {
        localStorage.removeItem("memoryblink_highscore");
        showHighScore();
        alert("High score reset successfully!");
    }
});
showHighScore();
