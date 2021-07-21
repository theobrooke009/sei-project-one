// MAIN FUNCTION




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

let enemyArray = [0, 1, 2, 3, 4, 5, 6, 7, 13, 14, 15, 16, 17, 18, 19, 20, 26, 27, 28, 29, 30, 31, 32, 33 ]
// this represents the starting position of every enemy on the board
let deadEnemies = []
let totalEnemies = 24


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
buildGrid()

// this creates divs and pushes them into the cells array, thus creating the board. Perameters are defined in CSS.

// VARIABLES

let timer = 0
// call this to work setIntervals

const playerClass = 'player'
const weaponClass = 'weapon'
const enemyBomb = 'enemyBomb'
let enemyAtEdge = false
// CSS classes stored as variables for ease of use

let playerPosition = parseFloat(Math.floor(totalNumberOfGridCells - ( gridWidth / 2)))

// Functions

function placePlayer() {
  cells[playerPosition].classList.add(playerClass)
}
placePlayer()
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

function boardNuke(){

  cells.forEach(cell => cell.classList.remove('enemy'))

  cells.forEach(cell => cell.classList.remove(weaponClass))
  
  cells.forEach(cell => cell.classList.remove('player'))
  cells[67].textContent = 'G'
  cells[68].textContent = 'A'
  cells[69].textContent = 'M'
  cells[70].textContent = 'E'
  cells[71].textContent = 'O'
  cells[72].textContent = 'V'
  cells[73].textContent = 'E'
  cells[74].textContent = 'R'
  cells[75].textContent = '!'
}

function addEnemyClass() {

  enemyArray.forEach(enemy => {
    cells[enemy].classList.add('enemy')
    
  })
}


//this adds an enemy class to all enemies

function removeEnemyClass() {
  enemyArray.forEach(enemy => {
    cells[enemy].classList.remove('enemy')
    
  })
}


function moveEnemiesRight(){
  setInterval(() =>{
    cells.forEach(cell => {
      cell.classList.remove('enemy')
    })
    enemyArray = enemyArray.map(enemy => {
      const newPosition = enemy + 1
      if (newPosition < totalNumberOfGridCells) {
        cells[newPosition].classList.add('enemy')
        return newPosition
      } else {
        boardNuke()
        setTimeout(() => {
          boardNuke()
          location.reload()
        }, 2000)
        
      }
    })
  }, 2000)
  
}

function moveEnemiesDown(){
  
  setInterval(() =>{
    cells.forEach(cell => {
      cell.classList.remove('enemy')
    })
    enemyArray = enemyArray.map(enemy => {
      const newPosition = enemy + gridWidth
      cells[newPosition].classList.add('enemy')
      return newPosition
    })
  }, 500)
}

function moveEnemiesleft() {
  setInterval(() =>{
    cells.forEach(cell => {
      cell.classList.remove('enemy')
    })
    enemyArray = enemyArray.map(enemy => {
      const newPosition = enemy + 1
      cells[newPosition].classList.add('enemy')
      return newPosition
    })
  }, 500)
}

function movingEnemies() {
  addEnemyClass() 
  moveEnemiesRight()
 
}


function fireWeapon(event) {
  let weaponPosition = playerPosition

  function addWeapon() {
    cells[weaponPosition].classList.add(weaponClass)
  }
  function removeWeapon() {
    cells[weaponPosition].classList.remove(weaponClass)
  }

  if (event.keyCode === 69) {
    const timer = setInterval(() => {
      
      cells[playerPosition].classList.remove('player')
      cells[playerPosition].classList.add('weaponFrameOne')
      setTimeout(() => {
        cells[playerPosition].classList.remove('weaponFrameOne')
      }, 100)
      cells[playerPosition].classList.add('player')

      
      const y = Math.floor(playerPosition / gridWidth)
      
      console.log(y)
      if (cells[weaponPosition].classList.contains('enemy')){
        cells[weaponPosition].classList.remove(weaponClass)
        cells[weaponPosition].classList.remove('enemy')
        cells[weaponPosition].classList.add('gibs')
        setTimeout(() => {
          cells[weaponPosition].classList.remove('gibs')
        }, 50)
        const index = enemyArray.indexOf(weaponPosition)
        deadEnemies.push(index)
        totalEnemies--
        if (totalEnemies === 0){
          boardNuke()
          setTimeout(() => {
            boardNuke()
            location.reload()
          }, 2000)
        }
        if (index > - 1){
          enemyArray.splice(index, 1)
          clearInterval(timer)
        }
      } else {
        if (weaponPosition >= y + 1) {
          removeWeapon()
          weaponPosition -= gridWidth
          addWeapon(weaponPosition)
            
        } else {
          cells[weaponPosition].classList.remove(weaponClass)
          clearInterval(timer)
        }
      }
    }, 100 )

  }
}

function enemyFire() {
  setInterval(() => {
    let randomNumber = Math.floor((Math.random() * totalNumberOfGridCells))

    if (cells[randomNumber].classList.contains('enemy') && !cells[randomNumber + gridWidth].classList.contains('enemy') ){
      console.log('fire')
      const y = Math.ceil(totalNumberOfGridCells)
      setInterval(() => {

        if (randomNumber >= y - 1){
          cells[randomNumber].classList.remove('enemyBomb')
          randomNumber += gridWidth
          cells[randomNumber].classList.add('enemyBomb')
        }
      }, 1100)
    } else {
      return
    }
  }, 300)
}


// let randomNumber = Math.floor((Math.random() * 20) + 1)
// if (cells[randomNumber].classList.contains('enemy')) {
//   console.log('hi')
// }
// else {
//   console.log(randomNumber)
// }



// Event Listeners

window.addEventListener('keyup', fireWeapon)
start.addEventListener('click', enemyFire)
start.addEventListener('click', movingEnemies)
window.addEventListener('keyup', movePlayer)

