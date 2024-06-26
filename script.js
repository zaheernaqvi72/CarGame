// Select DOM elements for score display, start screen, and game area
const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

// Add click event listener to start screen to initialize the game
startScreen.addEventListener('click', initializeGame);

// Initialize player object with speed, score, and lastSpeedIncrement
let player = { 
    speed: 5, 
    score: 0, 
    lastSpeedIncrement: null 
};

// Initialize keys object to track the state of arrow keys
let keys = { 
    ArrowUp: false, 
    ArrowDown: false, 
    ArrowLeft: false, 
    ArrowRight: false 
};

// Add event listeners for keydown and keyup events
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Function to handle keydown event
function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
}

// Function to handle keyup event
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}

// Function to check for collision between two elements
function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) ||
             (aRect.top > bRect.bottom) ||
             (aRect.right < bRect.left) ||
             (aRect.left > bRect.right));
}

// Function to move the road lines in the game area
function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item) {
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

// Function to end the game
function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game over <br> Your final score is " + player.score + "<br>Press here to restart the game.";
}

// Function to move enemy cars in the game area
function moveEnemy(myCar) {
    let enemyCarList = document.querySelectorAll('.enemyCar');
    enemyCarList.forEach(function(enemyCar) {
        if (isCollide(myCar, enemyCar)) {
            endGame();
        }

        if (enemyCar.y >= 750) {
            enemyCar.y = -300;
            enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
            enemyCar.passed = false; // Reset passed status
        }

        enemyCar.y += player.speed;
        enemyCar.style.top = enemyCar.y + "px";

        // Check if myCar has passed the enemyCar
        let myCarRect = myCar.getBoundingClientRect();
        let enemyCarRect = enemyCar.getBoundingClientRect();

        if (myCarRect.bottom < enemyCarRect.bottom && !enemyCar.passed) {
            player.score += 10;
            enemyCar.passed = true; // Mark this enemy car as passed
        }
    });
}

// Main game loop function
function runGame() {
    let car = document.querySelector('.myCar');
    let road = gameArea.getBoundingClientRect();

    if (player.start) {
        moveLines();
        moveEnemy(car);

        if (keys.ArrowUp && player.y > (road.top + 150)) { player.y -= player.speed; }
        if (keys.ArrowDown && player.y < (road.bottom - 85)) { player.y += player.speed; }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed; }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed; }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(runGame);

        // Check time for speed increment
        let currentTime = Date.now();
        if (player.lastSpeedIncrement === null) {
            player.lastSpeedIncrement = currentTime;
        } else if (currentTime - player.lastSpeedIncrement >= 5000) {
            player.speed += 1;
            player.lastSpeedIncrement = currentTime;
        }

        score.innerText = "Score: " + player.score + "\nSpeed: " + player.speed;
    }
}

// Function to initialize the game
function initializeGame() {
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    player.speed = 5;
    player.lastSpeedIncrement = null;

    window.requestAnimationFrame(runGame);

    // Create and position road lines
    for (let x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    // Create and position player's car
    let car = document.createElement('div');
    car.setAttribute('class', 'myCar');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // Create and position enemy cars
    for (let x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemyCar');
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        enemyCar.passed = false; // Reset passed status
        gameArea.appendChild(enemyCar);
    }
}
