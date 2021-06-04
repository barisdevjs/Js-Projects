let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBooard_div = document.querySelector('.score-board')
const result_p = document.querySelector('.result > p')
const rock_div = document.getElementById('r')
const paper_div = document.getElementById('p')
const scissors_div = document.getElementById('s')

function getComputerChoice() {
    const choices = ['r', 'p', 's'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber]
}

const convertToWord = (letter) => {
    if( letter === 'r' ) return 'Rock'
    if( letter === 'p' ) return 'Paper'
    return 'Scissors'
}

const win = (userChoice, computerChoice) => {
    const userChoice_div = document.getElementById(userChoice)  // You are selecting a div which is also selected in main() ***
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = convertToWord(userChoice) + ' beats ' + convertToWord(computerChoice) + ' You win!';
    userChoice_div.classList.add('green');
    setTimeout(() => userChoice_div.classList.remove('green'), 300)
}

const lose = (userChoice, computerChoice) => {
    const userChoice_div = document.getElementById(userChoice)
    computerScore++
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = convertToWord(userChoice) + ' loses to ' + convertToWord(computerChoice) + ' You LOST!';
    userChoice_div.classList.add('red');
    setTimeout(() => userChoice_div.classList.remove('red'), 300)
}

const draw = (userChoice, computerChoice) => {
    const userChoice_div = document.getElementById(userChoice)
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = convertToWord(userChoice).sub() + '  =  '.sub() + convertToWord(computerChoice).sub() + '   ====>   DRAW' ;
    userChoice_div.classList.add('gray');
    setTimeout(() => userChoice_div.classList.remove('gray'), 300)
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case 'rs':
        case 'pr':
        case 'sp':
        win(userChoice, computerChoice);
        break;
        
        case 'rp':
        case 'ps':
        case 'sr':
        lose(userChoice, computerChoice);
        break;
        
        case 'rr':
        case 'pp':
        case 'ss':
        draw(userChoice, computerChoice);
        break;
    }
}


function main() {
    rock_div.addEventListener('click', () => game('r'))
    
    paper_div.addEventListener('click', () => game('p'))
    
    scissors_div.addEventListener('click', () => game('s'))
}

main()