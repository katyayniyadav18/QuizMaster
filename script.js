const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");

const questionNumber = document.getElementById("question-number");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");

const scoreElement = document.getElementById("score");
const resultMessage = document.getElementById("result-message");

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;


/* Start Quiz */

startBtn.addEventListener("click", startQuiz);

function startQuiz() {

    currentQuestion = 0;
    score = 0;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}


/* Show Question */

function showQuestion() {

    clearInterval(timer);

    timeLeft = 15;
    timerElement.textContent = timeLeft;

    nextBtn.disabled = true;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1}/${questions.length}`;

    questionElement.textContent = current.question;

    optionsElement.innerHTML = "";

    current.options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option");

        button.addEventListener("click", () => {
            selectAnswer(button, option);
        });

        optionsElement.appendChild(button);
    });


    const progress =
        ((currentQuestion) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;

    startTimer();
}


/* Timer */

function startTimer() {

    timer = setInterval(() => {

        timeLeft--;

        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            disableOptions();

            nextBtn.disabled = false;
        }

    }, 1000);
}


/* Select Answer */

function selectAnswer(button, selectedAnswer) {

    clearInterval(timer);

    const correctAnswer =
        questions[currentQuestion].answer;

    const allOptions =
        document.querySelectorAll(".option");

    allOptions.forEach(option => {
        option.disabled = true;

        if (option.textContent === correctAnswer) {
            option.classList.add("correct");
        }
    });


    if (selectedAnswer === correctAnswer) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");
    }

    nextBtn.disabled = false;
}


/* Disable Options */

function disableOptions() {

    const allOptions =
        document.querySelectorAll(".option");

    allOptions.forEach(option => {

        option.disabled = true;

        if (
            option.textContent ===
            questions[currentQuestion].answer
        ) {
            option.classList.add("correct");
        }

    });
}


/* Next Question */

nextBtn.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


/* Result */

function showResult() {

    clearInterval(timer);

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    scoreElement.textContent =
        `${score}/${questions.length}`;

    progressBar.style.width = "100%";


    const percentage =
        (score / questions.length) * 100;


    if (percentage >= 80) {

        resultMessage.textContent =
            "Excellent! You really know your stuff.";

    } else if (percentage >= 50) {

        resultMessage.textContent =
            "Good job! Keep practicing and improve your score.";

    } else {

        resultMessage.textContent =
            "Keep learning! Practice makes progress.";

    }
}


/* Restart */

restartBtn.addEventListener("click", () => {

    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    currentQuestion = 0;
    score = 0;

    showQuestion();

});