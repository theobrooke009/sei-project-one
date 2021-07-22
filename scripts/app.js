




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
const enemyBomb = 'enemyBomb'
// CSS classes stored as variables for ease of use

let playerPosition = parseFloat(Math.floor(totalNumberOfGridCells - ( gridWidth / 2)))

// Functions

function playMusic(){
  const music = document.getElementById('eOneMOne').play() 
  music.volume = 10.0 
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
  gamePlaying = false

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
  let timer = 0
  let timerTwo = 0
  if (gamePlaying){
    timer = setInterval(() =>{
      cells.forEach(cell => {
        cell.classList.remove('enemy')
      })
      enemyArray = enemyArray.map(enemy => {
        const newPosition = enemy + 1
        if (gamePlaying && newPosition < totalNumberOfGridCells) {
          cells[newPosition].classList.add('enemy')
          return newPosition
        } else {
          clearInterval(timerTwo)
          boardNuke()
          setTimeout(() => {
            boardNuke()
            location.reload()
          }, 2000)
        
        }
      })
    }, 500)
  } else {
    clearInterval(timer)
    clearInterval(timerTwo)
  }
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

function resetPlayer(){
  cells.forEach(cell => cell.classList.remove('weaponFrameOne'))
  cells.forEach(cell => cell.classList.remove('weaponFrameTwo'))
  cells.forEach(cell => cell.classList.remove('weaponFrameThree'))
  cells.forEach(cell => cell.classList.remove('player'))
  cells[playerPosition].classList.add('player')

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
      

    
      console.log(y)
      if (cells[weaponPosition].classList.contains('enemy')){
        cells[weaponPosition].classList.remove(weaponClass)
        cells[weaponPosition].classList.remove('enemy')
        document.getElementById('enemyHit').play();
        cells[weaponPosition].classList.add('gibs')
        setTimeout(() => {
          cells[weaponPosition].classList.remove('gibs')
        }, 200)
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
    }, 50 )

  }
}

function enemyFire() {
  if (gamePlaying === true){
    const timerOne = setInterval(() => {
      let randomNumber = Math.floor((Math.random() * totalNumberOfGridCells))
      const y = Math.ceil(totalNumberOfGridCells - 1)
      if (cells[randomNumber].classList.contains('enemy') && !cells[randomNumber + gridWidth].classList.contains('enemy')){
        cells[randomNumber].classList.remove('enemy')
        cells[randomNumber].classList.add('enemyAttack')
        setTimeout(() => {
          cells[randomNumber].classList.remove('enemyAttack')
          cells[randomNumber].classList.add('enemy')
        }, 200);
        cells[randomNumber].classList.add('enemy')
        document.getElementById('enemyAttack').play()
        console.log('fire')
      
        const timerTwo = setInterval(() =>{
          if (randomNumber >= y - gridWidth){
            cells[randomNumber].classList.remove('enemyBomb')
            clearInterval(timerTwo)
          } else if (randomNumber <= y) {
            cells[randomNumber].classList.remove('enemyBomb')
            randomNumber += gridWidth
            if (randomNumber !== playerPosition){
              console.log(cells[randomNumber])
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
        },  200 )
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
start.addEventListener('click', enemyFire)
start.addEventListener('click', movingEnemies)
start.addEventListener('click', placePlayer)
window.addEventListener('keyup', movePlayer)
start.addEventListener('click', playMusic)

