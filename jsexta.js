document.addEventListener("DOMContentLoaded", function () {
    const Baseboard = document.getElementById("Baseboard");

    // Create the checkerboard with squares
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.classList.add((row + col) % 2 === 0 ? "white" : "purple");
            square.dataset.row = row; // Add data attribute for row position
            square.dataset.col = col; // Add data attribute for column position
            Baseboard.appendChild(square);
        }
    }

    let selectedPiece = null;
    let activeIndex = 0; // Track the active cannon index

    // Canon class
    class Canon {
        constructor(Baseboard, initialCol, initialRow) {
            this.Baseboard = Baseboard; // Reference to the baseboard container
            this.row = initialRow; // Initial row position
            this.col = initialCol; // Initial column position
            this.img = document.createElement("img"); // Create an image element for the piece
            this.img.src = "Canon.jpg"; // Set the image source
            this.img.classList.add("canon"); // Add the CSS class for styling
            this.img.addEventListener("click", () => this.selectPiece()); // Add click event listener for selecting the piece
            this.render(); // Render the piece on the board
        }

        selectPiece() {
            if (selectedPiece === this) {
                selectedPiece = null; // Deselect the piece if it's already selected
                this.clearHighlights(); // Clear the highlights
            } else {
                if (selectedPiece) {
                    selectedPiece.clearHighlights(); // Clear highlights of the previously selected piece
                }
                selectedPiece = this; // Set the current piece as selected
                this.showPossibleMoves(); // Show possible moves for the selected piece
            }
        }

        showPossibleMoves() {
            const possibleMoves = [
                { row: this.row, col: this.col - 1 },
                { row: this.row, col: this.col + 1 }
            ];
            possibleMoves.forEach((move) => {
                if (move.col >= 0 && move.col < 8) {
                    const index = move.row * 8 + move.col;
                    const square = this.Baseboard.children[index];
                    square.classList.add("highlight"); // Add highlight class for possible moves
                }
            });
            this.img.classList.add("highlight-piece"); // Highlight the selected piece
        }

        clearHighlights() {
            const squares = this.Baseboard.querySelectorAll(".highlight");
            squares.forEach((square) => square.classList.remove("highlight")); // Remove highlight class from squares
            this.img.classList.remove("highlight-piece"); // Remove highlight class from the piece
        }

        fireCanonball() {
            new Canonball(this.Baseboard, this.row, this.col); // Create and fire a new cannonball
        }

        // Method to move the cannon
        move(direction) {
            switch (direction) {
                case "left":
                    if (this.col > 0) this.col--; // Move left if not at the leftmost edge
                    break;
                case "right":
                    if (this.col < 7) this.col++; // Move right if not at the rightmost edge
                    break;
            }
            this.render(); // Update the piece position on the board
            this.clearHighlights(); // Clear the highlights after moving
            console.log("Canon Moved");
            this.fireCanonball();
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

    class Canonball {
        constructor(Baseboard, initialRow, initialCol) {
            this.Baseboard = Baseboard;
            this.row = initialRow;
            this.col = initialCol;
            this.img = document.createElement('img'); // Create an image element for the cannonball
            this.img.src = 'Canonball.jpg'; // Set the image source for the cannonball
            this.img.classList.add('canonball'); // Add the CSS class for styling
            this.render(); // Render the cannonball on the board
            this.animate(); // Animate the cannonball
        }

        // Method to render the cannonball on the baseboard
        render() {
            const index = this.row  + this.col*8;
            this.Baseboard.children[index].appendChild(this.img);
        }

        // Method to animate the cannonball
        animate() {
            const interval = setInterval(() => {
                if (this.col < 7) { // Move right across the board
                    this.col++;
                    this.render();
                } else {
                    clearInterval(interval); // Stop the animation when it reaches the end of the board
                    this.img.remove(); // Remove the cannonball from the board
                }
            }, 200); // Adjust the speed of the cannonball animation
        }
    }

    // Create two instances of Canon
    const canon1 = new Canon(Baseboard, 0, 0); // Starting at row 0, column 0
    const canon2 = new Canon(Baseboard, 0, 7); // Starting at row 7, column 0
    // When we write any element of yhr class then we usually write the const canon1 types in the form of the constructor.
    // Array to store the cannons
    const cannons = [canon1, canon2];

    // Event listener for keyboard input
    document.addEventListener("keydown", function (event) {
        if (selectedPiece === cannons[activeIndex] && ["ArrowLeft", "ArrowRight"].includes(event.key)) {
            const direction = event.key.replace("Arrow", "").toLowerCase(); // Determine direction based on key
            selectedPiece.move(direction); // Move the selected piece
            selectedPiece.clearHighlights(); // Clear the highlights after moving
            selectedPiece = null; // Deselect the piece after move
            activeIndex = (activeIndex + 1) % cannons.length; // Switch to the next cannon for the next turn
        }
    });
    class Tank {
        constructor(Baseboard, initialCol, initialRow) {
            this.Baseboard = Baseboard; // Reference to the baseboard container
            this.row = initialRow; // Initial row position
            this.col = initialCol; // Initial column position
            this.img = document.createElement('img'); // Create an image element
            this.img.src = 'Tank.jpg';
            this.img.classList.add('tank'); // Adds the CSS class tank
            this.img.addEventListener("click", () => this.selectPiece()); // Add click event listener for selecting the piece
            this.render(); // Initial render
        }

        selectPiece() {
            if (selectedPiece === this) {
                selectedPiece = null; // Deselect the piece if it's already selected
                this.clearHighlights(); // Clear the highlights
            } else {
                if (selectedPiece) {
                    selectedPiece.clearHighlights(); // Clear highlights of the previously selected piece
                }
                selectedPiece = this; // Set the current piece as selected
                this.showPossibleMoves(); // Show possible moves for the selected piece
            }
        }

        showPossibleMoves() {
            const possibleMoves = [
                { row: this.row, col: this.col - 1 },
                { row: this.row, col: this.col + 1 },
                { row: this.row - 1, col: this.col },
                { row: this.row + 1, col: this.col }
            ];
            possibleMoves.forEach((move) => {
                if (move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8) {
                    const index = move.row * 8 + move.col;
                    const square = this.Baseboard.children[index];
                    square.classList.add("highlight"); // Add highlight class for possible moves
                }
            });
            this.img.classList.add("highlight-piece"); // Highlight the selected piece
        }

        clearHighlights() {
            const squares = this.Baseboard.querySelectorAll(".highlight");
            squares.forEach((square) => square.classList.remove("highlight")); // Remove highlight class from squares
            this.img.classList.remove("highlight-piece"); // Remove highlight class from the piece
        }

        // Method to move the tank
        move(direction) {
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
            this.clearHighlights(); // Clear the highlights after moving 
            console.log("Tank Moved");
            
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
    const tank1 = new Tank(Baseboard, 1, 0); // Starting at row 1, column 0
    const tank2 = new Tank(Baseboard, 1, 7); // Starting at row 1, column 7

    // Array to store the tanks
    const tanks = [tank1, tank2];

    // Variable to track the index of the active tank
    let activeIndex2 = 0;

    // Event listener for keyboard input
    document.addEventListener('keydown', function(event) {
        if (selectedPiece === tanks[activeIndex2] && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
            const direction = event.key.replace("Arrow", "").toLowerCase(); // Determine direction based on key
            selectedPiece.move(direction); // Move the selected piece
            selectedPiece.clearHighlights(); // Clear the highlights after moving
            selectedPiece = null; // Deselect the piece after move
            activeIndex2 = (activeIndex2 + 1) % tanks.length; // Switch to the next tank for the next turn
        }
    });
    class Titan {
        constructor(Baseboard, initialCol, initialRow) {
            this.Baseboard = Baseboard; // Reference to the baseboard container
            this.row = initialRow; // Initial row position
            this.col = initialCol; // Initial column position
            this.img = document.createElement('img'); // Create an image element
            this.img.src = 'Titan2.jpg';
            this.img.classList.add('titan'); // Adds the CSS class titan
            this.img.addEventListener("click", () => this.selectPiece()); // Add click event listener for selecting the piece
            this.render(); // Initial render
        }

        selectPiece() {
            if (selectedPiece === this) {
                selectedPiece = null; // Deselect the piece if it's already selected
                this.clearHighlights(); // Clear the highlights
            } else {
                if (selectedPiece) {
                    selectedPiece.clearHighlights(); // Clear highlights of the previously selected piece
                }
                selectedPiece = this; // Set the current piece as selected
                this.showPossibleMoves(); // Show possible moves for the selected piece
            }
        }

        showPossibleMoves() {
            const possibleMoves = [
                { row: this.row, col: this.col - 1 },
                { row: this.row, col: this.col + 1 },
                { row: this.row - 1, col: this.col },
                { row: this.row + 1, col: this.col },
            ]
            possibleMoves.forEach((move) => {
                if (move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8) {
                    const index = move.row * 8 + move.col;
                    const square = this.Baseboard.children[index];
                    square.classList.add("highlight"); // Add highlight class for possible moves
                }
            });
            this.img.classList.add("highlight-piece"); // Highlight the selected piece
        }

        clearHighlights() {
            const squares = this.Baseboard.querySelectorAll(".highlight");
            squares.forEach((square) => square.classList.remove("highlight")); // Remove highlight class from squares
            this.img.classList.remove("highlight-piece"); // Remove highlight class from the piece
        }

        // Method to move the titan
        move(direction) {
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
            this.clearHighlights(); // Clear the highlights after moving
            console.log("Titan Moved");
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
    const titan1 = new Titan(Baseboard, 2, 0); // Starting at row 2, column 0
    const titan2 = new Titan(Baseboard, 2, 7); // Starting at row 2, column 7

    // Array to store the titans
    const titans = [titan1, titan2];

    // Variable to track the index of the active titan
    let activeIndex3 = 0;

    // Event listener for keyboard input
    document.addEventListener('keydown', function(event) {
        if (selectedPiece === titans[activeIndex2] && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "ArrowUpLeft", "ArrowUpRight", "ArrowDownLeft", "ArrowDownRight"].includes(event.key)) {
            const direction = event.key.replace("Arrow", "").toLowerCase(); // Determine direction based on key
            selectedPiece.move(direction); // Move the selected piece
            selectedPiece.clearHighlights(); // Clear the highlights after moving
            selectedPiece = null; // Deselect the piece after move
            activeIndex2 = (activeIndex2 + 1) % titans.length; // Switch to the next titan for the next turn
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
            this.img.addEventListener("click", () => this.selectPiece()); // Add click event listener for selecting the piece
            this.render(); // Initial render
        }

        selectPiece() {
            if (selectedPiece === this) {
                selectedPiece = null; // Deselect the piece if it's already selected
                this.clearHighlights(); // Clear the highlights
            } else {
                if (selectedPiece) {
                    selectedPiece.clearHighlights(); // Clear highlights of the previously selected piece
                }
                selectedPiece = this; // Set the current piece as selected
                this.showPossibleMoves(); // Show possible moves for the selected piece
            }
        }

        showPossibleMoves() {
            const possibleMoves = [
                { row: this.row, col: this.col - 1 },
                { row: this.row, col: this.col + 1 },
                { row: this.row - 1, col: this.col },
                { row: this.row + 1, col: this.col }
            ];
            possibleMoves.forEach((move) => {
                if (move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8) {
                    const index = move.row * 8 + move.col;
                    const square = this.Baseboard.children[index];
                    square.classList.add("highlight"); // Add highlight class for possible moves
                }
            });
            this.img.classList.add("highlight-piece"); // Highlight the selected piece
        }

        clearHighlights() {
            const squares = this.Baseboard.querySelectorAll(".highlight");
            squares.forEach((square) => square.classList.remove("highlight")); // Remove highlight class from squares
            this.img.classList.remove("highlight-piece"); // Remove highlight class from the piece
        }

        // Method to move the ricochet
        move(direction) {
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
            this.clearHighlights(); // Clear the highlights after moving
            console.log("Ricochet Moved");
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
    const ricochet1 = new Ricochet(Baseboard, 4, 1); // Starting at row 1 (index 0), column 4 (index 3)
    const ricochet2 = new Ricochet(Baseboard, 4, 6); // Starting at row 6 (index 5), column 4 (index 3)

    // Array to store the ricochets
    const ricochets = [ricochet1, ricochet2];

    // Variable to track the index of the active ricochet
    let activeIndex4 = 0;

    // Event listener for keyboard input
    document.addEventListener('keydown', function(event) {
        if (selectedPiece === ricochets[activeIndex4] && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
            const direction = event.key.replace('Arrow', '').toLowerCase(); // Determine direction based on key
            selectedPiece.move(direction); // Move the selected piece
            selectedPiece.clearHighlights(); // Clear the highlights after moving
            selectedPiece = null; // Deselect the piece after move
            activeIndex4 = (activeIndex4 + 1) % ricochets.length; // Switch to the next ricochet for the next turn
        }
    });
// Using this let active index 1 2 3 4 we can turn their chances
class Semiricochet {
    constructor(Baseboard, initialCol, initialRow) {
        this.Baseboard = Baseboard; // Reference to the baseboard container
        this.row = initialRow; // Initial row position
        this.col = initialCol; // Initial column position
        this.img = document.createElement('img'); // Create an image element
        this.img.src = 'semiricochet.png';
        this.img.classList.add('semiricochet'); // Adds the CSS class semiricochet
        this.img.addEventListener("click", () => this.selectPiece()); // Add click event listener for selecting the piece
        this.render(); // Initial render
    }

    selectPiece() {
        if (selectedPiece === this) {
            selectedPiece = null; // Deselect the piece if it's already selected
            this.clearHighlights(); // Clear the highlights
        } else {
            if (selectedPiece) {
                selectedPiece.clearHighlights(); // Clear highlights of the previously selected piece
            }
            selectedPiece = this; // Set the current piece as selected
            this.showPossibleMoves(); // Show possible moves for the selected piece
        }
    }

    showPossibleMoves() {
        const possibleMoves = [
            { row: this.row, col: this.col - 1 },
            { row: this.row, col: this.col + 1 },
            { row: this.row - 1, col: this.col },
            { row: this.row + 1, col: this.col }
        ];
        possibleMoves.forEach((move) => {
            if (move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8) {
                const index = move.row * 8 + move.col;
                const square = this.Baseboard.children[index];
                square.classList.add("highlight"); // Add highlight class for possible moves
            }
        });
        this.img.classList.add("highlight-piece"); // Highlight the selected piece
    }

    clearHighlights() {
        const squares = this.Baseboard.querySelectorAll(".highlight");
        squares.forEach((square) => square.classList.remove("highlight")); // Remove highlight class from squares
        this.img.classList.remove("highlight-piece"); // Remove highlight class from the piece
    }

    // Method to move the semiricochet
    move(direction) {
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
        this.clearHighlights(); // Clear the highlights after moving
        console.log("Semiricochet Moved");
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

// Create two instances of Semiricochet
const semiricochet1 = new Semiricochet(Baseboard, 3, 1); // Starting at row 1 (index 0), column 3 (index 2)
const semiricochet2 = new Semiricochet(Baseboard, 3, 6); // Starting at row 6 (index 5), column 3 (index 2)

// Array to store the semiricochets
const semiricochets = [semiricochet1, semiricochet2];

// Variable to track the index of the active semiricochet
let activeIndex6 = 0;

// Event listener for keyboard input
document.addEventListener('keydown', function(event) {
    if (selectedPiece === semiricochets[activeIndex6] && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        const direction = event.key.replace('Arrow', '').toLowerCase(); // Determine direction based on key
        selectedPiece.move(direction); // Move the selected piece
        selectedPiece.clearHighlights(); // Clear the highlights after moving
        selectedPiece = null; // Deselect the piece after move
        activeIndex6 = (activeIndex6 + 1) % semiricochets.length; // Switch to the next semiricochet for the next turn
    }
});



});
