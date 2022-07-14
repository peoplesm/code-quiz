var scores = [];

// Get stored scores from localStorage
var storedScores = JSON.parse(localStorage.getItem("scores"));

// If scores were retrieved from localStorage, update the scores array to it
if (storedScores !== null) {
  scores = storedScores;
}
//JS specific to the index.html
if (document.body.classList.contains("index")) {
  var body = document.body;
  var main = document.querySelector("main");
  var container = document.querySelector(".container");

  var mainPrompt = document.createElement("div");
  var startButton = document.createElement("button");
  var gameOver = document.createElement("div");
  var correct = document.createElement("div");
  var incorrect = document.createElement("div");

  var timerEl = document.getElementById("timer");
  var quizFieldEl = document.getElementById("quizField");
  var scoreFormContainer = document.getElementById("scoreFormContainer");

  var initialsSubmit = document.getElementById("submit");
  var initialsInput = document.querySelector("#scoreInitials");

  var questionArr = [
    {
      question: "Javascript is an _______ language?",
      choices: [
        "Object-Based",
        "Object-Oriented",
        "Procedural",
        "None of the above",
      ],
      answer: "B. Object-Oriented",
    },
    {
      question:
        "Which of the following is used to define a variable in Javascript?",
      choices: ["var", "let", "const", "All of the above"],
      answer: "D. All of the above",
    },
    {
      question:
        "Which of the following methods is used to access HTML elements using Javascript?",
      choices: [
        "getElementById()",
        "getElementByClassName()",
        "querySelector()",
        "All of the above",
      ],
      answer: "D. All of the above",
    },
    {
      question:
        "Upon encountering empty statements, what does the Javascript Interpreter do?",
      choices: [
        "Throws and error",
        "Gives a warning",
        "Ignores the statements",
        "None of the above",
      ],
      answer: "C. Ignores the statements",
    },
    {
      question:
        "What method(s) can be used to display data in some form using Javascript?",
      choices: [
        "document.write()",
        "console.log()",
        "window.alert",
        "All of the above",
      ],
      answer: "D. All of the above",
    },
    {
      question: "How do you turn an object into a string using JSON?",
      choices: ["JSON.stringify", "JSON.string", "JSON.noodle", "constant"],
      answer: "A. JSON.stringify",
    },
    {
      question:
        "How do you stop a form from clearing before the data can be stored on submit?",
      choices: [
        "event.preventDefault()",
        "event.stop()",
        "event.wait",
        "event.prevent",
      ],
      answer: "A. event.preventDefault()",
    },
    {
      question: "What is NaN?",
      choices: ["Boolean", "Undefined", "Object", "Number"],
      answer: "D. Number",
    },
    {
      question: "What does DOM stand for?",
      choices: [
        "Document Orient Mode",
        "Document Object Mode",
        "Dominate Over Macs",
        "Document Object Model",
      ],
      answer: "D. Document Object Model",
    },
    {
      question: "How do you stop an interval timer in Javascript?",
      choices: [
        "clearInterval",
        "clearTimer",
        "intervalOver",
        "None of the above",
      ],
      answer: "A. clearInterval",
    },
  ];

  var score = 0;
  var timeLeft = 60;

  //Initial Message and Start Button Generation
  mainPrompt.setAttribute(
    "style",
    "display: flex; flex-direction: column; align-items: center; font-size: 125%; font-weight: bold"
  );
  mainPrompt.textContent =
    "Try to answer as many questions in the alotted time. For each question answered correctly you are awared 50 points. For each question answered incorrectly, 5 seconds will be deducted from the clock. Click the button below to begin. Good Luck!";
  container.appendChild(mainPrompt);
  //Start Button
  mainPrompt.appendChild(startButton);
  mainPrompt.setAttribute("class", "mainprompt");
  startButton.setAttribute("class", "startbtn");
  startButton.setAttribute("title", "Start");
  startButton.textContent = "Start";

  //Start Button Starts Timer
  startButton.addEventListener("click", begin);

  //Display Time before start of countdown
  timerEl.textContent = "Time left: " + 60 + " Seconds";

  //hide quizField until button press
  quizFieldEl.setAttribute("style", "display: none");

  //Initials score submit button
  initialsSubmit.addEventListener("click", function (event) {
    event.preventDefault();

    var initScore = {
      initialsInput: initialsInput.value.trim(),
      score: score,
    };
    scores.push(initScore);
    localStorage.setItem("scores", JSON.stringify(scores));
    location.href = "highscores.html";
  });

  //Begin FXN
  function begin() {
    startButton.setAttribute("style", "display: none");
    mainPrompt.setAttribute("style", "display: none");
    quizFieldEl.setAttribute("style", "display");
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
        clearQuiz();

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
      return (answerOneInner.textContent = "A. " + questionArr[i].choices[0]);
    }

    function getAnswerTwo() {
      var answerTwoInner = document.getElementById("answerTwo");
      return (answerTwoInner.textContent = "B. " + questionArr[i].choices[1]);
    }

    function getAnswerThree() {
      var answerThreeInner = document.getElementById("answerThree");
      return (answerThreeInner.textContent = "C. " + questionArr[i].choices[2]);
    }

    function getAnswerFour() {
      var answerFourInner = document.getElementById("answerFour");
      return (answerFourInner.textContent = "D. " + questionArr[i].choices[3]);
    }
  }

  //Question Logic and adding to nextQuestionIndex
  nextQuestionIndex = 1;
  var ansbtn = document.querySelectorAll(".ansbtn");
  ansbtn.forEach((ansbtn) => {
    ansbtn.addEventListener("click", function () {
      for (let index = 0; index < questionArr.length; index++) {
        if (nextQuestionIndex === index + 1) {
          if (ansbtn.textContent === questionArr[index].answer) {
            console.log("Correct");
            score = score + 50;
            correctMsg();
          } else {
            console.log("Incorrect");
            timeLeft = timeLeft - 5;
            incorrectMsg();
          }
        }
      }

      if (nextQuestionIndex < questionArr.length) {
        nextQuestion(nextQuestionIndex);
        nextQuestionIndex++;
      } else {
        clearQuiz();
      }
    });
  });

  //Clear quiz when time is up
  function clearQuiz() {
    quizFieldEl.setAttribute("style", "display: none");
    container.appendChild(gameOver);
    gameOver.setAttribute(
      "style",
      "text-align: center; font-size: 125%; padding: 2px; background-color: darkgray; border-left: solid black; border-right: solid black; padding: 3px;"
    );
    gameOver.textContent = `Game Over! You scored ${score}`;
    scoreFormContainer.setAttribute(
      "style",
      "display: block; text-align: center"
    );
  }

  //Correct popup
  function correctMsg() {
    quizFieldEl.appendChild(correct);
    correct.setAttribute(
      "style",
      "text-align: center; font-size: 125%; padding-top 10px"
    );
    correct.textContent = "CORRECT +50 points!";
    setTimeout(function () {
      correct.textContent = "";
    }, 1500);
  }

  //Incorrect popup
  function incorrectMsg() {
    quizFieldEl.appendChild(incorrect);
    incorrect.setAttribute(
      "style",
      "text-align: center; font-size: 125%; padding-top 10px"
    );
    incorrect.textContent = "INCORRECT - 5 seconds!";
    setTimeout(function () {
      incorrect.textContent = "";
    }, 2000);
  }
}

//High Score Page back button and reset button
if (document.body.classList.contains("highScores")) {
  var scoreList = document.querySelector(".scoreList");
  var backBtn = document.querySelector("#back");
  backBtn.addEventListener("click", function () {
    location.href = "index.html";
  });
  var resetBtn = document.querySelector("#reset");
  resetBtn.addEventListener("click", function () {
    localStorage.clear();
    location.href = "highscores.html";
  });
  for (let i = 0; i < scores.length; i++) {
    var li = document.createElement("li");
    li.textContent = `${scores[i].initialsInput}: ${scores[i].score}`;
    li.setAttribute("data-index", i);
    scoreList.appendChild(li);
  }
}
