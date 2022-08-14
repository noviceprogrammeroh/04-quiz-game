//Create variables that will access Html elements

var headerDiv = document.querySelector("#header-id");
var startButton = document.querySelector(".start-quiz-button");
var sectionOne = document.querySelector("#section-one");
var questionsElement = document.querySelector("#questions-div");
var answersElement = document.querySelector("#answers-div");
var timeElement = document.querySelector("#timer");
var wrongElementDiv = document.querySelector("#wrong-answer");
var correctElementDiv = document.querySelector("#correct-answer");
var showScore = document.querySelector("#show-score");
var showElement = document.querySelector("#score");
var sectionTwoElement = document.querySelector("#section-two");
var sectionThree = document.querySelector("#section-three");
var paragraphElment = document.querySelector("#paragraph-id");
var sectionInput = document.querySelector("#input-section");
var secondsLeft = 60;
var questionI = 0;
var wrong;
var correct;
var score = 0;

//An event Listener  that will display the timer
startButton.addEventListener("click", function () {
  var timer = setInterval(function () {
    secondsLeft--;
    timeElement.textContent = "Time: " + secondsLeft + " remaining";
    if (secondsLeft === 0) {
      clearInterval(timer);
    }
  }, 1000);

  startQuiz(questionI);
});

//array of object that will hold the questions and answers
var questions = [
  {
    question: "What is JavaScript?",
    answers: ["Text editor", "Programming Language", "Object", "Property"],
    correctAnswer: "Programming Language",
  },

  {
    question: "What is an Array ?",
    answers: [
      "String",
      "Number",
      "A variable that can store multiple values",
      "Object ",
    ],
    correctAnswer: "A variable that can store multiple values",
  },

  {
    question: "What is object?",
    answers: [
      "Dom object",
      "Data structure",
      "Property",
      "A variable that can hold key-value pairs",
    ],
    correctAnswer: "A variable that can hold key-value pairs",
  },
];

var randomArray = [];

var result;


//funtion that start the quiz
function startQuiz(questionI) {
  answersElement.textContent = "";
  for (var i = 0; i < questions.length; i++) {
    let currentQuestion = questions[questionI].question;
    var currentAnswers = questions[questionI].answers;
    questionsElement.textContent = currentQuestion;
  }
  currentAnswers.forEach(function (nextQuestions) {
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    var btn = document.createElement("button");
    btn.setAttribute("id", "ans-btn");
    btn.textContent = nextQuestions;
    li.appendChild(btn);
    ul.appendChild(li);
    answersElement.appendChild(ul);
    li.addEventListener("click", compare);
  });

  startButton.remove();
}

// function that Compares if answer is correct or wrong
function compare(event) {
  var element = event.target;
  if (element.matches("button")) {
    if (element.textContent == questions[questionI].correctAnswer) {
      // this line code increments our score by 10;
      score = score + 10;
    } else {
      console.log("wrong");
      wrongElementDiv.textContent = "Wrong";
      sectionTwoElement.appendChild(wrongElementDiv);

      //subtract the timer
      clearInterval(timer);
      secondsLeft = secondsLeft - 10;
      timeElement.textContent = "Time: " + secondsLeft + " remaining";
    }
  }
  questionI++;
  if (questionI >= questions.length) {
    sectionOne.remove();
    paragraphElment.textContent =
      "You're all done! Your final score is : " + score;
    sectionThree.appendChild(paragraphElment);
    recordInitials();
  } else {
    startQuiz(questionI);
  }
}

// function that records the initials
function recordInitials() {
  var submitBtn = document.createElement("button");
  submitBtn.setAttribute("id", "submit-input-btn");
  submitBtn.textContent = "Submit";
  var spanElement = document.createElement("span");
  spanElement.setAttribute("id", "span-input");
  spanElement.innerHTML = "Enter inititals ";
  var inputHeading = document.createElement("h1");
  inputHeading.setAttribute("id", "input-heading");
  var inputScore = document.createElement("input");
  inputScore.setAttribute("type", "text");
  inputScore.setAttribute("name", "Enter Initials");
  inputScore.setAttribute("label", "Enter initials ");
  inputScore.textContent = "Enter initials ";
  headerDiv.remove();
  wrongElementDiv.remove();
  spanElement.appendChild(inputScore);
  showScore.appendChild(spanElement);
  showScore.appendChild(submitBtn);
  console.log(showScore);
  sectionInput.appendChild(showScore);

  submitBtn.addEventListener("click", displayMessage);
  function displayMessage() {
    paragraphElment.remove();
    inputScore.remove();
    submitBtn.remove();
    spanElement.remove();

    var displayIntialsSection = document.querySelector(
      "#display-initials-message"
    );
    var displayInitalsDiv = document.querySelector("#display-initials");
    var message = inputScore.value;

    if (displayInitalsDiv) {
      displayInitalsDiv.textContent = message;
      displayIntialsSection.appendChild(displayInitalsDiv);
    }

    //create go back and clear buttons
    var gobackBtn = document.createElement("button");
    var gobackDiv = document.querySelector("#div-goback-button-id");
    gobackBtn.setAttribute("id", "goback-button-id");
    gobackBtn.textContent = "Go Back";
    gobackBtn.addEventListener("click",startQuiz);
    gobackDiv.appendChild(gobackBtn);
    displayIntialsSection.appendChild(gobackDiv);

    var clearDiv = document.querySelector("#div-clear-button-id");
    var clearHistoryBtn = document.createElement("button");
    clearHistoryBtn.setAttribute("id", "clear-button-id");
    clearHistoryBtn.textContent = "Clear results";
    clearHistoryBtn.addEventListener("click", clearHistory);
    clearDiv.appendChild(clearHistoryBtn);
    displayIntialsSection.appendChild(clearDiv);

    //function that clear the input
    function clearHistory() {
      displayInitalsDiv.textContent = "";
      console.log("testing");
    }

    startQuiz(questionI);
    clearHistory();

  }



}
