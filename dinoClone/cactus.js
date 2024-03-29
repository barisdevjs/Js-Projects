import { getCustomProperty, incrementCustomProperty, setCustomProperty} from './helpers.js'

const SPEED = .05 // must be same with the ground speed
const CACTUS_INTERVAL_MIN = 500 
const CACTUS_INTERVAL_MAX = 2500
const worldElement = document.querySelector('[data-world]')
const CACTUS_MIN_HEIGHT = 15
const CACTUS_MAX_HEIGHT = 35 


let nextCactusTime 
export function setupCactus() {
    nextCactusTime = CACTUS_INTERVAL_MIN
    document.querySelectorAll('[data-cactus').forEach(cactus => cactus.remove())
}

export function updateCactus( delta, speedScale) {
    document.querySelectorAll('[data-cactus]').forEach( cactus => {
        incrementCustomProperty( cactus, '--left', -delta * speedScale * SPEED)

        if ( getCustomProperty( cactus, '--left') <= -100) {
            cactus.remove()
        } 
    })

     if ( nextCactusTime <= 0) {
        createCactus()
        nextCactusTime = randomNumberBetween( CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
     }
        nextCactusTime -= delta
}


export function getCactusRects() {
    return [...document.querySelectorAll('[data-cactus]')]
    .map(cactus => {
        return cactus.getBoundingClientRect()
    })
}

function createCactus() {
    const cactus = document.createElement('img')
    const height = randomNumberBetween( CACTUS_MIN_HEIGHT, CACTUS_MAX_HEIGHT)
    cactus.dataset.cactus = true
    cactus.classList.add('cactus')
    cactus.src = 'assets/cactus.png'
    cactus.classList.add('cactus') 
    setCustomProperty( cactus, '--left',100)
    setCustomProperty( cactus, '--height',height)
    worldElement.append( cactus) 
}


export function randomNumberBetween( min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



