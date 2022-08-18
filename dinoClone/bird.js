import { getCustomProperty, incrementCustomProperty, setCustomProperty} from './helpers.js'
import { randomNumberBetween } from './cactus.js'

const SPEED = .05 // must be same with the ground speed
const BIRD_INTERVAL_MIN = 1000 
const BIRD_INTERVAL_MAX = 5000
const worldElement = document.querySelector('[data-world]')
const BIRD_MIN_WIDTH = 15


let nextBirdTime 
export function setupBird() {
    nextBirdTime = BIRD_INTERVAL_MAX
    document.querySelectorAll('[data-bird').forEach(bird => bird.remove())
}

export function updateBird( delta, speedScale) {
    document.querySelectorAll('[data-bird]').forEach( bird => {
        incrementCustomProperty( bird, '--left', -delta * speedScale * SPEED)

        if ( getCustomProperty( bird, '--left') <= -100) {
            bird.remove()
        } 
    })

     if ( nextBirdTime <= 0) {
        createBird()
        nextBirdTime = randomNumberBetween( BIRD_INTERVAL_MIN, BIRD_INTERVAL_MAX) / speedScale
     }
        nextBirdTime -= delta
}


export function getBirdRects() {
    return [...document.querySelectorAll('[data-bird]')]
    .map(bird => {
        return bird.getBoundingClientRect()
    })
}

function createBird() {
    const bird = document.createElement('img')
    const width = BIRD_MIN_WIDTH
    bird.dataset.bird = true
    bird.classList.add('bird')
    bird.src = 'assets/Bird1.png'
    bird.classList.add('bird') 
    setCustomProperty( bird, '--left',100)
    setCustomProperty( bird, '--height',width)
    worldElement.append( bird) 
}





