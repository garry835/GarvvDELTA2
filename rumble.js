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
});

 
// Define Canon class to encapsulate cannon behavior
class Canon {
    constructor(Baseboard) {
        this.Baseboard = Baseboard; // Reference to the baseboard container
        this.row = 0; // Initial row position
        this.col = 0; // Initial column position
    }

    // Method to move the cannon
    move(direction) {
        // Update the cannon's position based on the direction
        switch (direction) {
            case 'up':
                if (this.row > 0) this.row--; // Move up if not at the top
                break;
            case 'down':
                if (this.row < 7) this.row++; // Move down if not at the bottom
                break;
            case 'left':
                if (this.col > 0) this.col--; // Move left if not at the leftmost
                break;
            case 'right':
                if (this.col < 7) this.col++; // Move right if not at the rightmost
                break;
        }
        this.render(); // Update the position on the baseboard
    }

    // Method to render the cannon on the baseboard
    render() {
        this.Baseboard.innerHTML = ''; // Clear the baseboard
        const img = document.createElement('img'); // Create an image element
        img.src = 'Canon.jpg';
        
        img.alt = 'Cannon'; // Set alt attribute for accessibility
        this.Baseboard.appendChild(img); // Append the cannon image to the baseboard
    }
}

// Get baseboard container by ID
const Baseboard = document.getElementById('Baseboard');

// Create a new instance of Canon
const canon = new Canon(Baseboard);

// Event listener for keyboard input
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            canon.move('up'); // Move cannon up on ArrowUp key press
            break;
        case 'ArrowDown':
            canon.move('down'); // Move cannon down on ArrowDown key press
            break;
        case 'ArrowLeft':
            canon.move('left'); // Move cannon left on ArrowLeft key press
            break;
        case 'ArrowRight':
            canon.move('right'); // Move cannon right on ArrowRight key press
            break;
    }
});

