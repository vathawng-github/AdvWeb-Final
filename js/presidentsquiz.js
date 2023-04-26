const questions = [
    {
        question: "Who was the first American Born President?",
        answers: [
            {text: "John Quincy Adams", correct: false},
            {text: "Martin Van Buren", correct: true},
            {text: "Ulyesses Grant", correct: false},
            {text: "Abraham Lincoln", correct: false},
        ]
    },
    {
        question: "Which President made Mother's Day a Holiday?",
        answers: [
            {text: "Calvin Coolidge", correct: false},
            {text: "William Taft", correct: false},
            {text: "Woodrow Wilson", correct: true},
            {text: "Theodore Roosevelt", correct: false},
        ]
    },
    {
        question: "Who was the only president to serve non-consecutive terms?",
        answers: [
            {text: "William McKinley", correct: false},
            {text: "Benjamin Harrison", correct: false},
            {text: "Chester Arthur", correct: false},
            {text: "Grover Cleveland", correct: true},
        ]
    },
    {
        question: "Which president is distantly related to 11 other presidents?",
        answers: [
            {text: "Franklin Roosevelt", correct: true},
            {text: "Herbert Hoover", correct: false},
            {text: "Harry Truman", correct: false},
            {text: "Dwight Eisenhower", correct: false},
        ]
    },
    {
        question: "Which president turned down offers to play NFL football?",
        answers: [
            {text: "Gerald Ford", correct: true},
            {text: "Jimmy Carter", correct: false},
            {text: "Ronald Reagan", correct: false},
            {text: "George Bush", correct: false},
        ]
    },
    {
        question: "Who is the tallest president?",
        answers: [
            {text: "Barack Obama", correct: false},
            {text: "Donald Trump", correct: false},
            {text: "Bill Clinton", correct: false},
            {text: "Abraham Lincoln", correct: true},
        ]
    },
    {
        question: "Who is the shortest president?",
        answers: [
            {text: "Thomas Jefferson", correct: false},
            {text: "James Madison", correct: true},
            {text: "James Monroe", correct: false},
            {text: "John Tyler", correct: false},
        ]
    },
    {
        question: "Which president was the first to have a telephone in the White House?",
        answers: [
            {text: "Rutherford Hayes", correct: true},
            {text: "James Garfield", correct: false},
            {text: "William McKinley", correct: false},
            {text: "Herbert Hoover", correct: false},
        ]
    },
    {
        question: "Which president was the first to ride a helicopter?",
        answers: [
            {text: "Jimmy Carter", correct: false},
            {text: "George Bush", correct: false},
            {text: "Dwight Eisenhower", correct: true},
            {text: "Joe Biden", correct: false},
        ]
    },
    {
        question: "Which president was the first to throw the first ceremonial pitch at an MLB game?",
        answers: [
            {text: "Franklin Pierce", correct: false},
            {text: "James Buchanan", correct: false},
            {text: "William Taft", correct: true},
            {text: "Millard Fillmore", correct: false},
        ]
    }
];

const questionElement = document.querySelector("#question");
const answerButton = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz () {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestion + 1;
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Retake";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
