//Create variables that will access Html elements
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
var sectionThree = document.querySelector("#section-three")
var paragraphElment = document.querySelector("#paragraph-id");
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

function startQuiz(questionI) {
  
  answersElement.textContent = "";
  for (var i = 0; i < questions.length; i++) {
    let currentQuestion = questions[questionI].question;
    var currentAnswers = questions[questionI].answers
    questionsElement.textContent = currentQuestion;
  }
  currentAnswers.forEach(function (nextQuestions) {
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    var btn = document.createElement("btn");
    btn.setAttribute('id', 'ans-btn');
    btn.textContent = nextQuestions;
    li.appendChild(btn);
    ul.appendChild(li)
    answersElement.appendChild(ul);
    li.addEventListener("click", compare)
  })

  startButton.remove();
}

// Compare if answer is correct or wrong
function compare(event) {
  var element = event.target;
  if (element.matches('btn')) {
    if (element.textContent == questions[questionI].correctAnswer) {

      console.log("correct")
      correctElementDiv.textContent = "Correct";
      sectionTwoElement.appendChild(correctElementDiv);

      //this line code increments our score by 10;
      score = score + 10;
      showScore.textContent = score;
      //sectionThree.appendChild(showScore);
      addScore(showScore);

    } else {
      console.log("wrong")
      wrongElementDiv.textContent = "Wrong";
      sectionTwoElement.appendChild(wrongElementDiv);


      //subtract the timer
      clearInterval(timer);
      secondsLeft = secondsLeft - 10;
      timeElement.textContent = secondsLeft;
    }

  }
  questionI++
  if (questionI >= questions.length) {
    console.log("finished")
  } else {
    startQuiz(questionI)
  }

}

function addScore(showScore) {
paragraphElment.timeElement="You're all done! Your final score is : " + showScore;
  showElement.appendChild(paragraphElment);


}

// Finsihed function here
// function finished() {


// }
