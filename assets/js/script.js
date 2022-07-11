var body = document.body;
var main = document.querySelector("main");

var mainPrompt = document.createElement("div");
var startButton = document.createElement("button");

var timerEl = document.getElementById("timer");
var quizFieldEl = document.getElementById("quizField");

var questionArr = [
  {
    question: "What is a variable?",
    choices: ["blah", "clah", "cha", "Dah"],
    answer: "blah",
  },
  {
    question: "What is a function?",
    choices: ["blah", "clah", "cha", "Dah"],
    answer: "clah",
  },
  {
    question: "What is a loop?",
    choices: ["blah", "clah", "cha", "Dah"],
    answer: "cha",
  },
];

var score = 0;
var timeLeft = 60;

//Initial Message and Start Button Generation
mainPrompt.setAttribute(
  "style",
  "display: flex; flex-direction: column; align-items: center;"
);
mainPrompt.textContent =
  "Try to answer as many questions in the alotted time. For each question answered incorrectly, 5 seconds will be deducted from the clock. Click the button below to begin.";
body.appendChild(mainPrompt);
//Start Button
mainPrompt.appendChild(startButton);
startButton.setAttribute("class", "startbtn");
startButton.textContent = "Start";

//Start Button Starts Timer
startButton.addEventListener("click", begin);

//Display Time before start of countdown
timerEl.textContent = "Time left: " + 60 + " Seconds";

//hide quizField until button press
quizFieldEl.setAttribute("style", "display: none");

//Begin FXN
function begin() {
  startButton.setAttribute("style", "display: none");
  mainPrompt.textContent = "";
  document
    .getElementById("quizField")
    .setAttribute("style", "display: default");
  nextQuestion(0);
  countDown();
}

//Countdown FXN

function countDown() {
  timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = "Time left: " + timeLeft + " Seconds";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = "Time left: " + timeLeft + " Second";
      timeLeft--;
    } else {
      timerEl.textContent = "TIMES UP!";
      clearInterval(timeInterval);
    }
  }, 1000);
}

//Generates questions and answers from array
function nextQuestion(i) {
  getQuestion();
  getAnswerOne();
  getAnswerTwo();
  getAnswerThree();
  getAnswerFour();

  function getQuestion() {
    var questionInner = document.getElementById("question");
    return (questionInner.textContent = questionArr[i].question);
  }

  function getAnswerOne() {
    var answerOneInner = document.getElementById("answerOne");
    return (answerOneInner.textContent = questionArr[i].choices[0]);
  }

  function getAnswerTwo() {
    var answerTwoInner = document.getElementById("answerTwo");
    return (answerTwoInner.textContent = questionArr[i].choices[1]);
  }

  function getAnswerThree() {
    var answerThreeInner = document.getElementById("answerThree");
    return (answerThreeInner.textContent = questionArr[i].choices[2]);
  }

  function getAnswerFour() {
    var answerFourInner = document.getElementById("answerFour");
    return (answerFourInner.textContent = questionArr[i].choices[3]);
  }
}

//Question Logic and adding to nextQuestionIndex
nextQuestionIndex = 1;
var ansbtn = document.querySelectorAll(".ansbtn");
ansbtn.forEach((ansbtn) => {
  ansbtn.addEventListener("click", function () {
    if (nextQuestionIndex === 1) {
      if (ansbtn.textContent === questionArr[0].answer) {
        console.log("Correct");
        score = score + 50;
      } else {
        console.log("Incorrect");
        timeLeft = timeLeft - 5;
      }
    }

    if (nextQuestionIndex === 2) {
      if (ansbtn.textContent === questionArr[1].answer) {
        console.log("Correct");
        score = score + 50;
      } else {
        console.log("Incorrect");
        timeLeft = timeLeft - 5;
      }
    }

    if (nextQuestionIndex === 3) {
      if (ansbtn.textContent === questionArr[2].answer) {
        console.log("Correct");
        score = score + 50;
      } else {
        console.log("Incorrect");
        timeLeft = timeLeft - 5;
      }
    }

    if (nextQuestionIndex < questionArr.length) {
      nextQuestion(nextQuestionIndex);
      nextQuestionIndex++;
    } else {
      alert(`No more questions! Score: ${score}`);
    }
  });
});
