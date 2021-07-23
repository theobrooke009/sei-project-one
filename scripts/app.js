// DOM Elements
const grid = document.querySelector('.grid')
// Grab the grid in the DOM

const start = document.querySelector('.start')
const uVStart = document.querySelector('.uv-start')
// Grab the HTML start button class in the dom

const restart = document.querySelector('.restart')

// Arrays
const cells = []
// the blank array which the grid divs are pushed into
let gamePlaying = true
let enemyArray = [0, 1, 2, 3, 4, 5, 6, 7, 13, 14, 15, 16, 17, 18, 19, 20, 26, 27, 28, 29, 30, 31, 32, 33, 39, 40, 41, 42, 43, 44, 45, 46]
// this represents the starting position of every enemy on the board
let deadEnemies = []
let totalEnemies = 32


// Grid & grid variables
const gridWidth = 13
const totalNumberOfGridCells = gridWidth * gridWidth

function buildGrid() {
  for (let i = 0; i < totalNumberOfGridCells; i++) {
    const newCell = document.createElement('div')
    grid.appendChild(newCell)
    cells.push(newCell)
  } 
}
buildGrid()

// this creates divs and pushes them into the cells array, thus creating the board. Perameters are defined in CSS.

// VARIABLES



const playerClass = 'player'
const weaponClass = 'weapon'
let playerScore = 0
let rightMovement = false
let row = 1
const music = document.getElementById('eOneMOne')
// CSS classes stored as variables for ease of use

let playerPosition = parseFloat(Math.floor(totalNumberOfGridCells - ( gridWidth / 2)))

// Functions

function playMusic(){
  music.play() 
}

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
        resetBugs()
      }
      break
    case 37:
      if (x > 0) {
        playerPosition--
        resetBugs()
      }
      break
  }
  placePlayer()
}
// this is how the player moves left and right

// Weapon functions

// Enemy Functions

function boardNuke(){
  gamePlaying = false

  cells.forEach(cell => cell.classList.remove('enemy'))

  cells.forEach(cell => cell.classList.remove(weaponClass))
  
  cells.forEach(cell => cell.classList.remove('player'))

  cells.forEach(cell => cell.classList.remove('enemyBomb'))

  cells.forEach(cell => cell.classList.remove('enemyAttack'))

  music.pause()

  music.currentTime = 0 

  document.getElementById('menus').style.display = 'none'

  document.getElementById('end-menu').style.display = 'flex'
  
  document.getElementById('final-score').innerHTML = 1 * (playerScore) 

  setTimeout(() => {
    location.reload()
  }, 5000)

  row = 1

}

function addEnemyClass() {

  enemyArray.forEach(enemy => {
    cells[enemy].classList.add('enemy')   
  })
}

//this adds an enemy class to all enemies

function moveEnemiesRight(){
  let timer = 0
  let timerTwo = 0
  if (gamePlaying){
    timer = setInterval(() =>{
      cells.forEach(cell => {
        cell.classList.remove('enemy')
      })
      enemyArray = enemyArray.map(enemy => {
        const newPosition = enemy + 1
        if (gamePlaying && newPosition < totalNumberOfGridCells - (gridWidth - 1) && newPosition !== playerPosition) {
          cells[newPosition].classList.add('enemy')
          return newPosition
        } else {
          clearInterval(timerTwo)
          boardNuke()
        
        }
      })
    }, 400)
  } else {
    clearInterval(timer)
    clearInterval(timerTwo)
  }
}

function moveEnemiesDown(){
  

  cells.forEach(cell => {
    cell.classList.remove('enemy')
  })
  enemyArray = enemyArray.map(enemy => {
    const newPosition = enemy + gridWidth
    cells[newPosition].classList.add('enemy')
    return newPosition
  })

}

function moveEnemiesleft() {
  setInterval(() =>{
    cells.forEach(cell => {
      cell.classList.remove('enemy')
    })
    enemyArray = enemyArray.map(enemy => {
      const newPosition = enemy - 1
      cells[newPosition].classList.add('enemy')
      return newPosition
    })
  }, 400)
}

function movingEnemies() {
  const rightBoundary = enemyArray[enemyArray.length - 1] % gridWidth
  const leftBoundary = enemyArray[0] % gridWidth

  addEnemyClass()

  if (rightBoundary === gridWidth * row && rightMovement === true){
    row++
    rightMovement = false
    moveEnemiesleft()

  } else if (leftBoundary === (row * gridWidth) - gridWidth && rightMovement === false){
    row++
    console.log(row)
    rightMovement = true
    moveEnemiesRight()
  } else {
    moveEnemiesDown()
  }

}

function resetBugs(){
  cells.forEach(cell => cell.classList.remove('weaponFrameOne'))
  cells.forEach(cell => cell.classList.remove('weaponFrameTwo'))
  cells.forEach(cell => cell.classList.remove('weaponFrameThree'))
  cells.forEach(cell => cell.classList.remove('gibs'))
  cells.forEach(cell => cell.classList.remove('enemyAttack'))
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
    document.getElementById('playerFire').play()
   
    cells[playerPosition].classList.remove('player')
    setTimeout(() => {
      cells[playerPosition].classList.add('weaponFrameOne')
    }, 100)
    setTimeout(() => {
      cells[playerPosition].classList.remove('weaponFrameOne')
    }, 100)
    setTimeout(() => {
      cells[playerPosition].classList.add('weaponFrameTwo')
    }, 100)
    
    setTimeout(() => {
      cells[playerPosition].classList.remove('weaponFrameTwo')
    }, 100)

    setTimeout(() => {
      cells[playerPosition].classList.add('weaponFrameThree')
    }, 200)

    setTimeout(() => {
      cells[playerPosition].classList.remove('weaponFrameThree')
    }, 500)
    
  
    
    
    const timer = setInterval(() => {     
      const y = Math.floor(playerPosition / gridWidth)
      
      if (cells[weaponPosition].classList.contains('enemy')){
        playerScore += 1000
        document.getElementById('score').innerHTML = playerScore
        cells[weaponPosition].classList.remove(weaponClass)
        cells[weaponPosition].classList.remove('enemy')
        document.getElementById('enemyHit').play();
        cells[weaponPosition].classList.add('gibs')
        setTimeout(() => {
          cells[weaponPosition].classList.remove('gibs')
        }, 400)
        const index = enemyArray.indexOf(weaponPosition)
        deadEnemies.push(index)
        totalEnemies--
        if (totalEnemies === 0){
          boardNuke()
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
    }, 50 )

  }
}

function enemyFire() {
  if (gamePlaying === true){
    const timerOne = setInterval(() => {
      let randomNumber = Math.floor((Math.random() * totalNumberOfGridCells))
      const y = Math.ceil(totalNumberOfGridCells)
      if (cells[randomNumber].classList.contains('enemy') && !cells[randomNumber + gridWidth].classList.contains('enemy')){
        cells[randomNumber].classList.remove('enemy')
        cells[randomNumber].classList.add('enemyAttack')
        setTimeout(() => {
          cells[randomNumber].classList.remove('enemyAttack')
          cells[randomNumber].classList.add('enemy')
        }, 200);
        cells[randomNumber].classList.add('enemy')
        document.getElementById('enemyAttack').play()
      
        const timerTwo = setInterval(() =>{
          if (randomNumber >= y - gridWidth){
            cells[randomNumber].classList.remove('enemyBomb')
            clearInterval(timerTwo)
          } else if (randomNumber <= y) {
            cells[randomNumber].classList.remove('enemyBomb')
            randomNumber += gridWidth
            if (randomNumber !== playerPosition){
              cells[randomNumber].classList.add('enemyBomb')
            } else if (
              cells[randomNumber].classList.contains(weaponClass) && cells[randomNumber].classList.contains('enemyBomb')
            ){
              cells[randomNumber].classList.remove('enemyBomb')
              cells[randomNumber].classList.remove(weaponClass)
            } else {
              document.getElementById('playerDeath').play()
              boardNuke()
              clearInterval(timerOne)
              clearInterval(timerTwo)
              setTimeout
            } 
          }
        },  400 )
      } else {
        return
      }
    }, 30)
  } else {
    return
  }
}

function uVEnemyFire() {
  if (gamePlaying === true){
    const timerOne = setInterval(() => {
      let randomNumber = Math.floor((Math.random() * totalNumberOfGridCells))
      const y = Math.ceil(totalNumberOfGridCells)
      if (cells[randomNumber].classList.contains('enemy') && !cells[randomNumber + gridWidth].classList.contains('enemy')){
        cells[randomNumber].classList.remove('enemy')
        cells[randomNumber].classList.add('enemyAttack')
        setTimeout(() => {
          cells[randomNumber].classList.remove('enemyAttack')
          cells[randomNumber].classList.add('enemy')
        }, 200);
        cells[randomNumber].classList.add('enemy')
        document.getElementById('enemyAttack').play()
      
        const timerTwo = setInterval(() =>{
          if (randomNumber >= y - gridWidth){
            cells[randomNumber].classList.remove('enemyBomb')
            clearInterval(timerTwo)
          } else if (randomNumber <= y) {
            cells[randomNumber].classList.remove('enemyBomb')
            randomNumber += gridWidth
            if (randomNumber !== playerPosition){
              cells[randomNumber].classList.add('enemyBomb')
            } else if (
              cells[randomNumber].classList.contains(weaponClass) && cells[randomNumber].classList.contains('enemyBomb')
            ){
              cells[randomNumber].classList.remove('enemyBomb')
              cells[randomNumber].classList.remove(weaponClass)
            } else {
              document.getElementById('playerDeath').play()
              boardNuke()
              clearInterval(timerOne)
              clearInterval(timerTwo)
              setTimeout
            } 
          }
        },  150)
      } else {
        return
      }
    }, 25)
  } else {
    return
  }
}



// Event Listeners

window.addEventListener('keyup', fireWeapon)
window.addEventListener('keyup', movePlayer)

start.addEventListener('click', enemyFire)
start.addEventListener('click', movingEnemies)
start.addEventListener('click', placePlayer)
start.addEventListener('click', playMusic)

uVStart.addEventListener('click', uVEnemyFire)
uVStart.addEventListener('click', movingEnemies)
uVStart.addEventListener('click', placePlayer)
uVStart.addEventListener('click', playMusic)
