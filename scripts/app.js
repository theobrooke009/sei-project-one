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

let enemyArrayLength = enemyArray.length

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

function addEnemyClass() {
  // for (let i = 0 ; i <= enemyArray.length - 1 ; i++){
  //   cells[enemyArray].classList.add('enemy')
  //   console.log('add enemy class', enemyArray[i])
  // }
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


// enemyArray.forEach(enemy => {
//   cells[enemy].classList.add('enemy')
// })


// this removes them

// function incrementEnemy() {
//   enemyArray = enemyArray.map(enemy => {
//     console.log('increment', enemy)
//     return enemy + 1
//   })
// }



// function incrementEnemy() {
//   for (let i = 0 ; i < enemyArray.length - 1 ; i++){
//     cells[enemyArray[i]]++
  
//   }
// }
// this adds one to all objects in the array

// function moveEnemiesRight() {
//   timer = setInterval(() => {
//     let x = 0
//     while (x < gridWidth){
//       x++
//       removeEnemyClass()
//       incrementEnemy()
//       addEnemyClass()
//       console.log('x =', x)
//     } 
//     clearInterval(timer)
//   }, 500)
// }


// function moveEnemiesRight(){
  
//   setInterval(() => {
//     return enemyArray = enemyArray.map(enemy => {
//       removeEnemyClass()
//       console.log('increment', enemy)
//       enemy + 1
//       addEnemyClass()
//     })
//   }, 500) 
// }
// moveEnemiesRight()

function moveEnemiesRight(){
  
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
  // let bottomRow = 3
  // let topRow = 1
  // let furthestRightEnemy = bottomRow * gridWidth / 2
  // const furthestRight = bottomRow * gridWidth - 1
  // console.log('fr', furthestRight)
  // const furthestLeft = topRow * (gridWidth - 1) - (gridWidth - 1)
  // console.log('hi', enemyArray[enemyArray.length - 1])
  let furthestRightEnemy = enemyArray[enemyArray.length - 1] % gridWidth

  
  console.log(furthestRightEnemy)
  if (enemyAtEdge === false && furthestRightEnemy < gridWidth - 1) {
    
    moveEnemiesRight()

  } else (
    enemyAtEdge = true,
    topRow++,
    bottomRow++,
    console.log(topRow),
    console.log(bottomRow),
    console.log(enemyAtEdge)
  )

}



function fireWeapon(event) {
  let weaponPosition = playerPosition

  function addWeapon() {
    cells[weaponPosition].classList.add(weaponClass)
  }
  function removeWeapon() {
    cells[weaponPosition].classList.remove(weaponClass)
  }

  function addWeaponFrames(){
   
    cells[playerPosition].classList.remove(playerClass)
    cells[playerPosition].classList.add('weaponFrameOne')
    cells[playerPosition].classList.remove('weaponFrameOne')
    cells[playerPosition].classList.add('weaponFrameTwo')
    cells[playerPosition].classList.remove('weaponFrameTwo')
    cells[playerPosition].classList.add(playerClass)

  }


  const y = Math.floor(playerPosition / gridWidth)

  switch (event.keyCode) {
    case 69:
      timer = setInterval(() => {
         
        if (cells[weaponPosition].classList.contains('enemy')){
          cells[weaponPosition].classList.remove(enemy)
          cells[weaponPosition].classList.remove(weaponClass)
          const index = enemyArray.indexOf(weaponPosition)

          addWeaponFrames()
        
        } else {
          if (weaponPosition >= y + 1) {
            removeWeapon()
            weaponPosition -= gridWidth
            addWeapon(weaponPosition)
            addWeaponFrames()
          } else {
            addWeaponFrames()
            cells[weaponPosition].classList.remove(weaponClass)
            clearInterval(timer)
          }
        }
      }, 50 )
      break
  }
}




// Event Listeners

window.addEventListener('keyup', fireWeapon)
start.addEventListener('click', movingEnemies)
window.addEventListener('keyup', movePlayer)

