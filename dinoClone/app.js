import { setupGround, updateGround } from './ground.js';
import { setupDino, updateDino, getDinoRects, setDinoLose } from './dino.js';
import { setupCactus, updateCactus, getCactusRects } from './cactus.js';



const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const worldElement = document.querySelector('[data-world]');
const scoreElement = document.querySelector('[data-score]');
const startScreenElement = document.querySelector('[data-start-screen]');


setPixelToWorldScale()
window.addEventListener('resize', setPixelToWorldScale);
document.addEventListener('keydown', handleStart, { once: true });


let lastTime
let speedScale
let score ;

function update(time) {
    if (!lastTime) {
        lastTime = time;
        requestAnimationFrame(update);
        return;
    }
    const deltaTime = time - lastTime;

    updateGround(deltaTime, speedScale);
    updateDino(deltaTime, speedScale);
    updateCactus(deltaTime, speedScale);
    updateSpeedScale(deltaTime);
    updateScore(deltaTime)
    if (checkLose()) return handleLose()

    lastTime = time;
    requestAnimationFrame(update);
}


function handleStart() {
    lastTime = null;
    speedScale = 1;
    score = 0;
    setupGround();
    setupDino();
    setupCactus();
    startScreenElement.classList.add('hide');
    requestAnimationFrame(update);
}

function updateSpeedScale(deltaTime) {
    speedScale += SPEED_SCALE_INCREASE * deltaTime;
}

function updateScore(deltaTime) {
    score += deltaTime * .01;
    scoreElement.textContent = Math.floor(score);
}

// scale the world to the size of the window
function setPixelToWorldScale() {
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH;
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
    }

    worldElement.style.width = WORLD_WIDTH * worldToPixelScale + 'px';
    worldElement.style.height = WORLD_HEIGHT * worldToPixelScale + 'px';
}

function checkLose() {
    const dinoRects = getDinoRects();
    return getCactusRects().some(cactusRect => {
        isCollision(cactusRect, dinoRects)
    })
}

function isCollision(rect1, rect2) {
    return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
    )
}

function handleLose() {
    setDinoLose();
    setTimeout(() => {
        document.addEventListener('keydown', handleStart, { once: true });
        startScreenElement.classList.remove('hide');
    }, 200)
}