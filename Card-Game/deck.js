const SUITS = ['♠','♥','♦','♣']
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J','Q','K']

export default class Deck {
    constructor(cards = freshDeck( )) {
        this.cards = cards
    }

    get numberOfCards() {
        return this.cards.length
    }

    shuffle() {
        for (let i = this.numberOfCards -1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() *(i+1)) // random index
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue    
        }
    }
}

class Card {
    constructor(suit,value) {
        this.suit = suit
        this.value = value
    }

    get color() {
        return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red' 
    }

    getHTML() {
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = this.suit
        cardDiv.classList.add('card' , this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }
}
/* 
<div class="card red" data-value='♥9'>
♥
</div>
 */
function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit,value)
        })
    })
}