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

let enemyOne = 6
let enemyTwo = 5
let enemyThree = 4
let enemyFour = 3
let enemyFive = 2
let enemySix = 1
let enemySeven = 0
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
    if (enemySeven >= (gridWidth * row) - gridWidth && enemyOne < row * (gridWidth - 1)) {
      removeEnemyClass()
      enemyOne++
      enemyTwo++
      enemyThree++
      enemyFour++
      enemyFive++
      enemySix++
      enemySeven++
      addEnemyClass()
    } else {
      row++
      moveEnemiesDown()
      clearInterval(timer)
      return
    }
  }, 100)
}

function moveEnemiesLeft() {
  timer = setInterval(() => {
    if (enemyOne === row * (gridWidth - 1) && enemySeven !== (gridWidth * row) - gridWidth) {
      removeEnemyClass()
      enemyOne--
      enemyTwo--
      enemyThree--
      enemyFour--
      enemyFive--
      enemySix--
      enemySeven--
      addEnemyClass()
      console.log((gridWidth * row) - gridWidth)
    } else {
      moveEnemiesDown()
      clearInterval(timer)
      return
    }
  }, 100
  )
}

// Moves enemies to the left while enemyOne is less than gridsize - width

function moveEnemiesDown() {
  removeEnemyClass()
  enemyOne += gridWidth
  enemyTwo += gridWidth
  enemyThree += gridWidth
  enemyFour += gridWidth
  enemyFive += gridWidth
  enemySix += gridWidth
  enemySeven += gridWidth
  addEnemyClass()
}

function completeEnemyMovement(){
  let row = 1
  timer = setInterval(() => {
    if (row % 2 !== 0){
      if (enemySeven >= (gridWidth * row) - gridWidth && enemyOne < row * (gridWidth - 1)) {
        removeEnemyClass()
        enemyOne++
        enemyTwo++
        enemyThree++
        enemyFour++
        enemyFive++
        enemySix++
        enemySeven++
        addEnemyClass()
      } else {
        moveEnemiesDown(),
        console.log(row)
        console.log('7', enemySeven)
        console.log('1', enemyOne)
        clearInterval(timer)
      }
    } else if (row % 2 === 0) {    
      row++
      if (enemyOne === row * (gridWidth - 1) && enemySeven !== (gridWidth * row) - gridWidth) {
        removeEnemyClass()
        console.log(row)
        enemyOne--
        enemyTwo--
        enemyThree--
        enemyFour--
        enemyFive--
        enemySix--
        enemySeven--
        addEnemyClass()
      } else {
        moveEnemiesDown()
        return
      }
    } else {
      clearInterval(timer)
    }
  }, 100)

}





// Event Listeners


start.addEventListener('click', completeEnemyMovement)
window.addEventListener('keyup', movePlayer)


mainFunction()
addEnemyClass()

// function endShot() {
//   clearInterval(timer)
//   weaponClassNuke()
  
// }

// function fireWeapon(event) {
//   let weaponPosition = playerPosition + width

//   function addWeapon() {
//     cells[weaponPosition].classList.add(weaponClass)
//   }
  
//   timer = setInterval(() => {
  
//     const y = Math.floor(playerPosition / gridWidth)
  
//     switch (event.keyCode) {
//       case 69:
//         if (weaponPosition >= y + 1) {
            
//           weaponClassNuke()
//           weaponPosition -= gridWidth
//           addWeapon(weaponPosition)
//           console.log(weaponPosition)
            
//         } else {
//           clearInterval(timer)
//           weaponClassNuke()
//           return
//         }
//         break      
//     } 
//   }) 
// }

// function weaponClassNuke() {
//   cells.forEach(cell => cell.classList.remove(weaponClass))
// }

