// Elements
const grid = document.querySelector('.grid')
// const weapon = document.querySelector('.weapon')
const enemies = document.querySelectorAll('.enemy')
const start = document.querySelector('.start')
const cells = []
let enemyArray = [0, 1, 2, 3, 4, 5, 6]


// Grid variables

let width = 13
const cellCount = width * width

// Game Variables

let timer = 0
const playerClass = 'player'
const weaponClass = 'weapon'
const leadEnemy = 'leadEnemy'
let enemy = 'enemy'
const missileClass = 'missile'

let playerPosition = parseFloat(Math.floor(cellCount - (width / 2)))
let leadEnemyPosition = enemyArray[6]
let enemyTwo = enemyArray[(leadEnemyPosition - 1)]
let enemyThree = enemyArray[(leadEnemyPosition - 2)]
let enemyFour = enemyArray[(leadEnemyPosition - 3)]
let enemyFive = enemyArray[(leadEnemyPosition - 4)]
let enemySix = enemyArray[(leadEnemyPosition - 5)]
let enemySeven = enemyArray[(leadEnemyPosition - 6)]
let shotInProgress = false
let missilePoint = 9
let row = 1

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

// function addWeapon() {
//   cells[weaponPosition].classList.add(weaponClass)
// }

function missleClassAdd() {
  cells[missilePoint].classList.add(missileClass)
}

function missleClassRemove() {
  cells.forEach(cell => cell.classList.remove(missileClass))
}

//enemy functions


// this changes the array just fine but I cant work out how to access the elements and apply them to enemy positions



function addLeadEnemy() {
  cells[leadEnemyPosition].classList.add('leadEnemy')  
  cells[enemyTwo].classList.add('enemy')
  cells[enemyThree].classList.add('enemy')
  cells[enemyFour].classList.add('enemy')
  cells[enemyFive].classList.add('enemy')
  cells[enemySix].classList.add('enemy')
  cells[enemySeven].classList.add('enemy')
}

function removeLeadEnemy() {
  cells[leadEnemyPosition].classList.remove('leadEnemy')
  cells[enemyTwo].classList.remove('enemy')
  cells[enemyThree].classList.remove('enemy')
  cells[enemyFour].classList.remove('enemy')
  cells[enemyFive].classList.remove('enemy')
  cells[enemySix].classList.remove('enemy')
  cells[enemySeven].classList.remove('enemy')
}



  function moveEnemies() {
    timer = setInterval(() => {
  
          removeLeadEnemy()
          leadEnemyPosition++
          enemyTwo++
          enemyThree++
          enemyFour++
          enemyFive++
          enemySix++
          enemySeven++
          addLeadEnemy()
  
  
  
          console.log(leadEnemyPosition)
    }, 500
    )
  }
  // const x = leadEnemyPosition % width
  // let row = 1
  // let isPathClear = true
  
  // setInterval(() => {
  //   // function moveRight() {
    
  //   while (isPathClear) {
      
  //     console.log(leadEnemyPosition)
  //     removeLeadEnemy()
    
  
  //     enemyArray.map(mapEnemy => {
  //       mapEnemy = mapEnemy + 1
        
  //       console.log(mapEnemy)
  //       cells[mapEnemy].classList.add('enemy')
  //       cells[mapEnemy].classList.add('leadEnemy')
  //     })
  //     console.log(enemyArray)
  //     if (x >= (row * width) - 1) {
        
  //       isPathClear = false
  //       return
  //     }
  //     return
  //   } 
        
  //   // }
  


  // }, 500) 
  //  function moveRight() {
    
  //   while (isPathClear) {
  //     console.log('here')
  //     removeLeadEnemy()
  //     console.log('here')
  //     enemyArray.map(mapEnemy => {
  //       console.log('here')
  //       mapEnemy += 1
  //       console.log(mapEnemy)
  //       cells[mapEnemy].classList.add(enemy)
  //       cells[mapEnemy].classList.add(leadEnemy)
  //     })
  //     if (x >= (row * width) - 1) {
  //       console.log('here')
  //       isPathClear = false
  //       return
  //     }
  //     return
  //   } 
      
  // }

  // moveRight()
    

  // }
  // const x = leadEnemyPosition % width
  // const y = Math.floor(leadEnemyPosition / width)
  // if (y >= 0) {

  //   if (leadEnemyPosition < cellCount - width){
  //     removeLeadEnemy()
  //     leadEnemyPosition++
  //     enemyTwo++
  //     enemyThree++
  //     enemyFour++
  //     enemyFive++
  //     enemySix++
  //     enemySeven++
  //     addLeadEnemy()
      

      // } else if (width !== 0 && x === width - 1){
      //   row += 1
      //   removeLeadEnemy()
      //   leadEnemyPosition += width
      //   enemyTwo += width
      //   enemyThree += width
      //   enemyFour += width
      //   enemyFive += width
      //   enemySix += width
      //   enemySeven += width
      //   leadEnemyPosition--
      //   width = 0
      //   addLeadEnemy()
      //   console.log(row)
        

      // } else if (width === 0 && x > 0 && leadEnemyPosition < cellCount - width) {
      //   removeLeadEnemy()
      //   leadEnemyPosition--
      //   enemyTwo--
      //   enemyThree--
      //   enemyFour--
      //   enemyFive--
      //   enemySix--
      //   enemySeven--
      //   addLeadEnemy()
      //   width = 13
      // }
   
    }
  }
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
      }
      break
    case 37:
      if (x > 0) {
        playerPosition--
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
  let weaponPosition = playerPosition + width

  function addWeapon() {
    cells[weaponPosition].classList.add(weaponClass)
  }
  
  timer = setInterval(() => {
  
    const y = Math.floor(playerPosition / width)
  
    switch (event.keyCode) {
      case 69:
        if (weaponPosition >= y + 1) {
            
          weaponClassNuke()
          weaponPosition -= width
          addWeapon(weaponPosition)
          console.log(weaponPosition)
            
        } else {
          clearInterval(timer)
          weaponClassNuke()
          return
        }
        break      
    } 
  }) 
}


function enemyBomb() {
  timer = setInterval(() => {
    const y = Math.floor(playerPosition / width)
    
    if (leadEnemyPosition < cellCount - (width * 2)) {
    //   let rNJesus = Math.floor((Math.random() * cellCount) + 1)
      if (cells[missilePoint].classList.contains(enemy)){
        missleClassRemove()
        missilePoint += width
        missleClassAdd()
        console.log('fire bomb')
      }
    }
  }, 1000
  )
}




window.addEventListener('keyup', xAxisMove)
window.addEventListener('keyup', fireWeapon)
start.addEventListener('click', moveEnemies)
start.addEventListener('click', enemyBomb)