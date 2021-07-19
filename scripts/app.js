// Elements
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

buildGrid()
// Function call to build the grid

// Functions

// Player Functions

// Weapon functions

// Enemy Functions

// Event Listeners