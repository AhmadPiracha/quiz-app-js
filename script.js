var questions = JSON.parse(localStorage.getItem("questions")) || [];
var score = 0;
var timer;
var currentQuestion = 0;

$("#optSelect").on("change", function () {
  updateOptions();
});

$("#questionsCount").text(function () {
  $("#questionsCount").html(`Questions Avalible: <b>${questions.length}</b>`);

  console.log(questions.length);
});

function mainMenu() {
  clearInterval(timer);
  $("#form").show();
  $("#startQuiz").show();
  $("#quiz-container").html("");
}

function addQuestion() {
  const options = [];
  const questionInput = $("#question");
  const optionsSelect = $("#optSelect").val();
  const displayOptionsContainer = $("#containerOptions");
  const correctAnswer = $("#correct");

  if (!questionInput.val() || !correctAnswer.val()) {
    alert("Please fill in all fields before submitting.");
    return;
  }

  for (let i = 1; i <= optionsSelect; i++) {
    const optionValue = $(`#option${i}`).val();

    if (!optionValue) {
      alert(`Please fill in Option ${i} before submitting.`);
      return;
    }

    options.push(optionValue);
  }

  if (optionsSelect === 0) {
    alert("Please select the number of options before submitting.");
    return;
  }

  if (!options.includes(correctAnswer.val())) {
    alert("The correct answer must be one of the provided options.");
    return;
  }

  const data = {
    question: $("#question").val(),
    options: options,
    correct: $("#correct").val(),
  };

  console.log(data);

  questions.push(data);

  questionInput.val("");
  displayOptionsContainer.find("input").val("");
  $("#optSelect").val(0);
  displayOptionsContainer.empty();
  correctAnswer.val("");

  // Save to local storage
  localStorage.setItem("questions", JSON.stringify(questions));

  alert(`
    Question added successfully. Total questions: ${questions.length}`);
}

function displayQuestions() {
  reset();
  $("#quiz-container").html("");
  if (questions.length > 0) {
    // get the current value from list
    // currentQuestion = questions.splice(0, 1)[0];

    // get random value from list
    currentQuestion = questions.splice(
      Math.floor(Math.random() * questions.length),
      1
    )[0];

    console.log(currentQuestion);

    const diplayQuestions = $("<div>");

    diplayQuestions.html(`
          <h3>${currentQuestion.question}</h3>
          <form id="quizForm">
          <p id="timer" class="mt-3"></p>
              ${currentQuestion.options
                .map(
                  (option, index) => `
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="answer" id="option${
                        index + 1
                      }" value="${option}">
                      <label class="form-check-label" for="option${
                        index + 1
                      }">${option}</label>
                  </div>`
                )
                .join("")}
              <button type="button" onclick="submitAnswer()" class="btn btn-primary ms-2">Submit Answer</button>
          </form>
          <br/>
          <button id="endQuiz" 
              class="btn btn-danger ms-2" onclick="endQuizFun()">
              End Quiz
          </button>
      `);

    $("#quiz-container").append(diplayQuestions);
  } else {
    const displayResult = $("<div>");

    displayResult.append(`
    <h3>Your final score: ${score}</h3>
    ${currentQuestion.options
      .map(
        (question, index) => `
        <h4>Question ${index + 1}: ${question}</h4>
        
        <p>Correct Answer: ${question.correct}</p>
        `
      )
      .join("")}

    `);

    displayResult.append(`
  <button id="mainMenu" onclick="mainMenu()" class="btn btn-primary">Menu</button>
`);

    $("#quiz-container").append(displayResult);
  }
}

function startTimer() {
  var timeRemaining = 15;
  timer = setInterval(function () {
    $("#timer").text("Time remaining: " + timeRemaining + "s");
    if (timeRemaining === 0) {
      reset();
      displayQuestions();
    }
    timeRemaining--;
  }, 1000);
}

function reset() {
  clearInterval(timer);
  startTimer();
}

function startQuizFun() {
  if (questions.length == 0) {
    alert("No Quiz Found");
    $("#form").show();
  } else {
    $("#form").hide();
    $("#startQuiz").hide();
    displayQuestions();
    $("#timer").text("Time remaining: 15s");
    reset();
  }
}

function endQuizFun() {
  console.log("end called");
  clearInterval(timer);
  $("#form").show();
  $("#startQuiz").show();
  $("#quiz-container").html("");
}

function submitAnswer() {
  const selected = $('input[name="answer"]:checked');

  if (!selected.val()) {
    alert("Please select an answer before submitting.");
    return;
  }
  const userAnswer = selected.val();
  const correct = currentQuestion ? currentQuestion.correct : null;

  if (userAnswer === correct) {
    score += 5;
    reset();
  }
  displayQuestions();
}

function updateOptions() {
  const optionSelect = $("#optSelect").val();
  const displayOptionsContainer = $("#containerOptions");

  displayOptionsContainer.html("");
  for (let i = 1; i <= optionSelect; i++) {
    displayOptionsContainer.append(`
      <div class="mb-3">
        <input type="text" class="form-control" id="option${i}" name="option${i}" placeholder="Enter Option ${i}" required />
      </div>`);
  }
}

function deleteData() {
  localStorage.clear();
}
