// Elements
const grid = document.querySelector('.grid')
// const weapon = document.querySelector('.weapon')
// const enemies = document.querySelectorAll('.enemy')
const start = document.querySelector('.start')
const cells = []
const enemyArray = [0, 1, 2, 3, 4, 5, 6]


// Grid variables

const width = 13
const cellCount = width * width

// Game Variables

let timer = 0
const playerClass = 'player'
const weaponClass = 'weapon'
const leadEnemy = 'leadEnemy'
const enemy = 'enemy'

let playerPosition = parseFloat(Math.floor(cellCount - (width / 2)))
let leadEnemyPosition = enemyArray[6]
let weaponPosition = playerPosition
// let enemyCount = 1
let enemyTwo = enemyArray[5]
let enemyThree = enemyArray[4]
let enemyFour = enemyArray[3]
let enemyFive = enemyArray[2]
let enemySix = enemyArray[1]
let enemySeven = enemyArray[0]
let shotInProgress = false



// Functions

//player functions
function addPlayer() {
  cells[playerPosition].classList.add(playerClass)
}

function removePlayer() {
  cells[playerPosition].classList.remove(playerClass)
}

//weapon functions

function weaponClassNuke() {
  cells.forEach(cell => cell.classList.remove(weaponClass))
}

function addWeapon() {
  cells[weaponPosition].classList.add(weaponClass)
}

//enemy functions

function addLeadEnemy() {
  cells[leadEnemyPosition].classList.add(leadEnemy)
  cells[enemyTwo].classList.add(enemy)
  cells[enemyThree].classList.add(enemy)
  cells[enemyFour].classList.add(enemy)
  cells[enemyFive].classList.add(enemy)
  cells[enemySix].classList.add(enemy)
  cells[enemySeven].classList.add(enemy)
}

function removeLeadEnemy() {
  cells[leadEnemyPosition].classList.remove(leadEnemy)
  cells[enemyTwo].classList.remove(enemy)
  cells[enemyThree].classList.remove(enemy)
  cells[enemyFour].classList.remove(enemy)
  cells[enemyFive].classList.remove(enemy)
  cells[enemySix].classList.remove(enemy)
  cells[enemySeven].classList.remove(enemy)
}



function moveEnemies() {
  timer = setInterval(() => {
    const x = leadEnemyPosition % width
    const y = Math.floor(leadEnemyPosition / width)
    if(y >= 0) {

      if (leadEnemyPosition < cellCount - width){

        removeLeadEnemy()
        leadEnemyPosition++
        enemyTwo++
        enemyThree++
        enemyFour++
        enemyFive++
        enemySix++
        enemySeven++
        addLeadEnemy()

      } else {
        removeLeadEnemy()
        return
      }
   
    }
  }, 50
  )

}


//general game functions

function buildGrid() {
  for (let i = 0; i < cellCount; i++) {
    const newCell = document.createElement('div')
    newCell.textContent = i
    grid.appendChild(newCell)
    cells.push(newCell)
  }
  addPlayer()
  addLeadEnemy()
}


buildGrid()


function xAxisMove(event) {
  const x = playerPosition % width

  removePlayer()

  switch (event.keyCode) {
    case 39:
      if (x < width - 1) {
        playerPosition++
        weaponPosition = playerPosition
      }
      break
    case 37:
      if (x > 0) {
        playerPosition--
        weaponPosition = playerPosition
      
      }
      break
  }
  
  addPlayer()
}

function endShot() {
  clearInterval(timer)
  weaponClassNuke()
  shotInProgress = false
}


function fireWeapon(event) {
  timer = setInterval(() => {
    const x = playerPosition % width
    const y = Math.floor(playerPosition / width)
    switch (event.keyCode) {

      case 69:

        if (y > 0 && weaponPosition >= width) {
          weaponClassNuke()
          weaponPosition -= width
          addWeapon(weaponPosition)
          console.log(weaponPosition)
        } else {
          endShot()
        }


        console.log(shotInProgress)
        break

        
    } 
  }, 100
  )
}


window.addEventListener('keyup', xAxisMove)
window.addEventListener('keyup', fireWeapon)
start.addEventListener('click', moveEnemies)