document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-btn');
    const resultsContainer = document.getElementById('results');
    const examSelector = document.getElementById('exam-selector');

    // Add exam options
    for (let i = 1; i <= 20; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Exam ${i}`;
        examSelector.appendChild(option);
    }

    // Event listener for exam selection
    examSelector.addEventListener('change', function() {
        if (this.value) {
            loadExam(this.value);
        } else {
            quizContainer.innerHTML = '<p>Please select an exam.</p>';
        }
    });

    function loadExam(examNumber) {
        // Here you would typically load the exam data from a server
        // For this example, we'll just use the existing exam data
        renderExam(exam);
    }

    function renderExam(examData) {
        let html = '';

        // Render Reading Comprehension
        html += '<h2>Reading Comprehension (30 points)</h2>';
        examData.reading.passages.forEach((passage, passageIndex) => {
            html += `<div class="passage">${passage}</div>`;
            html += `<h3>Passage ${passageIndex + 1} Questions</h3>`;
            examData.reading.questions.slice(passageIndex * 5, (passageIndex + 1) * 5).forEach((question, questionIndex) => {
                html += renderQuestion(question, `reading${passageIndex * 5 + questionIndex}`, questionIndex + 1);
            });
        });

        // Render Vocabulary and Structure
        html += '<h2>Vocabulary and Structure (20 points)</h2>';
        examData.vocabularyAndStructure.forEach((question, index) => {
            html += renderQuestion(question, `vocab${index}`, index + 1);
        });

        // Render Identification
        html += '<h2>Identification (20 points)</h2>';
        examData.identification.forEach((question, index) => {
            html += renderQuestion(question, `ident${index}`, index + 1);
        });

        // Render Cloze
        html += '<h2>Cloze (10 points)</h2>';
        html += `<div class="passage">${examData.cloze.passage}</div>`;
        examData.cloze.questions.forEach((question, index) => {
            html += renderQuestion(question, `cloze${index}`, index + 1);
        });

        // Render Translation
        html += '<h2>Translation (20 points)</h2>';
        html += '<h3>English to Chinese</h3>';
        examData.translation.englishToChinese.forEach((item, index) => {
            html += renderTranslationQuestion(item, `etoc${index}`, index + 1);
        });
        html += '<h3>Chinese to English</h3>';
        examData.translation.chineseToEnglish.forEach((item, index) => {
            html += renderTranslationQuestion(item, `ctoe${index}`, index + 6);
        });

        quizContainer.innerHTML = html;
    }

    function renderQuestion(question, name, number) {
        return `
            <div class="question" id="${name}">
                <p>${number}. ${question.question}</p>
                ${question.options.map((option, optionIndex) => `
                    <label>
                        <input type="radio" name="${name}" value="${optionIndex}">
                        ${option}
                    </label>
                `).join('')}
                <div class="explanation hidden">${question.explanation}</div>
            </div>
        `;
    }

    function renderTranslationQuestion(item, name, number) {
        return `
            <div class="translation-question" id="${name}">
                <p>${item.question}</p>
                <textarea name="${name}" rows="3" cols="50"></textarea>
                <div class="explanation hidden">${item.explanation}</div>
            </div>
        `;
    }

    function calculateScore() {
        let score = 0;
        let wrongQuestions = [];

        // 计算选择题分数
        const sections = [
            {questions: exam.reading.questions, prefix: 'reading', weight: 2, total: 30},  // 30分，15题，每题2分
            {questions: exam.vocabularyAndStructure, prefix: 'vocab', weight: 2/3, total: 20},  // 20分，30题，每题2/3分
            {questions: exam.identification, prefix: 'ident', weight: 2, total: 20},  // 20分，10题，每题2分
            {questions: exam.cloze.questions, prefix: 'cloze', weight: 0.5, total: 10}  // 10分，20题，每题0.5分
        ];

        sections.forEach(section => {
            section.questions.forEach((question, index) => {
                const questionElement = document.getElementById(`${section.prefix}${index}`);
                const selectedOption = questionElement.querySelector(`input[name="${section.prefix}${index}"]:checked`);
                if (selectedOption && parseInt(selectedOption.value) === question.correctAnswer) {
                    score += section.weight;
                } else {
                    wrongQuestions.push(`${section.prefix}${index}`);
                    questionElement.classList.add('wrong');
                    questionElement.querySelector('.explanation').classList.remove('hidden');
                }
            });
        });

        // 计算翻译题分数
        score += calculateTranslationScore(exam.translation.englishToChinese, 'etoc', 2, wrongQuestions);
        score += calculateTranslationScore(exam.translation.chineseToEnglish, 'ctoe', 2, wrongQuestions);

        return {score, wrongQuestions};
    }

    function calculateTranslationScore(questions, prefix, weightPerQuestion, wrongQuestions) {
        let score = 0;
        questions.forEach((item, index) => {
            const questionElement = document.getElementById(`${prefix}${index}`);
            const userAnswer = questionElement.querySelector(`textarea[name="${prefix}${index}"]`).value.trim();
            const correctAnswer = item.correctAnswer.trim();
            const similarity = calculateStringSimilarity(userAnswer, correctAnswer);
            if (similarity < 0.7) {  // 假设相似度低于0.7认为是错误
                wrongQuestions.push(`${prefix}${index}`);
                questionElement.classList.add('wrong');
                questionElement.querySelector('.explanation').classList.remove('hidden');
            }
            score += similarity * weightPerQuestion;
        });
        return score;
    }

    function calculateStringSimilarity(str1, str2) {
        const set1 = new Set(str1);
        const set2 = new Set(str2);
        const intersection = new Set([...set1].filter(x => set2.has(x)));
        const union = new Set([...set1, ...set2]);
        return intersection.size / union.size;
    }

    submitButton.addEventListener('click', function() {
        const {score, wrongQuestions} = calculateScore();
        resultsContainer.innerHTML = `
            <p>你的得分是: ${score.toFixed(2)} / 100</p>
            <p>错题数量: ${wrongQuestions.length}</p>
            <button id="show-wrong-questions">查看错题</button>
        `;

        document.getElementById('show-wrong-questions').addEventListener('click', function() {
            wrongQuestions.forEach(id => {
                const element = document.getElementById(id);
                element.scrollIntoView({behavior: 'smooth'});
            });
        });
    });

    // Initial state
    quizContainer.innerHTML = '<p>Please select an exam to begin.</p>';
});
