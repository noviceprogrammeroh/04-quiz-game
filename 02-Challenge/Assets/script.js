//Create variables that will access Html elements
var startButton = document.querySelector(".start-quiz-button");
var sectionOne = document.querySelector("#section-one");
var questionsElement = document.querySelector("#questions-div");
var answersElement = document.querySelector("#answers-div");
var timeElement = document.querySelector("#timer");
var wrongElementDiv = document.querySelector("#wrong-answer");
var correctElementDiv = document.querySelector("#correct-answer");
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

//A function that will contain the object

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

//create random variable
//     for(var i = 0; i < questions.length; i++) {
//     var random = Math.floor(Math.random()*questions.length);
//     questions += questions[random];
//     console.log("first for loop: " + questions);
//   }

//console.log(questions[0].correctAnswer)

function startQuiz(questionI) {
  answersElement.textContent = "";
  for (var i = 0; i < questions.length; i++) {
    let currentQuestion = questions[questionI].question;
    var currentAnswers = questions[questionI].answers
    questionsElement.textContent = currentQuestion;
  }
  currentAnswers.forEach(function(nextQuestions) {
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    li.textContent = nextQuestions;
    answersElement.appendChild(ul)
    ul.appendChild(li)
    li.addEventListener("click", compare)
  })
  
  startButton.remove();
}



// Compare if answer is correct or wrong
function compare(event) {
  let element = event.target;
  if (element.matches('li')) {
    if (element.textContent == questions[questionI].correctAnswer) {
      console.log("correct")
    } else {
      console.log("wrong")
    }
  }
  questionI++
  if(questionI >= questions.length) {
    console.log("finished")
  } else {
    startQuiz(questionI)
  }

}

// Finsihed function here
function finished() {

}
