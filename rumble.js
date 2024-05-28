document.addEventListener("DOMContentLoaded", function() {
    const Baseboard = document.getElementById('Baseboard');
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            
            // Alternate between white and purple
            if ((row + col) % 2 === 0) {
                square.classList.add("white");
            } else {
                square.classList.add("purple");
            }
            
            Baseboard.appendChild(square);
        }
    }
    
    // Define Canon class to encapsulate cannon behavior
    //The constructor here is the parameter with which the class has been showed

     class Canon {
        constructor(Baseboard, initialCol,initialRow) {
            this.Baseboard = Baseboard; // Reference to the baseboard container
            this.row = initialRow; 
            this.col = initialCol; // Initial column position
            this.img = document.createElement('img'); // Create an image element
            this.img.src = 'Canon.jpg';
            this.img.classList.add('canon'); // Adds the CSS class canon
            this.render(); // Initial render
        }

        // Method to move the cannon
        move(direction) {
            // Update the cannon's position based on the direction
            switch (direction) {
                case 'left':
                    if (this.col > 0) this.col--; // Move left if not at the leftmost
                    break;
                case 'right':
                    if (this.col < 7) this.col++; // Move right if not at the rightmost
                    break;
                // Ignore 'up' and 'down' directions to keep the cannon in the bottom row
            }
            this.render(); // Update the position on the baseboard
        }

        // Method to render the cannon on the baseboard
        render() {
            const squares = this.Baseboard.children;
            for (let i = 0; i < squares.length; i++) {
                if (squares[i].contains(this.img)) {
                    squares[i].innerHTML = ''; // Clear previous position of this cannon
                }
            }
            const index = this.row * 8 + this.col;
            squares[index].appendChild(this.img); // Place the cannon image on the correct square
        }
    }

    // Create two instances of Canon
    const canon1 = new Canon(Baseboard, 0,0); // // this we are using to call the class and in those the parameters order matter
    const canon2 = new Canon(Baseboard, 0,7); // Starting at row 8 (index 7), column 8 (index 7)

    // Array to store the cannons
    const cannons = [canon1, canon2];

    // Variable to track the index of the active cannon
    let activeIndex = 0;

    // Event listener for keyboard input
    document.addEventListener('keydown', function(event) {
        if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
            const activeCanon = cannons[activeIndex];
            activeCanon.move(event.key === 'ArrowLeft' ? 'left' : 'right'); // Move the active cannon based on the arrow key pressed
            activeIndex = (activeIndex + 1) % cannons.length; // Switch to the next cannon for the next turn
        }
    });
    
   // Define Tank class to encapsulate tank behavior
   class Tank {
    constructor(Baseboard, initialCol, initialRow) {
        this.Baseboard = Baseboard; // Reference to the baseboard container
        this.row = initialRow; // Initial row position
        this.col = initialCol; // Initial column position
        this.img = document.createElement('img'); // Create an image element
        this.img.src = 'Tank.jpg';
        this.img.classList.add('tank'); // Adds the CSS class tank
        this.render(); // Initial render
    }

    // Method to move the tank
    move(direction) {
        // Update the tank's position based on the direction
        switch (direction) {
            case 'left':
                if (this.col > 0) this.col--; // Move left if not at the leftmost
                break;
            case 'right':
                if (this.col < 7) this.col++; // Move right if not at the rightmost
                break;
            case 'up':
                if (this.row > 0) this.row--; // Move up if not at the top
                break;
            case 'down':
                if (this.row < 7) this.row++; // Move down if not at the bottom
                break;
        }
        this.render(); // Update the position on the baseboard
    }

    // Method to render the tank on the baseboard
    render() {
        const squares = this.Baseboard.children;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].contains(this.img)) {
                squares[i].innerHTML = ''; // Clear previous position of this tank
            }
        }
        const index = this.row * 8 + this.col;
        squares[index].appendChild(this.img); // Place the tank image on the correct square
    }
}

// Create two instances of Tank
const tank1 = new Tank(Baseboard, 1, 0); // Starting at row 1 (index 0), column 1 (index 0)
const tank2 = new Tank(Baseboard, 1, 7); // Starting at row 8 (index 7), column 1 (index 0)

// Array to store the tanks
const tanks = [tank1, tank2];

// Variable to track the index of the active tank
let activeIndex2 = 0;

// Event listener for keyboard input
document.addEventListener('keydown', function(event) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        const activeTank = tanks[activeIndex];
        activeTank.move(event.key.replace('Arrow', '').toLowerCase()); // Move the active tank based on the arrow key pressed
        activeIndex = (activeIndex + 1) % tanks.length; // Switch to the next tank for the next turn
    }
})
class Titan {
    constructor(Baseboard, initialCol, initialRow) {
        this.Baseboard = Baseboard; // Reference to the baseboard container
        this.row = initialRow; // Initial row position
        this.col = initialCol; // Initial column position
        this.img = document.createElement('img'); // Create an image element
        this.img.src = 'Titan2.jpg';
        this.img.classList.add('titan'); // Adds the CSS class titan
        this.render(); // Initial render
    }

    // Method to move the titan
    move(direction) {
        // Update the titan's position based on the direction
        switch (direction) {
            case 'left':
                if (this.col > 0) this.col--; // Move left if not at the leftmost
                break;
            case 'right':
                if (this.col < 7) this.col++; // Move right if not at the rightmost
                break;
            case 'up':
                if (this.row > 0) this.row--; // Move up if not at the top
                break;
            case 'down':
                if (this.row < 7) this.row++; // Move down if not at the bottom
                break;
        }
        this.render(); // Update the position on the baseboard
    }

    // Method to render the titan on the baseboard
    render() {
        const squares = this.Baseboard.children;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].contains(this.img)) {
                squares[i].innerHTML = ''; // Clear previous position of this titan
            }
        }
        const index = this.row * 8 + this.col;
        squares[index].appendChild(this.img); // Place the titan image on the correct square
    }
}

// Create two instances of Titan
const titan1 = new Titan(Baseboard, 2, 1); // Starting at row 1 (index 0), column 1 (index 0)
const titan2 = new Titan(Baseboard, 2, 6); // Starting at row 8 (index 7), column 1 (index 0)

// Array to store the titans
const titans = [titan1, titan2];

// Variable to track the index of the active titan
let activeIndex3 = 0;

// Event listener for keyboard input
document.addEventListener('keydown', function(event) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        const activeTitan = titans[activeIndex];
        activeTitan.move(event.key.replace('Arrow', '').toLowerCase()); // Move the active titan based on the arrow key pressed
        activeIndex = (activeIndex + 1) % titans.length; // Switch to the next titan for the next turn
    }
});
class Ricochet {
    constructor(Baseboard, initialCol, initialRow) {
        this.Baseboard = Baseboard; // Reference to the baseboard container
        this.row = initialRow; // Initial row position
        this.col = initialCol; // Initial column position
        this.img = document.createElement('img'); // Create an image element
        this.img.src = 'ricochet.png';
        this.img.classList.add('ricochet'); // Adds the CSS class ricochet
        this.render(); // Initial render
    }

    // Method to move the ricochet
    move(direction) {
        // Update the ricochet's position based on the direction
        switch (direction) {
            case 'left':
                if (this.col > 0) this.col--; // Move left if not at the leftmost
                break;
            case 'right':
                if (this.col < 7) this.col++; // Move right if not at the rightmost
                break;
            case 'up':
                if (this.row > 0) this.row--; // Move up if not at the top
                break;
            case 'down':
                if (this.row < 7) this.row++; // Move down if not at the bottom
                break;
        }
        this.render(); // Update the position on the baseboard
    }

    // Method to render the ricochet on the baseboard
    render() {
        const squares = this.Baseboard.children;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].contains(this.img)) {
                squares[i].innerHTML = ''; // Clear previous position of this ricochet
            }
        }
        const index = this.row * 8 + this.col;
        squares[index].appendChild(this.img); // Place the ricochet image on the correct square
    }
}

// Create two instances of Ricochet
const ricochet1 = new Ricochet(Baseboard, 4,1); // Starting at row 1 (index 0), column 1 (index 0)
const ricochet2 = new Ricochet(Baseboard, 4,6); // Starting at row 8 (index 7), column 1 (index 0)

// Array to store the ricochets
const ricochets = [ricochet1, ricochet2];

// Variable to track the index of the active ricochet
let activeIndex4 = 0;

// Event listener for keyboard input
document.addEventListener('keydown', function(event) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        const activeRicochet = ricochets[activeIndex];
        activeRicochet.move(event.key.replace('Arrow', '').toLowerCase()); // Move the active ricochet based on the arrow key pressed
        activeIndex = (activeIndex + 1) % ricochets.length; // Switch to the next ricochet for the next turn
    }
});
class SemiRicochet {
    constructor(Baseboard, initialCol, initialRow) {
        this.Baseboard = Baseboard; // Reference to the baseboard container
        this.row = initialRow; // Initial row position
        this.col = initialCol; // Initial column position
        this.img = document.createElement('img'); // Create an image element
        this.img.src = 'Semiricochet.png';
        this.img.classList.add('semiricochet'); // Adds the CSS class semiricochet
        this.render(); // Initial render
    }

    // Method to move the semiricochet
    move(direction) {
        // Update the semiricochet's position based on the direction
        switch (direction) {
            case 'left':
                if (this.col > 0) this.col--; // Move left if not at the leftmost
                break;
            case 'right':
                if (this.col < 7) this.col++; // Move right if not at the rightmost
                break;
            case 'up':
                if (this.row > 0) this.row--; // Move up if not at the top
                break;
            // Ignore 'down' direction to keep the semiricochet in the top row
        }
        this.render(); // Update the position on the baseboard
    }

    // Method to render the semiricochet on the baseboard
    render() {
        const squares = this.Baseboard.children;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].contains(this.img)) {
                squares[i].innerHTML = ''; // Clear previous position of this semiricochet
            }
        }
        const index = this.row * 8 + this.col;
        squares[index].appendChild(this.img); // Place the semiricochet image on the correct square
    }
}

// Create two instances of SemiRicochet
const semiricochet1 = new SemiRicochet(Baseboard, 5, 1); // Starting at row 1 (index 0), column 1 (index 0)
const semiricochet2 = new SemiRicochet(Baseboard, 5, 6); // Starting at row 8 (index 7), column 1 (index 0)

// Array to store the semiricochets
const semiricochets = [semiricochet1, semiricochet2];

// Variable to track the index of the active semiricochet
let activeIndex5 = 0;

// Event listener for keyboard input
document.addEventListener('keydown', function(event) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        const activeSemiRicochet = semiricochets[activeIndex];
        activeSemiRicochet.move(event.key.replace('Arrow', '').toLowerCase()); // Move the active semiricochet based on the arrow key pressed
        activeIndex = (activeIndex + 1) % semiricochets.length; // Switch to the next semiricochet for the next turn
    }
});



});
