var showScores = document.querySelector("#show-scores");
var clearBtn = document.querySelector("#clear-scores")
var scoreContainer = document.querySelector("#high-score-container")

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

    scoreContainer.addEventListener("click", function (event) {
        var target = event.target 
        if (target.matches(".clear-btn")) {
            localStorage.clear()
            showScores.innerHTML = ""
        }
    }
    )
}

loadStorage()





// Module 4 Activity 26 reference



//li.textContent = localStorage.setItem("scores", JSON.stringify(savedScore)) doesnt work