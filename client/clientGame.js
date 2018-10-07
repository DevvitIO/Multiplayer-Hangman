export class clientGame {
    // This code should take a data object from the socket
    // run any logic the client needs, and bounce visual effects
    // to clientDisplay. 

    // Good questions might be 
    // - what if we wanted a specific animation for a specific part
    // - does someone working on the logic have to understand the networking?
    // - Same applies to graphical effects and logic
    constructor() {
        this.bodyParts = ['Head',
                          'Torso', 
                          'Right_Arm', 
                          'Left_Arm', 
                          'Right_leg', 
                          'Left_Leg'
                         ]; // Bodypart ID's, in order of reveal
        this.partIndex = 0;            
    }

    revealPart() {
        var currentPartID = this.bodyParts[this.partIndex];
        var currentPartElem = document.getElementById(currentPartID);
        currentPartElem.style.display = "block"; // This should really bounce to another file dedicated to graphics
        this.partIndex += 1;
    }

    reset() {
        this.partIndex = 0;
        for (let part of this.bodyParts) {
            let partElem = document.getElementById(part);
            console.log(partElem);
            partElem.style.display = "none"; // Should bounce to display scripts
        }
    }
}

// Example 
var game = new clientGame();
game.revealPart();
game.revealPart();
game.reset();