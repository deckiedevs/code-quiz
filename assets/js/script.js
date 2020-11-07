var codeQuiz = [
    {
        question: 'Which of the following is not a comparison operator?', 
        a: '===',
        b: '!=',
        c: '<=',
        d: '>=',
        answer: 'b'
    }, 
    {
        question: 'Which of the following is not a falsy value?',
        a: 'null',
        b: 'undefined',
        c: '"0"',
        d: 'NaN',
        answer: 'c'
    },
    {
        question: 'Which of the following is not a way to write a function?',
        a: 'let myFunc = function() { ... };',
        b: 'const myFunc = () => { ... };',
        c: 'var myFunc() = function { ... };',
        d: 'function myFunc() { ... };',
        answer: 'c'
    },
    {
        question: 'What type of data is "36"?',
        a: 'undefined',
        b: 'number',
        c: 'boolean',
        d: 'string',
        answer: 'd'
    },
    {
        question: 'What will parseInt(9.57) return?',
        a: '9',
        b: '9.57',
        c: '9.6',
        d: '10',
        answer: 'a'
    }
]

var background = document.querySelector("body");
var headerEl = document.querySelector("header");
var cardEl = document.querySelector(".card");
var startBtn = document.querySelector("#start-btn");
var quizEl = document.querySelector(".quiz-container");
var endEl = document.querySelector(".end");
var scoreEl = document.querySelector(".score");
var questionCounter = 0;
var currentScore = 99;
var highScores = [];

var scoreCounter = function() {

    scoreEl.textContent = "Current score: 100"

    var scoreInterval = setInterval(function() {
        if (currentScore > 0 && questionCounter < codeQuiz.length) {
            scoreEl.textContent = "Current score: " + currentScore;
            currentScore--
        }
        else {
            scoreEl.textContent = "Current score: 0";
            clearInterval(scoreInterval);
        }
    }, 1000);
}

// start quiz function
var createQuiz = function() {
    document.querySelector("#instructions").remove();

    var questionHeader = document.createElement("h2");
    questionHeader.className = "question-header";
    quizEl.appendChild(questionHeader);

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
    feedbackEl.className = "feedback hide";
    cardEl.prepend(feedbackEl);

    nextQues(questionCounter);
    scoreCounter();
}

var nextQues = function(index) {
    var questionHeader = document.querySelector(".question-header");
    var questionEl = document.querySelector(".question");
    var btnA = document.getElementById("btn-a");
    var btnB = document.getElementById("btn-b");
    var btnC = document.getElementById("btn-c");
    var btnD = document.getElementById("btn-d");
    var allBtns = document.querySelector(".answer-grid"); 

    questionHeader.textContent = "Question #" + parseInt(index + 1)
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
        feedbackEl.classList.remove("hide");
        feedbackEl.textContent = "CORRECT!"
    }
    else {
        if (currentScore >= 5) {
            currentScore -= 5;
            scoreEl.textContent = "Current score: " + currentScore;
            }
        background.className = "incorrect";
        feedbackEl.classList.remove("hide");
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