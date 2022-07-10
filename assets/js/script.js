var body = document.body;
var main = document.querySelector("main");

var mainPrompt = document.createElement("div");
var startButton = document.createElement("button");

var timerEl = document.getElementById("timer");

var questionArr = [
  {
    question: "What is a variable?",
    choices: ["blah", "clah", "cha", "Dah"],
    answer: "blah",
  },
  {
    question: "What is a function?",
    choices: ["blah", "clah", "cha", "Dah"],
    answer: 1,
  },
  {
    question: "What is a loop?",
    choices: ["blah", "clah", "cha", "Dah"],
    answer: 4,
  },
];

var score = 0;

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
document.getElementById("quizField").setAttribute("style", "display: none");

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
  var timeLeft = 60;
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

window.nextQuestionIndex = 1;
var ansbtn = document.querySelectorAll(".ansbtn");
ansbtn.forEach((ansbtn) => {
  ansbtn.addEventListener("click", function () {
    if (window.nextQuestionIndex < questionArr.length) {
      nextQuestion(window.nextQuestionIndex);
      window.nextQuestionIndex++;
    } else {
      alert("No more questions!");
    }
  });
});

//Question Logic

//If correct goto next question and add score
//If incorrect goto next question and deduct 5 seconds from clock
