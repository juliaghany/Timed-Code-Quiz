// Store quiz questions in an array with objects, stored possible answers to the questions in an array 

var quizQuestions = [
    {
        question: "Commonly used data types DO NOT incude:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correct: "3. alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with:",
        answers: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        correct: "3. parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        answers: ["1. numbers and strings", "2. other arrays", "3.booleans", "4. all of the above"],
        correct: "4. all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables:",
        answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        correct: "3. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correct: "4. console.log"
    }

]

// Define variables and used querySelector to target certain parts of my HTML

var intro = document.querySelector("#intro-page");
var highScores = document.querySelector("#high-score");
var startQuizBtn = document.querySelector("#start-quiz-btn");
var questionsPage = document.querySelector("#questions-page");
var questions = document.querySelector("#questions");
var questionsContainer = document.querySelector("#questions-container")
var endQuizPage = document.querySelector("#end-quiz-page");
var initials = document.querySelector("#initials");
var optionOne = document.querySelector("#option-1");
var optionTwo = document.querySelector("#option-2");
var optionThree = document.querySelector("#option-3");
var optionFour = document.querySelector("#option-4");
var currentQuestion;
var finalScore = document.querySelector("#final-score");
var rightWrongContainer = document.querySelector("#right-wrong-container");
var rightWrong = document.querySelector("#right-wrong");

// Variables for timer 

var timer = document.querySelector("#timer");
var secondsLeft = 76;

// start the timer when the "start quiz" button is clicked, hide intro page, show first quesiton
// if the timer reaches 0 seconds or the user answers the last question, call endQuiz() function - take user to the end quiz page

startQuizBtn.addEventListener("click", function () {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || currentQuestion > quizQuestions.length - 1) {
            clearInterval(timerInterval);
            return endQuiz()
        }
    }, 1000);

    intro.style.display = "none";
    questionsPage.style.display = "block"
    currentQuestion = 0
    showQuestion()
});

// show the question of the current question and possible answers of the current question

function showQuestion() {
    questions.textContent = (quizQuestions[currentQuestion].question);
    optionOne.textContent = (quizQuestions[currentQuestion].answers[0]);
    optionTwo.textContent = (quizQuestions[currentQuestion].answers[1]);
    optionThree.textContent = (quizQuestions[currentQuestion].answers[2]);
    optionFour.textContent = (quizQuestions[currentQuestion].answers[3]);
}

// this event listener moves user to the next question after clicking on an answer button - makes sure they are clicking on an answer button and not just anywhere in the div 
// if they select the correct answer, calls correct() function to indicate to the user that they selected the correct answer
// if they select an incorrect answer, calls wrong() function to indicate to the user that they selected the wrong answer; also subtracts 10 from score/time
// if they answer the last question, calls endQuiz() to take them to the end quiz page

questionsContainer.addEventListener("click", function (event) {
    var target = event.target
    if (target.matches(".answer-btn")) {
        //if it's right, else if it's wrong
        if (target.textContent === quizQuestions[currentQuestion].correct) {
            correct()

        } else {
            secondsLeft -= 10
            wrong()
        }

        if (currentQuestion >= quizQuestions.length - 1) {
            currentQuestion++
            return endQuiz()
        }
        currentQuestion++ 
        showQuestion();
    }

});

// change display of div from "none" to "block", tells the user if they got the answer correct

function correct() {
    rightWrongContainer.style.display = "block"
    rightWrong.textContent = "Correct!"
}

// change display of div from "none" to "block", tells the user if they got the answer wrong 

function wrong() {
    rightWrongContainer.style.display = "block"
    rightWrong.textContent = "Wrong!"
}

// display end quiz page, event listener to submit user information once submit button is clicked, shows user their score

function endQuiz() {
    questionsPage.style.display = "none"
    endQuizPage.style.display = "block"
    document.getElementById("score-form").addEventListener("submit", handleFormSubmit)
    finalScore.textContent = "Your final score is: " + secondsLeft
}

// 

function handleFormSubmit(event) {
    event.preventDefault()
    var initials = document.getElementById("initials").value.trim()
    if (initials) {
        saveToStorage({
            initials,
            score: secondsLeft
        })
    }
}

function saveToStorage(value) {
    var savedScores = JSON.parse(localStorage.getItem("scores")) || []
    savedScores.push(value)
    localStorage.setItem("scores", JSON.stringify(savedScores))
    window.location.href = "highscores.html";
}