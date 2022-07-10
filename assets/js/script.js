var body = document.body;
var main = document.querySelector("main");

var mainPrompt = document.createElement("div");
var startButton = document.createElement("button");

var timerEl = document.getElementById("timer");

var questionArr = [
  {
    question: "What is a variable?",
    choices: ["blah", "clah", "cha", "Dah"],
    answer: 2,
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

mainPrompt.textContent =
  "Try to answer as many questions in the alotted time. For each question answered incorrectly, 5 seconds will be deducted from the clock. Click the button below to begin.";

main.appendChild(mainPrompt);

//Start Button
main.appendChild(startButton);
startButton.setAttribute("class", "startbtn");
startButton.textContent = "Start";

//Start Button Starts Timer
startButton.addEventListener("click", begin);

//Display Time before start of countdown
timerEl.textContent = "Time left: " + 60 + " Seconds";

//Begin FXN
function begin() {
  startButton.setAttribute("style", "display: none");
  mainPrompt.textContent = "";
  //   mainPrompt.textContent = questionNum;
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

//cycle through question array
for (let i = 0; i < questionArr.length; i++) {
  var question = questionArr[i].question;
  mainPrompt.write(question);
  var options = questionArr[i].choices;
  document.body.appendChild(document.createElement("br"));
  var name = "radio" + i;
  for (var opt in options) {
    var radioEle = document.createElement("input");
    radioEle.type = "radio";
    radioEle.value = options[opt];
    radioEle.name = name;
    document.body.appendChild(radioEle);
    var label = document.createElement("Label");
    label.innerHTML = options[opt];
    document.body.appendChild(label);
    document.body.appendChild(document.createElement("br"));
  }

  document.body.appendChild(document.createElement("br"));
}

//Question Logic
//If correct goto next question and add score
//If incorrect goto next question and deduct 5 seconds from clock
