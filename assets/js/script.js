// code quiz questions and answers array
var codeQuiz = [
    {
        question: 'Test question 1', 
        a: 'Answer 1A',
        b: 'Answer 1B',
        c: 'Answer 1C',
        d: 'Answer 1D',
        correctAns: 'Answer 1B'
    }, 
    {
        question: 'Test question 2',
        a: 'Answer 2A',
        b: 'Answer 2B',
        c: 'Answer 2C',
        d: 'Answer 2D',
        correctAns: 'Answer 2C'
    },
    {
        question: 'Test question 3',
        a: 'Answer 3A',
        b: 'Answer 3B',
        c: 'Answer 3C',
        d: 'Answer 3D',
        correctAns: 'Answer 3C'
    },
    {
        question: 'Test question 4',
        a: 'Answer 4A',
        b: 'Answer 4B',
        c: 'Answer 4C',
        d: 'Answer 4D',
        correctAns: 'Answer 4D'
    },
    {
        question: 'Test question 5',
        a: 'Answer 5A',
        b: 'Answer 5B',
        c: 'Answer 5C',
        d: 'Answer 5D',
        correctAns: 'Answer 5B'
    }
]

var cardEl = document.querySelector("#card");
var startBtn = document.querySelector("#start-btn");
var headerEl = document.querySelector("header");
// var scoreSpan = document.querySelector("#score");

// start quiz function
var createQuiz = function() {
    document.querySelector("#instructions").remove();

    // creates container div for questions
    var questionEl = document.createElement("div");
    questionEl.className = "question";
    cardEl.appendChild(questionEl);

    // creates container div for answers
    var answersEl = document.createElement("div");
    answersEl.className = "answer-grid";
    cardEl.appendChild(answersEl);

    // button A
    var choiceA = document.createElement("div");
    choiceA.className = "answer-grid-item";
    answersEl.appendChild(choiceA);

    var btnA = document.createElement("button");
    btnA.className = "btn";
    btnA.id = "btn-a";
    choiceA.appendChild(btnA);

    // button B
    var choiceB = document.createElement("div");
    choiceB.className = "answer-grid-item";
    answersEl.appendChild(choiceB);

    var btnB = document.createElement("button");
    btnB.className = "btn";
    btnB.id = "btn-b";
    choiceB.appendChild(btnB);

    // button C
    var choiceC = document.createElement("div");
    choiceC.className = "answer-grid-item";
    answersEl.appendChild(choiceC);

    var btnC = document.createElement("button");
    btnC.className = "btn";
    btnC.id = "btn-c";
    choiceC.appendChild(btnC);

    // button D
    var choiceD = document.createElement("div");
    choiceD.className = "answer-grid-item";
    answersEl.appendChild(choiceD);

    var btnD = document.createElement("button");
    btnD.className = "btn";
    btnD.id = "btn-d";
    choiceD.appendChild(btnD);
    
    scoreCounter();
}

var scoreCounter = function () {
    var scoreDiv = document.createElement("div");
    scoreDiv.className = "score";
    headerEl.appendChild(scoreDiv);

    var currentScore = 100;
    var scoreInterval = setInterval(function() {
        if (currentScore >= 0) {
            scoreDiv.textContent = "Current score: " + currentScore;
            currentScore--
        }
        else {
            clearInterval(scoreInterval);
        }
    }, 1000);
}

startBtn.addEventListener("click", createQuiz)

/* PSEUDOCODE FOR QUIZ

1. Quiz should be created using DOM manipulation.

2. Create an array of questions and answer selections.

3. Create functions to call on question array.

    a. Use for loop to iterate through questions?

4. Possible structure for quiz:

    a. Quiz question div.

    b. Answer choice div(s) with buttons.

    c. Identify correct vs. incorrect answers using class attributes on the buttons?

5. Deduct points (add to timer?) for wrong answers.

6. Add timer function.

7. Use local storage to save timer high scores.

    a. Add option to enter name for high scores.

8. Create high score list by loading saved storage data.

9. Add styles to quiz.

    a. Hover effects for answer choices.

    b. General styles, time permitting.

10. Other considerations:

    a. Start/re-start quiz?

    b. Make a static mock-up of the HTML elements needed to structure the quiz first.

*/