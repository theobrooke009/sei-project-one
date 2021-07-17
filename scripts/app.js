// Elements
const grid = document.querySelector('.grid')
// const weapon = document.querySelector('.weapon')
// const enemies = document.querySelectorAll('.enemy')
const start = document.querySelector('.start')
const cells = []


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
let leadEnemyPosition = parseFloat(Math.floor(0 + (width / 2)))
let weaponPosition = playerPosition
let enemyCount = 1
let newEnemy = parseFloat(Math.floor(leadEnemyPosition - 1))
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
}

function removeLeadEnemy() {
  cells[leadEnemyPosition].classList.remove(leadEnemy)
}

function placeEnemies() {
  while (enemyCount < 7) {
    cells[newEnemy].classList.add(enemy)
    newEnemy--
    enemyCount++
  }
}

function moveEnemies() {
  timer = setInterval(() => {
    const x = leadEnemyPosition % width
    const y = Math.floor(leadEnemyPosition / width)

    while (y > 0 && leadEnemyPosition >= cellCount){
      removeLeadEnemy()
      leadEnemyPosition++
      console.log(leadEnemyPosition)
      addLeadEnemy()
    }
  }, 500
  )
}

moveEnemies() 

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
  placeEnemies()
  moveEnemies() 
}


buildGrid()


function xAxisMove(event) {
  const x = playerPosition % width

  removePlayer()

  switch (event.keyCode) {
    case 39:
      shotInProgress = true
      if (x < width - 1) {
        playerPosition++
        weaponPosition = playerPosition
        shotInProgress = false
      }
      break
    case 37:
      shotInProgress = true
      if (x > 0) {
        playerPosition--
        weaponPosition = playerPosition
        shotInProgress = false
      }
      break
  }
  
  addPlayer()
}

function endShot() {
  clearInterval(timer)
  weaponClassNuke()
}


function fireWeapon(event) {
  if (shotInProgress) return
  shotInProgress = true

  timer = setInterval(() => {
    const x = weaponPosition % width
    const y = Math.floor(weaponPosition / width)
    switch (event.keyCode) {

      case 69:
        if (y > 0 && weaponPosition >= width) {
          shotInProgress = true
          weaponClassNuke()
          weaponPosition -= width
          addWeapon(weaponPosition)
          console.log(weaponPosition)
        } else {
          shotInProgress = false
          endShot()
        }
        break
    }
  }, 100
  )
  shotInProgress = false
}

// function fireWeapon(event) {
//   const y = Math.floor(playerPosition / width)
//   switch (event.keyCode) {
//     case 69:
//       if (y > 0) {
//         const intervalId = setInterval(() => {
//           while(weaponPosition >= width) {
//           if (weaponPosition >= width) {
//             weaponClassNuke()
//             addWeapon()
//             weaponPosition -= width
//             console.log('current', weaponPosition)


//           } else {
//             weaponClassNuke()
//           }
//         }
//           clearInterval(intervalId)
//         }, 300)
//       } break
//   }
// }    









addPlayer()
// fireWeapon()
// Events

window.addEventListener('keyup', xAxisMove)
window.addEventListener('keyup', fireWeapon)
start.addEventListener('click', moveEnemies())