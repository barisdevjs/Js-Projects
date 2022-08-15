import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty
} from "./helpers.js";

const dino = document.querySelector('[data-dino]');
const JUMP_SPEED = .35
const GRAVITY = .0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100 // 10 per secs


let isJumping, dinoFrameTime, currentFrameTime, yVelocity


export function setupDino() {
    isJumping = false;
    dinoFrameTime = 0;
    currentFrameTime = 0;
    yVelocity = 0;
    setCustomProperty(dino, '--bottom', 0)
    document.removeEventListener('keydown', onJump)
    document.addEventListener('keydown', onJump)

}

export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}


export function getDinoRects() {
    return dino.getBoundingClientRect()
}

export function setDinoLose() {
    dino.src = `assets/dino-lose.png`
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        dino.src = `assets/dino-stationary.png`
        return
    }

    if (currentFrameTime >= FRAME_TIME) {
        dinoFrameTime = (dinoFrameTime + 1) % DINO_FRAME_COUNT
        dino.src = `assets/dino-run-${dinoFrameTime}.png`
        currentFrameTime -= FRAME_TIME
    }

    currentFrameTime += delta * speedScale
}

function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(dino, '--bottom', yVelocity * delta)
    if (getCustomProperty(dino, '--bottom') <= 0) {
        setCustomProperty(dino, '--bottom', 0)
        isJumping = false
    }
    yVelocity -= GRAVITY * delta
}


function onJump(e) {
    if (e.code !== 'Space' || isJumping) return
    yVelocity = JUMP_SPEED
    isJumping = true
}