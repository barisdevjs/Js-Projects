const startButton = document.getElementById('start-button');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons'); // ans buttons container in html
const nextButton = document.getElementById('next-button');
const title = document.querySelector('.title');
let score = 0;
let shuffledQuestions, currentQuestionIndex 

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
startButton.classList.add('hide');
questionContainer.classList.remove('hide');
shuffledQuestions = questions.sort(() => Math.random() - .5);
currentQuestionIndex = 0;
setNextQuestion();
}

function setNextQuestion() {
    resetState(); // clearing all the page before showing the next question
    showQuestion(shuffledQuestions[currentQuestionIndex]); // it shows a random question from the array
}

function showQuestion(question) {
title.innerHTML = currentQuestionIndex + 1 + ' / ' + questions.length;
 questionElement.innerText = question.question;
 question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        } 
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() { // after picking the answer removes the next button
    clearStatusClass(document.body);
     nextButton.classList.add('hide');
     while (answerButtonsElement.firstChild /*if there is a child remove it */) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectAnswer = e.target;
    const correct = selectAnswer.dataset.correct; // dataset is a property of the html element
                                                 //  questions.question.answers.correct == true
    setStatusClass(document.body, correct);    
    const x =Array.from(answerButtonsElement.children); // this will convert the node list to array
    x.forEach(button => { 
        setStatusClass(button, button.dataset.correct);
    });

    if ( correct === 'true') { //  WE are checking the questions.question.answers.correct 
        score++;
    }

    if (shuffledQuestions.length > currentQuestionIndex + 1) { // if there is a next question to ask
        setTimeout(() => {
            nextButton.classList.remove('hide');
    }, 400); // show the next button
    } else {                                         
        startButton.innerText = 'Restart';     
        startButton.classList.remove('hide'); // show the start button
        title.innerHTML = `You got ${score * 25} out of ${questions.length * 25} points`;
        score = 0;
        clearStatusClass(document.body);
        
    } 
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: "What is '2' + '2' ?",
        answers: [
            { text: '22', correct: true },
            { text: '4', correct: false },
        ]
    }, 
    {
        question: "What is the capital of Turkey ?",
        answers: [
            { text: 'Istanbul', correct: false },
            { text: 'Ankara', correct: true },
        ]
    },
    {
        question: "What is the wrong  practicing way of learning ?",
        answers: [
            { text: 'Codewars', correct: false },
            { text: 'Leetcode', correct: false },
            { text: 'Hackerrank', correct: false },
            { text: 'Copy and paste smn\'s project', correct: true }
        ]
    },
    {
        question: "Who is the best CSS youtube teacher ?",
        answers: [
            { text: 'Kevin Powell', correct: true },
            { text: 'Kyle Cook', correct: false },
            { text: 'Ania Kubow', correct: false },
            { text: 'Dev Ed', correct: false },
        ]
    },

]