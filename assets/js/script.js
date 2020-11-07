var codeQuiz = [
    {
        question: 'Test question 1', 
        a: 'Answer 1A',
        b: 'Answer 1B',
        c: 'Answer 1C',
        d: 'Answer 1D',
        answer: 'b'
    }, 
    {
        question: 'Test question 2',
        a: 'Answer 2A',
        b: 'Answer 2B',
        c: 'Answer 2C',
        d: 'Answer 2D',
        answer: 'c'
    },
    {
        question: 'Test question 3',
        a: 'Answer 3A',
        b: 'Answer 3B',
        c: 'Answer 3C',
        d: 'Answer 3D',
        answer: 'c'
    },
    {
        question: 'Test question 4',
        a: 'Answer 4A',
        b: 'Answer 4B',
        c: 'Answer 4C',
        d: 'Answer 4D',
        answer: 'd'
    },
    {
        question: 'Test question 5',
        a: 'Answer 5A',
        b: 'Answer 5B',
        c: 'Answer 5C',
        d: 'Answer 5D',
        answer: 'b'
    }
]

var background = document.querySelector("body");
var headerEl = document.querySelector("header");
var scoreEl = document.querySelector(".score");
var startBtn = document.querySelector("#start-btn");
var quizEl = document.querySelector(".quiz-container");
var endEl = document.querySelector(".end");
var questionCounter = 0;
var currentScore = 100;
var highScores = [];

var scoreCounter = function() {

    var scoreInterval = setInterval(function() {
        if (currentScore >= 0 && questionCounter < codeQuiz.length) {
            scoreEl.textContent = "Current score: " + currentScore;
            currentScore--
        }
        else {
            clearInterval(scoreInterval);
        }
    }, 1000);
}

// start quiz function
var createQuiz = function() {
    document.querySelector("#instructions").remove();

     // creates container div for questions
     var questionEl = document.createElement("div");
     questionEl.className = "question";
     quizEl.appendChild(questionEl);
 
     // creates container div for answers
     var answersEl = document.createElement("div");
     answersEl.className = "answer-grid";
     quizEl.appendChild(answersEl);
 
     // button A
     var choiceA = document.createElement("div");
     choiceA.className = "answer-grid-item";
     answersEl.appendChild(choiceA);
 
     var btnA = document.createElement("button");
     btnA.className = "btn";
     btnA.id = "btn-a";
     btnA.setAttribute("value", "a");
     choiceA.appendChild(btnA);
 
     // button B
     var choiceB = document.createElement("div");
     choiceB.className = "answer-grid-item";
     answersEl.appendChild(choiceB);
 
     var btnB = document.createElement("button");
     btnB.className = "btn";
     btnB.id = "btn-b";
     btnB.setAttribute("value", "b");
     choiceB.appendChild(btnB);
 
     // button C
     var choiceC = document.createElement("div");
     choiceC.className = "answer-grid-item";
     answersEl.appendChild(choiceC);
 
     var btnC = document.createElement("button");
     btnC.className = "btn";
     btnC.id = "btn-c";
     btnC.setAttribute("value", "c");
     choiceC.appendChild(btnC);
 
     // button D
     var choiceD = document.createElement("div");
     choiceD.className = "answer-grid-item";
     answersEl.appendChild(choiceD);
 
     var btnD = document.createElement("button");
     btnD.className = "btn";
     btnD.id = "btn-d";
     btnD.setAttribute("value", "d");
     choiceD.appendChild(btnD);

    //  feedback div
    var feedbackEl = document.createElement("div");
    feedbackEl.className = "feedback";
    quizEl.appendChild(feedbackEl);

    nextQues(questionCounter);
    scoreCounter();
}

var nextQues = function(index) {
    var questionEl = document.querySelector(".question");
    var btnA = document.getElementById("btn-a");
    var btnB = document.getElementById("btn-b");
    var btnC = document.getElementById("btn-c");
    var btnD = document.getElementById("btn-d");
    var allBtns = document.querySelector(".answer-grid"); 


    questionEl.textContent = codeQuiz[index].question;
    btnA.textContent = codeQuiz[index].a;
    btnB.textContent = codeQuiz[index].b;
    btnC.textContent = codeQuiz[index].c;
    btnD.textContent = codeQuiz[index].d;

    allBtns.addEventListener("click", checkAnswer);
}

var checkAnswer = function(event) {
    var clickedBtn = event.target.getAttribute("value");
    var feedbackEl = document.querySelector(".feedback");
    
    if (clickedBtn === codeQuiz[questionCounter].answer) {
        background.className = "correct";
        feedbackEl.textContent = "CORRECT!"
    }
    else {
        currentScore -= 5;
        background.className = "incorrect";
        feedbackEl.textContent = "INCORRECT!"
    }

    questionCounter++

    if (questionCounter < codeQuiz.length) {        
        nextQues(questionCounter);
    }
    else {
        endQuiz();
    }
}

var endQuiz = function() {

    document.querySelector(".quiz-container"). remove();
    document.querySelector(".score"). remove();
    background.removeAttribute("class");
 
    endEl.innerHTML = "<h2 class='end-title'>That's all she wrote!</h2><p>Your final score is " + currentScore + ".  Please enter your name.</p>";

    var scoreForm = document.createElement("form");
    scoreForm.id = "score-form";
    endEl.appendChild(scoreForm);

    var nameInput = document.createElement("input");
    nameInput.className = "name-input";
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "player-name");
    nameInput.setAttribute("placeholder", "ENTER YOUR NAME");
    scoreForm.appendChild(nameInput);

    var nameBtn = document.createElement("button");
    nameBtn.className = "btn";
    nameBtn.id = "name-btn"
    nameBtn.textContent = "SUBMIT";
    scoreForm.appendChild(nameBtn);

    nameBtn.addEventListener("click", saveScore);
}

var saveScore = function() {
    event.preventDefault()

    var playerName = document.querySelector("input[name='player-name']").value;

    if (!playerName) {
        alert("Please enter your name!")
    }
    else {
        var scoreObj = {
            name: playerName,
            score: currentScore
        }
    
        highScores.push(scoreObj);
        document.querySelector("#score-form").reset();
        localStorage.setItem("scores", JSON.stringify(highScores));
        document.location.href = "highscore.html";
    }
}

var loadScores = function() { 
    highScores = localStorage.getItem("scores");

    if (!highScores) {
        highScores = []
        return false;
    }

    highScores = JSON.parse(highScores);
}

loadScores();
startBtn.addEventListener("click", createQuiz)