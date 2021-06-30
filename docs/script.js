import Deck from "./deck.js";

const CARD_VALUE_MAP = {
    '2' : 2,
    '3' : 3,
    '4' : 4,
    '5' : 5,
    '6' : 6,
    '7' : 7,
    '8' : 8,
    '9' : 9,
    '10' : 10,
    'J' : 11,
    'Q' : 12,
    'K' : 13,
    'A' : 14
}

const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const computerDeckElement = document.querySelector('.computer-deck')
const playerDeckElement = document.querySelector('.player-deck')
const text = document.querySelector('.text')

let computerDeck, playerDeck,inRound,stop;

document.addEventListener('click', () => {
    if (stop) {
        startGame()
        return
    }

    if (inRound) {
        cleanBeforeRound()
    } else {
        flipCards()
    }
})

startGame()
function startGame() {
    const deck = new Deck()
    deck.shuffle()
    
    const middle = Math.ceil(deck.numberOfCards / 2)
    playerDeck = new Deck(deck.cards.slice(0,  middle))
    computerDeck = new Deck(deck.cards.slice(middle, deck.numberOfCards))
    inRound = false
    stop = false
    cleanBeforeRound()
}

function cleanBeforeRound() {
    inRound = false
    computerCardSlot.innerHTML = ''
    playerCardSlot.innerHTML = ''
    text.innerHTML = ''
    
    updateDeckCount()
}

function flipCards() {
    inRound = true
    
    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()
    
    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())
    
    updateDeckCount()

    if (isRoundWinner(playerCard, computerCard)) {
        text.innerHTML ='WIN     😁'
        text.style.color = 'white'
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    } else if (isRoundWinner(computerCard,playerCard)) {
        text.innerHTML = 'LOST!    😭'
        text.style.color = 'red'
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
    } else {
        text.innerHTML = 'DRAW     😑'
        text.style.color = 'black'
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }

    if (isGameOver(playerDeck)) {
        text.innerHTML = 'GAME Over!!!'
        stop = true
    } else if (isGameOver(computerDeck)) {
        text.innerHTML = 'YOU WON THE GAME'
        stop = true
    }
}

function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCards
    playerDeckElement.innerText = playerDeck.numberOfCards

}

function isRoundWinner(cardOne, cardTwo) { 
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]

}

function isGameOver(deck) {
    return deck.numberOfCards === 0
}