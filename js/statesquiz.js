const questions = [
    {
        question: "Which state has the biggest population?",
        answers: [
            {text: "Texas", correct: false},
            {text: "California", correct: true},
            {text: "Florida", correct: false},
            {text: "New York", correct: false},
        ]
    },
    {
        question: "What is the capital city of California?",
        answers: [
            {text: "Santa Fe", correct: false},
            {text: "Columbus", correct: false},
            {text: "Sacramento", correct: true},
            {text: "Raleigh", correct: false},
        ]
    },
    {
        question: "Which state has the smallest land mass?",
        answers: [
            {text: "New Hampshire", correct: false},
            {text: "Maryland", correct: false},
            {text: "Maine", correct: false},
            {text: "Rhode Island", correct: true},
        ]
    },
    {
        question: "What state is the Grand Canyon located in?",
        answers: [
            {text: "Arizona", correct: true},
            {text: "New Mexico", correct: false},
            {text: "Utah", correct: false},
            {text: "Colorado", correct: false},
        ]
    },
    {
        question: "What state has the smallest population?",
        answers: [
            {text: "Wyoming", correct: true},
            {text: "Virginia", correct: false},
            {text: "Ohio", correct: false},
            {text: "Oregon", correct: false},
        ]
    },
    {
        question: "What state is Yellowstone National Park located in?",
        answers: [
            {text: "Mississippi", correct: false},
            {text: "North Dakota", correct: false},
            {text: "Nebraska", correct: false},
            {text: "Wyoming", correct: true},
        ]
    },
    {
        question: "What state can you shop at the Mall of America in?",
        answers: [
            {text: "Texas", correct: false},
            {text: "Minnesota", correct: true},
            {text: "North Carolina", correct: false},
            {text: "Florida", correct: false},
        ]
    },
    {
        question: "What state has the largest land mass?",
        answers: [
            {text: "Alaska", correct: true},
            {text: "Texas", correct: false},
            {text: "California", correct: false},
            {text: "South Dakota", correct: false},
        ]
    },
    {
        question: "What state has the capital city of Helena?",
        answers: [
            {text: "Minnesota", correct: false},
            {text: "South Dakota", correct: false},
            {text: "Montana", correct: true},
            {text: "Oregon", correct: false},
        ]
    },
    {
        question: "What state can you find Times Square in?",
        answers: [
            {text: "New Jersey", correct: false},
            {text: "Connecticut", correct: false},
            {text: "New York", correct: true},
            {text: "Maine", correct: false},
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