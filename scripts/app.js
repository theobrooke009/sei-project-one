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

    if (leadEnemyPosition <= cellCount){
      removeLeadEnemy()
      leadEnemyPosition++
      addLeadEnemy()
      console.log(leadEnemyPosition)
    } else {
      console.log(leadEnemyPosition)
    }
  }, 2000
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
  placeEnemies()
  moveEnemies()
  xAxisMove() 
  fireWeapon()
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