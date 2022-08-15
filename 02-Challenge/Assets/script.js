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
var inputScore = document.createElement("input");
var submitBtn = document.createElement("button");
var spanElement = document.createElement("span");
var displayInitalsDiv = document.querySelector("#display-initials");
var question;
var currentQuestion;

//this code is for the input section
var inputText = document.querySelector("#input-id");
var form = document.querySelector("#form-id");
var todoBtn = document.querySelector("#submit-button-id");
var unList = document.querySelector("#ul-elements-id");
var spanCountElement = document.querySelector("#score-count");
var divCard = document.querySelector("#card-id");
var cardIdSection = document.querySelector("#card-section-id");
var InitalsSpan = document.querySelector("#initials-span-id");
var cardParagraph = document.querySelector("#card-paragraph-id");

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
    question: "What is an Array?",
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

//funtion that start the quiz
function startQuiz(questionI) {

  answersElement.textContent = "";

  for (var i = 0; i < questions.length; i++) {
    var currentQuestion = questions[questionI].question;
    //console.log("current question variable ",currentQuestion)
    var currentAnswers = questions[questionI].answers;
    questionsElement.textContent = currentQuestion;

  }

  currentAnswers.forEach(function (nextQuestions) {
    var ul = document.createElement("ul");
    ul.setAttribute("id", "start-ul");
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
      wrongElementDiv.textContent = "WRONG!";
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
    console.log("this is the paragraphElement: ", paragraphElment);
    divCard.style.display = "block";

    renderListOfScores();
  } else {
    startQuiz(questionI);
  }
}

var inputArray = [];

//This conder renders a list of scores entered
function renderListOfScores() {

  unList.innerHTML = "";
 
  InitalsSpan.textContent = console.log(spanCountElement);

  // Render a new li for each todo
  for (var i = 0; i < inputArray.length; i++) {

    var record = inputArray[i];

    if(inputText === paragraphElment) {
      spanCountElement.textContent=paragraphElment;
    }

    var liRenderElement = document.createElement("li");
    liRenderElement.setAttribute("id", "li-render-element-id");
    liRenderElement.textContent = record;
    liRenderElement.textContent=record + " " +  spanCountElement;
    liRenderElement.setAttribute("data-index", i);

    var clearButton = document.createElement("button");
    clearButton.setAttribute("id", "clear-render-btn");

    clearButton.textContent = "Clear";
    cardParagraph.textContent="";
    
    liRenderElement.appendChild(clearButton);
    cardParagraph.appendChild(spanCountElement);
    unList.appendChild(liRenderElement);

  }

}


function initialize() {

  var storedItems = JSON.parse(localStorage.getItem("todos"));

  if (storedItems !== null) {
    inputArray = storedItems;
  }


  renderListOfScores();
}

function storeInputs() {
  
  localStorage.setItem("todos", JSON.stringify(inputArray));
}


form.addEventListener("submit", function (event) {
  event.preventDefault();

  var input = inputText.value.trim();


  if (input === "") {
    return;
  }


  inputArray.push(input);
  inputText.value = "";


  storeInputs();
  renderListOfScores();
});


unList.addEventListener("click", function (event) {
  var element = event.target;

  if (element.matches("button") === true) {
    
    var index = element.parentElement.getAttribute("data-index");
    inputArray.splice(index, 1);


    storeInputs();
    renderListOfScores();
  }
});


initialize();
