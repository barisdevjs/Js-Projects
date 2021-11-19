document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  console.log(squares);
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const width = 10
  let nextRandom = 0
  let nextRandomColor 
  let timerId // by default it is set to null
  let score = 0
  let speed = 1000

  const colors = [
    'orange',
    'red',
    'purple',
    'green',
    'blue'
  ]


  //The shapes
  const lShape = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]

  const zShape = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]

  const tShape = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]

  const oShape = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

  const iShape = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

  const theShapes = [lShape, zShape, tShape, oShape, iShape]

  let currentPos = 4; //starting position of the shape top-center of the grid layout
  let currentRotation = 0;
  let random = Math.floor(Math.random() * theShapes.length);
  let colorRandom = Math.floor(Math.random() * colors.length);
  let current = theShapes[random][currentRotation]; 
  let randomColor = colors[colorRandom];

  function draw(){
    current.forEach(index => {
      squares[currentPos + index].classList.add('shape');
      squares[currentPos + index].style.backgroundColor = randomColor;
    });
  }

 function undraw(){
    current.forEach(index => {
      squares[currentPos + index].classList.remove('shape');
      squares[currentPos + index].style.backgroundColor = '';

    });
  }

  function moveDown(){ 
    undraw();
    currentPos += width;
    draw();
    freeze(); // it gets checked every second
  }
  
  function control(e){
    switch (e.keyCode) {
      case 37:
        moveLeft();
        break;
      case 38:
        rotate();
        break;
      case 39:
        moveRight();
        break;
      case 40:
        moveDown();
        break;
    }
  }
  // rotate shapes 
  function rotate(){
    undraw();
    currentRotation ++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theShapes[random][currentRotation];
    draw();
  }
    document.addEventListener('keydown', control);
  
  // freeze function 
  function freeze () {
    if (current.some(index => squares[currentPos + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPos + index].classList.add('taken'));
     
      // new shape is coming 
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theShapes.length);
      current = theShapes[random][currentRotation];
      randomColor = nextRandomColor;
      nextRandomColor = colors[Math.floor(Math.random() * colors.length)];
      currentPos = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }

  // move the shape to the left
  function moveLeft(){
    undraw();
    const isAtLeftEdge = current.some(index => (currentPos + index) % width === 0);
    if (!isAtLeftEdge) currentPos -= 1; // decrease the index for going to the left
    if (current.some(index => squares[currentPos + index].classList.contains('taken'))) { // checking for if the space is occupied before our shape arrives
      currentPos += 1;
    }
    draw();
  }

  // move the shape to the right
  function moveRight(){
    undraw();
    const isAtRightEdge = current.some(index => (currentPos + index) % width === width-1);
    if (!isAtRightEdge) currentPos +=1;   // increase the index for going to the right
    if (current.some(index => squares[currentPos + index].classList.contains('taken'))) {
      currentPos -= 1; // checking for if the space is occupied before our shape arrives
    }
    draw();
  }

  // speed 
  const speedElement  = document.querySelector('.spd')
  document.querySelector('.plus').addEventListener('click', () => {
    speed -= 100
    clearInterval(timerId)
    timerId = setInterval(moveDown, speed)
    speedElement.innerHTML =( 1 / (speed / 1000 )).toFixed(1) + ' / sec'
  })

  document.querySelector('.minus').addEventListener('click', () => {
    speed += 100
    clearInterval(timerId)
    timerId = setInterval(moveDown, speed)
    speedElement.innerHTML = ( 1 / (speed / 1000 )).toFixed(1) + ' / sec'

  })

   //show up-next shape in next-Screen display
   const displaySquares = document.querySelectorAll('.next div')
   const displayWidth = 4 // similar like a currentPos in this mini game sign
   const displayIndex = 0
 
 
   //the shapes without rotations
   const upNextShapes = [
     [1, displayWidth+1, displayWidth*2+1, 2], //lShape
     [0, displayWidth, displayWidth+1, displayWidth*2+1], //zShape
     [1, displayWidth, displayWidth+1, displayWidth+2], //tShape
     [0, 1, displayWidth, displayWidth+1], //oShape
     [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iShape
   ]
   

   //display the shape in the next-Screen 

    function displayShape(){
      
      displaySquares.forEach(square => {
        square.classList.remove('nextSmall')
        square.style.backgroundColor = ''
      })
      upNextShapes[nextRandom].forEach(index => {
        displaySquares[index + displayIndex].classList.add('nextSmall')
        displaySquares[index + displayIndex].style.backgroundColor = nextRandomColor
      })

    }

    // add functionality to the start button

    startBtn.addEventListener('click', () => {
      if (timerId) { // if the timerId is not null, then the game is already running
        clearInterval(timerId)
        timerId = null 
      } else {
        draw(); // start the game
        timerId = setInterval(moveDown, speed);
        nextRandom = Math.floor(Math.random() * theShapes.length);
        displayShape();
      }
    })

    function addScore(){
      for (let i = 0; i < 199; i+= width) {
        const row =[i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

        if (row.every(index => squares[index].classList.contains('taken'))) {
          score += width;
          scoreDisplay.innerHTML = score;
          row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('shape') // undraw the finished row from beginning of a game-board
          squares[index].style.backgroundColor = ''
          })
          const squaresRemoved = squares.splice(i, width)
          squares = squaresRemoved.concat(squares)
          squares.forEach(cell => grid.appendChild(cell))
        }
      }
      }

      function gameOver(){
        if (current.some(index => squares[currentPos + index].classList.contains('taken'))) {
          scoreDisplay.innerHTML += '   Game Over';
          clearInterval(timerId);
        }
      }

});