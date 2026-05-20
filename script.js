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

const questionElement = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option-btn");
const nextButton = document.getElementById("next-btn");
const resultBox = document.getElementById("result");
const quizBox = document.getElementById("quiz");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

function loadQuestion() {

    const current = questions[currentQuestion];

    questionElement.innerText = current.question;

    optionButtons.forEach((button, index) => {
        button.innerText = current.options[index];

        button.onclick = () => {
            checkAnswer(button.innerText);
        };
    });
}

function checkAnswer(selected) {

    if (selected === questions[currentQuestion].answer) {
        score++;
    }

    nextButton.style.display = "block";

    optionButtons.forEach(btn => {
        btn.disabled = true;
    });
}

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

        optionButtons.forEach(btn => {
            btn.disabled = false;
        });

    } else {

        showResult();
    }

});

function showResult() {

    quizBox.classList.add("hidden");

    resultBox.classList.remove("hidden");

    scoreElement.innerText = `${score} / ${questions.length}`;
}

restartButton.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    resultBox.classList.add("hidden");

    quizBox.classList.remove("hidden");

    optionButtons.forEach(btn => {
        btn.disabled = false;
    });

    loadQuestion();
});

loadQuestion();