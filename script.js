const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks Text Management Language",
            "Hyper Tool Multi Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which language is used for styling web pages?",
        options: [
            "HTML",
            "JQuery",
            "CSS",
            "XML"
        ],
        answer: "CSS"
    },
    {
        question: "Which language is used for web development?",
        options: [
            "Python",
            "JavaScript",
            "C++",
            "Java"
        ],
        answer: "JavaScript"
    }
];

let currentQuestion = 0;
let score = 0;
let username = "";

// Quiz Elements
const questionElement = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option-btn");
const nextButton = document.getElementById("next-btn");
const resultBox = document.getElementById("result");
const quizBox = document.getElementById("quiz");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

// Start Screen Elements
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const usernameInput = document.getElementById("username");
const regnoInput = document.getElementById("regno");

// Profile Elements
const profile = document.getElementById("profile");
const profileName = document.getElementById("profile-name");
const profileRegno = document.getElementById("profile-regno");
const bestScore = document.getElementById("best-score");
const historyList = document.getElementById("history-list");

// Start Quiz
startBtn.addEventListener("click", () => {

    username = usernameInput.value.trim();
    const regno = regnoInput.value.trim();

    if (username === "" || regno === "") {
        alert("Please enter Name and Registration Number");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("regno", regno);

    startScreen.classList.add("hidden");
    quizBox.classList.remove("hidden");

    loadQuestion();
});

// Load Question
function loadQuestion() {

    const current = questions[currentQuestion];

    questionElement.innerText = current.question;

    optionButtons.forEach((button, index) => {

        button.innerText = current.options[index];
        button.disabled = false;

        button.onclick = () => {
            checkAnswer(button.innerText);
        };

    });

    nextButton.style.display = "none";
}

// Check Answer
function checkAnswer(selected) {

    if (selected === questions[currentQuestion].answer) {
        score++;
    }

    optionButtons.forEach(btn => {
        btn.disabled = true;
    });

    nextButton.style.display = "inline-block";
}

// Next Button
nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }

});

// Show Result
function showResult() {

    quizBox.classList.add("hidden");

    resultBox.classList.remove("hidden");

    scoreElement.innerText = `${score} / ${questions.length}`;

    saveScore();
}

// Save Score
function saveScore() {

    let history =
        JSON.parse(localStorage.getItem("scores")) || [];

    history.push(score);

    localStorage.setItem(
        "scores",
        JSON.stringify(history)
    );

    displayProfile();
}

// Display Profile
function displayProfile() {

    profile.classList.remove("hidden");

    const savedName =
        localStorage.getItem("username");

    const savedRegno =
        localStorage.getItem("regno");

    profileName.textContent = savedName;
    profileRegno.textContent = savedRegno;

    let history =
        JSON.parse(localStorage.getItem("scores")) || [];

    let best =
        Math.max(...history);

    bestScore.textContent =
        best + " / " + questions.length;

    historyList.innerHTML = "";

    history.forEach((item, index) => {

        const li = document.createElement("li");

        li.textContent =
            "Attempt " +
            (index + 1) +
            ": " +
            item +
            "/" +
            questions.length;

        historyList.appendChild(li);

    });

}

// Restart Quiz
restartButton.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    resultBox.classList.add("hidden");
    profile.classList.add("hidden");

    quizBox.classList.remove("hidden");

    loadQuestion();

});