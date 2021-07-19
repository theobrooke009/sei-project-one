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

let enemyArray = []
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

const totalEnemies = 8
// used in the createEnemies function to place enemies

let currentTotalEnemies = 0
// used when placing enemies as check against totalEnemies

const playerClass = 'player'
const weaponClass = 'weapon'
const enemy = 'enemy'
const enemyBomb = 'enemyBomb'
// CSS classes stored as variables for ease of use

const firstEnemy = gridWidth - (gridWidth - totalEnemies)
// calculates position of first enemy

let placeNewEnemy = firstEnemy - 1
// used in the placeEnemy function to determine the new enemy position based on the length of the enemy array

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

function placeEnemies() {
  enemyArray.push(firstEnemy)
  while (currentTotalEnemies < totalEnemies){
    enemyArray.push(placeNewEnemy)
    cells[placeNewEnemy].classList.add(enemy)
    currentTotalEnemies++
    placeNewEnemy--
    console.log(currentTotalEnemies)
  }
  enemyArray.reverse()
}

// this places enemies into the enemy array depending on the total enemies count. For some reason it comes out backward so i reversed it.

// Player Functions

// Weapon functions

// Enemy Functions

// Event Listeners

start.addEventListener('click', mainFunction())
window.addEventListener('keyup', movePlayer)

// MAIN FUNCTION

function mainFunction(){
  buildGrid()
  placeEnemies()
  placePlayer()
}

