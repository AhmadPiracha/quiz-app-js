let questions = JSON.parse(localStorage.getItem("questions")) || [];
let score = 0;
let count = 1;
function addQuestion() {
  const questionInput = $("#question");
  const option1Input = $("#option1");
  const option2Input = $("#option2");
  const option3Input = $("#option3");
  const correctInput = $("#correct");

  if (
    !questionInput.val() ||
    !option1Input.val() ||
    !option2Input.val() ||
    !option3Input.val() ||
    !correctInput.val()
  ) {
    alert("Please fill in all fields before submitting.");
    return;
  }

  const data = {
    question: questionInput.val(),
    option1: option1Input.val(),
    option2: option2Input.val(),
    option3: option3Input.val(),
    correct: correctInput.val(),
  };

  console.log(data);

  questions.push(data);

  questionInput.val("");
  option1Input.val("");
  option2Input.val("");
  option3Input.val("");
  correctInput.val("");

  // Save to local storage
  localStorage.setItem("questions", JSON.stringify(questions));

  alert(`
        Question added successfully. 
        Total questions: ${questions.length}
    `);
}

$("#startQuiz").on("click", function () {
  $("#form").hide();
  $("#startQuiz").hide();
  displayQuestions();
});

function displayQuestions() {
  $("#quiz-container").html("");

  if (questions.length > 0) {
    const questionIndex = 0;
    currentQuestion = questions.splice(questionIndex, 1)[0]; // current question

    const output = $("<div>");
    
    output.html(`
    <h3>${count++}. ${currentQuestion.question}</h3>
    <form id="quizForm">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="answer" id="option1" value="${currentQuestion.option1}">
            <label class="form-check-label" for="option1">${currentQuestion.option1}</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="answer" id="option2" value="${currentQuestion.option2}">
            <label class="form-check-label" for="option2">${currentQuestion.option2}</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="answer" id="option3" value="${currentQuestion.option3}">
            <label class="form-check-label" for="option3">${currentQuestion.option3}</label>
        </div>
        <button type="button" onclick="submitAnswer()" class="btn btn-primary">Submit Answer</button>
    </form>
    <p id="result"></p>
    <button id="endQuiz" class="btn btn-danger">End Quiz</button>
`);


    $("#quiz-container").prepend(output);

    $("#endQuiz").on("click", function () {
      $("#form").show();
      $("#startQuiz").show();
      $("#quiz-container").html("");
    });
  } else {
    $("#quiz-container").html(`<h3>Quiz completed. Your final score: ${score}</h3>`);
    $("#form").show();
    $("#startQuiz").show();
  }
}

function submitAnswer() {
  const selected = $('input[name="answer"]:checked');
//   console.log("Selected answer:", selected.val());

  if (!selected.val()) {
    alert("Please select an answer before submitting.");
    return;
  }

  const userAnswer = selected.val();
  const correct = currentQuestion ? currentQuestion.correct : null;

//   console.log("User answer:", userAnswer);
//   console.log("Correct answer:", correct);

  if (userAnswer === correct) {
    $("#result").html("Correct!");
    score += 5;
  } else {
    $("#result").html(`Incorrect Error`);
    alert("Your answer is incorrect. Please try again.");
    return;
  }

    // Display score for the current question and running total
    $("#result").append(`<p>Score for this question: 5</p>`);
    $("#result").append(`<p>Total Score: ${score}</p>`);
  
  displayQuestions();
}
