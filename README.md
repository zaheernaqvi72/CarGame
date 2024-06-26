# Car Game

A simple car racing game built with HTML, CSS, and JavaScript. The objective of the game is to avoid collisions with enemy cars and increase your score by passing them.

## Game Features

1. **Player Speed Increment**: The speed of the player’s car increases by 1 every 5 seconds, starting at a speed of 5.
2. **Score Increment**: The score increments by 10 each time the rear end of the player's car passes the rear end of an enemy car.
3. **Collision Detection**: The game ends when the player’s car collides with an enemy car.
4. **Responsive Design**: The game adjusts to different screen sizes.

## Common Issues Addressed

1. Ensured the starting speed is always 5 after restarting the game.
2. Controlled the speed increment to occur only every 5 seconds.
3. Reset the speed increment timer correctly after multiple restarts.
4. Ensured the score increments only when the player's car passes an enemy car, not when the enemy car goes off the screen.
5. Fixed the issue where the score would not increment if the player's car was moving upwards at the time of passing an enemy car.
6. Prevented continuous score increment for the same enemy car.

## How to Play

1. **Start the Game**: Click on the "Press here to start" button.
2. **Control the Car**: Use the arrow keys to move the car up, down, left, and right.
3. **Avoid Collisions**: Avoid colliding with enemy cars to keep the game going.
4. **Increase Your Score**: Pass enemy cars to increase your score.

## Controls

- **Arrow Up**: Move the car upwards.
- **Arrow Down**: Move the car downwards.
- **Arrow Left**: Move the car to the left.
- **Arrow Right**: Move the car to the right.