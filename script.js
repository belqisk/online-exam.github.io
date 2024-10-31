const questions = [
    {
        question: "An obvious fact with siblings is that...",
        options: [
            "A. they seldom see each other as friends",
            "B. they never see each other as close friends",
            "C. they always see each other as enemies",
            "D. they sometimes see each other as competitors"
        ],
        answer: 3,
        explanation: "兄弟姐妹之间有时会产生竞争的关系。"
    },
    {
        question: "Which of the following statements about Paragraph 2 is TRUE?",
        options: [
            "A. The pandemic has made sibling relationships normal.",
            "B. The pandemic has reduced the tension for siblings to do online schooling.",
            "C. The pandemic has helped to make sibling relationships closer.",
            "D. The pandemic has increased the toughness for siblings to get along."
        ],
        answer: 3,
        explanation: "疫情使兄弟姐妹之间更难相处。"
    }
    // Add more questions as needed
];

const quizForm = document.getElementById('quiz-form');
const resultsContainer = document.getElementById('results-container');
const scoreContainer = document.getElementById('score');
const answersContainer = document.getElementById('answers');

// Render questions
function renderQuiz() {
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionText);

        const answersDiv = document.createElement('div');
        answersDiv.classList.add('answers');
        
        q.options.forEach((option, i) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${index}`;
            input.value = i;
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            answersDiv.appendChild(label);
        });

        questionDiv.appendChild(answersDiv);
        quizForm.appendChild(questionDiv);
    });
}

// Calculate score and show explanations
function calculateResults() {
    let score = 0;
    answersContainer.innerHTML = ''; // Reset answers container

    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        const selectedAnswer = selected ? parseInt(selected.value) : null;

        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer');

        if (selectedAnswer === q.answer) {
            score++;
            answerDiv.innerHTML = `<strong>Question ${index + 1}:</strong> Correct! ${q.explanation}`;
        } else {
            answerDiv.innerHTML = `<strong>Question ${index + 1}:</strong> Incorrect. ${q.explanation}`;
        }

        answersContainer.appendChild(answerDiv);
    });

    scoreContainer.textContent = `You scored ${score} out of ${questions.length}`;
    resultsContainer.classList.remove('hidden');
}

// Event listener for submit button
document.getElementById('submit-btn').addEventListener('click', calculateResults);

// Initialize quiz
renderQuiz();

document.querySelectorAll('.question').forEach(question => {
    const button = document.createElement('button');
    button.innerText = '查看答案解析';
    question.appendChild(button);

    button.addEventListener('click', () => {
        const explanation = document.createElement('p');
        explanation.innerText = '这里是答案解析...'; // 添加具体解析内容
        question.appendChild(explanation);
    });
});

