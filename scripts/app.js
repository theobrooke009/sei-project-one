// MAIN FUNCTION

function mainFunction(){
  buildGrid()
  placePlayer()
}



// DOM Elements
const grid = document.querySelector('.grid')
// Grab the grid in the DOM

const enemies = document.querySelectorAll('.enemy')
// Grab the enemy class in the DOM

const start = document.querySelector('.start')
// Grab the HTML start button class in the dom

// Arrays
const cells = []
// the blank array which the grid divs are pushed into

let enemyArray = [0, 1, 2, 3, 4, 5, 6]
// this represents the starting position of every enemy on the board

// Grid & grid variables

const gridWidth = 13
const totalNumberOfGridCells = gridWidth * gridWidth

function buildGrid() {
  for (let i = 0; i < totalNumberOfGridCells; i++) {
    const newCell = document.createElement('div')
    newCell.textContent = i
    grid.appendChild(newCell)
    cells.push(newCell)
  }
}
// this creates divs and pushes them into the cells array, thus creating the board. Perameters are defined in CSS.

// VARIABLES

let timer = 0
// call this to work setIntervals


const playerClass = 'player'
const weaponClass = 'weapon'
const enemy = 'enemy'
const enemyBomb = 'enemyBomb'
// CSS classes stored as variables for ease of use

let enemyOne = 30
let enemyTwo = 31
let enemyThree = 32
let enemyFour = 33
let enemyFive = 34
let enemySix = 35
let enemySeven = 36
// sets initial enemy positions 


let playerPosition = parseFloat(Math.floor(totalNumberOfGridCells - ( gridWidth / 2)))

// Functions

function placePlayer() {
  cells[playerPosition].classList.add(playerClass)
}
// this places the player class at the player position

function removePlayer() {
  cells[playerPosition].classList.remove(playerClass)
}
// this removes the player from the player position

// Player Functions


function movePlayer(event) {
  const x = playerPosition % gridWidth

  removePlayer()

  switch (event.keyCode) {
    case 39:
      if (x < gridWidth - 1) {
        playerPosition++
      }
      break
    case 37:
      if (x > 0) {
        playerPosition--
      }
      break
  }
  placePlayer()
}
// this is how the player moves left and right

// Weapon functions

// Enemy Functions

function addEnemyClass() {
  cells[enemyOne].classList.add(enemy)
  cells[enemyTwo].classList.add(enemy)
  cells[enemyThree].classList.add(enemy)
  cells[enemyFour].classList.add(enemy)
  cells[enemyFive].classList.add(enemy)
  cells[enemySix].classList.add(enemy)
  cells[enemySeven].classList.add(enemy)

}
console.log(enemyOne)



//this adds an enemy class to all the hardcoded enemies

function removeEnemyClass() {
  cells[enemyOne].classList.remove(enemy)
  cells[enemyTwo].classList.remove(enemy)
  cells[enemyThree].classList.remove(enemy)
  cells[enemyFour].classList.remove(enemy)
  cells[enemyFive].classList.remove(enemy)
  cells[enemySix].classList.remove(enemy)
  cells[enemySeven].classList.remove(enemy)

}
// this removes the enemy class



function moveEnemiesRight() {
  timer = setInterval(() => {
    if (enemyOne <= totalNumberOfGridCells - gridWidth) {
      removeEnemyClass()
      enemyOne++
      enemyTwo++
      enemyThree++
      enemyFour++
      enemyFive++
      enemySix++
      enemySeven++
      addEnemyClass()

    }
  }, 100)
}

function moveEnemiesLeft() {
  timer = setInterval(() => {
    if (enemyOne > 0 ) {
      removeEnemyClass()
      enemyOne--
      enemyTwo--
      enemyThree--
      enemyFour--
      enemyFive--
      enemySix--
      enemySeven--
      addEnemyClass()

    }
  }, 100)
}


// moveEnemiesRight()

// Event Listeners


start.addEventListener('click', moveEnemiesLeft)
window.addEventListener('keyup', movePlayer)


mainFunction()
addEnemyClass()

