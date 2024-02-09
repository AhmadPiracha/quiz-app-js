let questions = JSON.parse(localStorage.getItem('questions')) || [];

function addQuestion() {
    const questionInput = $('#question');
    const option1Input = $('#option1');
    const option2Input = $('#option2');
    const option3Input = $('#option3');
    const correctInput = $('#correct');

    // Validate inputs
    if (!questionInput.val() || !option1Input.val() || !option2Input.val() || !option3Input.val() || !correctInput.val()) {
        alert('Please fill in all fields before submitting.');
        return;
    }

    const data = {
        question: questionInput.val(),
        option1: option1Input.val(),
        option2: option2Input.val(),
        option3: option3Input.val(),
        correct: correctInput.val()
    };

    console.log(data);

    questions.push(data);

    // Clear input fields
    questionInput.val('');
    option1Input.val('');
    option2Input.val('');
    option3Input.val('');
    correctInput.val('');

    // Save to local storage
    localStorage.setItem('questions', JSON.stringify(questions));

    alert(`
        Question added successfully. 
        Total questions: ${questions.length}
    `);
}

$('#startQuiz').on('click', function() {
    $('#form').hide();
    $('#startQuiz').hide();
    displayQuestions();
});

function displayQuestions() {
    $('#quiz-container').html('');

    if (questions.length > 0) {
        const questionIndex = 0; 
        currentQuestion = questions.splice(questionIndex, 1)[0]; // Set the current question

        const div = $('<div>');
        div.html(`
            <h3>${questions.length + 1}. ${currentQuestion.question}</h3>
            <form id="quizForm">
                <input type="radio" name="answer" value="${currentQuestion.option1}">${currentQuestion.option1}<br>
                <input type="radio" name="answer" value="${currentQuestion.option2}">${currentQuestion.option2}<br>
                <input type="radio" name="answer" value="${currentQuestion.option3}">${currentQuestion.option3}<br>
                <button type="button" onclick="submitAnswer()" class="btn btn-primary">Submit Answer</button>
            </form>
            <p id="result"></p>
            <button id="endQuiz" class="btn btn-danger">End Quiz</button>
        `);

        $('#quiz-container').prepend(div);

        $('#endQuiz').on('click', function() {
            $('#form').show();
            $('#startQuiz').show();
            $('#quiz-container').html('');
        });
    } else {
        $('#quiz-container').html('<h3>Quiz completed. No more questions.</h3>');
        $('#form').show();
        $('#startQuiz').show();
    }
}

function submitAnswer() {
    const selectedAnswer = $('input[name="answer"]:checked');
    console.log('Selected answer:', selectedAnswer.val());

    if (!selectedAnswer.val()) {
        alert('Please select an answer before submitting.');
        return;
    }

    const userAnswer = selectedAnswer.val();
    const correctAnswer = currentQuestion ? currentQuestion.correct : null;

    console.log('User answer:', userAnswer);
    console.log('Correct answer:', correctAnswer);

    if (userAnswer === correctAnswer) {
        $('#result').html('Correct!');
    } else {
        $('#result').html(`Incorrect Error`);
        alert('Your answer is incorrect. Please try again.');
        return;
    }

    displayQuestions();
}
