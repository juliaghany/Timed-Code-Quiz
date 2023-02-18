var quizQuestions = [
    {
        question: "Commonly used data types DO NOT incude:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correct: "3. alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with:",
        answers: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        correct: "3. paranthesis"
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


var intro = document.querySelector("#intro-page");
var highScores = document.querySelector("#high-score");
var startQuizBtn = document.querySelector("#start-quiz-btn");
var questionsPage = document.querySelector("#questions-page");
var questions = document.querySelector("#questions");
var questionsContainer = document.querySelector("#questions-container")
var endQuizPage = document.querySelector("#end-quiz-page");
var initials = document.querySelector("#initials");
var sumbitBtn = document.querySelector("#submit-btn");
var optionOne = document.querySelector("#option-1");
var optionTwo = document.querySelector("#option-2");
var optionThree = document.querySelector("#option-3");
var optionFour = document.querySelector("#option-4");
var currentQuestion;
var finalScore = document.querySelector("#final-score");

var timer = document.querySelector("#timer");
var secondsLeft = 76;

// Starts the timer when the "start quiz" button is clicked, hides intro page, shows first quesiton
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



function showQuestion() {
    questions.textContent = (quizQuestions[currentQuestion].question);
    optionOne.textContent = (quizQuestions[currentQuestion].answers[0]);
    optionTwo.textContent = (quizQuestions[currentQuestion].answers[1]);
    optionThree.textContent = (quizQuestions[currentQuestion].answers[2]);
    optionFour.textContent = (quizQuestions[currentQuestion].answers[3]);
}

questionsContainer.addEventListener("click", function (event) {
    var target = event.target
    if (target.matches(".answer-btn")) {
        //if it's right, else if it's wrong
        if (target.textContent === quizQuestions[currentQuestion].correct ) {
            alert("Correct!")
        } else {
            secondsLeft -=10
            alert("Wrong!")
        }

        if (currentQuestion >= quizQuestions.length - 1) {
            currentQuestion++ 
            return endQuiz()
        }
        currentQuestion++ //means same thing as current question = current question + 1
        showQuestion();
    }
    
});

function endQuiz() {
    questionsPage.style.display = "none"
    endQuizPage.style.display = "block"
    document.getElementById("score-form").addEventListener("submit", handleFormSubmit)
    finalScore.textContent = "Your final score is: " + secondsLeft
}

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
    var savedScores = JSON.parse(localStorage.getItem("scores"))
    if (!savedScores || !savedScores.length) {
        localStorage.setItem("scores", JSON.stringify([value]))
        return
    }
    savedScores.push(value)
    localStorage.setItem("scores", JSON.stringify(savedScores))

}

//Commonly used data types DO NOT incude: strings, booleans, * alerts, numbers
//The condition in an if / else statement is enclosed with: quotes, curly brackets, *parenthesis, square brackets
//Arrays in JavaScript can be used to store: numbers and strings, other arrays, booleans, * all of the above
//String values must be enclosed within ____ when being assigned to variables: commas, curly brackets, * quotes, parenthesis
//A very useful tool used during development and debugging for printing content to the debugger is: JavaScript, terminal / bash, for loops, * console.log


// User clicks on start button
// Timer begins once quiz has started
// User is taken to question 1
// User answers question 1, and text appears saying whether or not the answer was correct
// If user's answer is incorrect, score and time is penalized by 10 seconds
// User goes through all questions until finished with the quiz
// User is then shown their score and able to enter their initials to be stored in the High Scores, hits submit button
// User is then able to view high scores
// User can either go back or hit clear results

// https://www.sitepoint.com/simple-javascript-quiz/

