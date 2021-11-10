# General Assembly Project One - Space Invaders

## Overview

For this project I chose to recreate the 1978 classic game Space Invaders. I chose this because it seemed like a decent challenge and one that was just within reach of my skills at the time.

The premise of Space Invaders is relatively simple - the player moves left and right and can fire upwards towards the aliens, who in turn move forwards and fire downwards at the player. My version pays homage to the iconic 90s FPS Doom, as it was making custom levels all the way back in the early 2000s then planted the seed for the career I’m pursuing today.

This was my first project for the Software Engineering course, undertaken 4 weeks into learning JavaScript and my first significant project using that technology.


## Goal and Timeframe
For project one we had 8 days to build a working browser game using only pure JavaScript, CSS and HTML.

## Technologies Used

HTML5
CSS3
JavaScript
GitHub

## Planning

Using Excalidraw and pseudo code, I began by breaking the game down into constituent parts  - grid generation, player & invader placement, player and invader movement, player and invader firing, win and loss states and a score counter.

With this established, I then thought of some nice to have elements/what elements of the theme I wanted to incorporate (mainly things to make it more Doom-y - things like reload animations,  enemy types, sound effects etc).

So at this point I had the theme, the parts, and some nice to haves, so I did a brief day by day plan in Trello - basically working through in the order I felt was most logical and then leaving a day at the end for styling/Doomifying.

![](https://github.com/theobrooke009/sei-project-one/blob/main/readme-images/project-1-readme-image-1.png)

## Development

### Grid Generation & Placement

I began by setting a variable to select the grid div,  two variables to set both grid width and board size (the latter was just grid width multiplied by grid width) as well as a blank array to hold the created grid cells.

From this I could write the following grid builder function, which uses a for loop to append divs as child elements to the main div as well as pushing them into the blank array created to hold cells:

```javascript
  function buildGrid() {
  for (let i = 0; i < totalNumberOfGridCells; i++) {
    const newCell = document.createElement('div')
    grid.appendChild(newCell)
    cells.push(newCell)
  } 
}
buildGrid()
```

I then created the player and invader start points - the former just being the grid width divided by 2 and the latter being an array holding the index values of the squares on the grid.

### Player & Invader Movement

I began by writing two functions to apply player and enemy classes to different squares on the grid, which can be added or removed in response to inputs/events.

The logic behind player movement is that, in response to input on the left and right directional keys, the class is removed from its initial position (initially set as grid width divided by 2) before being reapplied to a position either +1 to the original (right key) or -1 (left key.).  

Invader movement is slightly more complex, consisting of three functions, which follow the same ‘under x circumstance, remove and reapply classes to grid references’ logic as player movement, but have a move down functionality (basically current position + grid width) and stops once they reach the bottom row:

```javascript
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
```


### Player & Enemy Fire

Player & enemy fire follows the same class addition/removal logic as movement, only doing so vertically and with conditions based on the position of the player/enemy and on the class-content of the destination cell.

For example, if the destination cell of the player fire also contains an enemy, then that enemy is removed from the current board and pushed into a different array, containing enemies removed from the game:

```javascript
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
```
 

In the above, if the weapon position is not greater than the size of the grid, then it moves up the grid one row at a time, if it encounters an enemy class, both it and the enemy class disappear,  that enemy is pushed into a new array and the total number of enemies variable (totalEnemies, hardcoded to 32) is decreased by one.

Once total enemies reaches 0, the game end function runs.

Enemy fire works much the same, only with a random number generator waiting until it finds a cell reference which also contains an enemy class:

```javascript

      const y = Math.ceil(totalNumberOfGridCells)
      if (cells[randomNumber].classList.contains('enemy') && !cells[randomNumber + gridWidth].classList.contains('enemy')){
        cells[randomNumber].classList.remove('enemy')
        cells[randomNumber].classList.add('enemyAttack')
        setTimeout(() => {
          cells[randomNumber].classList.remove('enemyAttack')
          cells[randomNumber].classList.add('enemy')
        }, 200)
        
```


## Challenges

As this was my first project using JavaScript, it’s tempting to just say ‘all of it’ and leave it there,  however, the main challenges which stood out to me are as follows:

- Enemy movement logic and establishing the grid boundaries.
- Creating enemy fire from only the front row of enemies.
- Understating set timers.
- Code organisation.

## Wins/Takeaways

This project really reinforced the pure JavaScript which we’d learned over the past 4 weeks - concepts which were initially alien to me became familiar (mainly DOM manipulation).
It was my first experience trying to write game logic which I really enjoyed.
Getting the shotgun reload animation to sync up with the reload sound was my happiest moment of 2021.

Known Bugs
Enemy movement only goes left to right - I think I’d completely need to re-write my movement function in order to fix this.
Reload animation shows only one frame where there should be three.
Death sound effect plays twice at the end of the game.


## Future Improvements

- I’d like to add some more Doom specific assets like a HUD.
- Different enemy waves and types, which behave analogous to their Doom counterparts.
- Persistent high scores.
- Difficulty modes.
- Better reload animations.

## Key Learnings

This project was successful in helping me take a seriously of previously isolated concepts (functions, arrays etc) and transforming them into a functioning program. Essentially it’s a case of turning some ideas which I’d previously used to answer questions and do homeworks, into a functioning toolbox which I can use to build things.

Additionally, as I build a game for my first ever project, it was really valuable to try and understand how to break down a familiar concept into its constituent parts and then try and recreate its logic using code.

