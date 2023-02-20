// define variables and target parts of HTML using querySelector

var showScores = document.querySelector("#show-scores");
var clearBtn = document.querySelector("#clear-scores")
var scoreContainer = document.querySelector("#high-score-container")
var clearOrReturn = document.querySelector("#clear-or-return")

// shows user's initials and scores on high scores page

function loadStorage() {
    showScores.innerHTML = ""
    var savedScores = JSON.parse(localStorage.getItem("scores"))
    if (!savedScores || !savedScores.length) {
        return
    }
    for (let i = 0; i < savedScores.length; i++) {
        var savedScore = savedScores[i]
        var li = document.createElement("li");
        li.textContent = savedScore.initials + " " + "- " + savedScore.score
        showScores.appendChild(li);
    }

// added event listener to clear scores that were previously saved to high scores when user clicks on "clear high scores" button

    clearOrReturn.addEventListener("click", function (event) {
        var target = event.target 
        if (target.matches(".clear-btn")) {
            localStorage.clear()
            showScores.innerHTML = ""
        }
    }
    )
}

// calls loadStorage() function

loadStorage()





// Module 4 Activity 26 reference