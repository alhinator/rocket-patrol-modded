// Alex Leghart
//Mod Title: Modkit Patrol
/*
Time Breakdown: 
    45m (both time mods)
    10m (smaller rocket mod)
    1m (control after rocket fired)
    20m (particle effect)
    5m (fire ui)
    total: ~1h20m to 1h30m
Mods:
    Time increment on hit/miss (5p)
        1s added, 1s subtracted. Text force-updated on timer update
    Time shown on screen (3p)
    Smaller Rocket (5p)
        Changes  y-pos on kill/reset but not screen loop
    Particle effect on spaceship hit (5p)
    Control Rocket on fire (1p)
        moves half as fast horizontally as when not firing
    "FIRE" UI text (1p)
*/

//citation for particle emitter code also in play.js
//code adapted from https://labs.phaser.io/edit.html?src=src\game%20objects\particle%20emitter\explode%20emitter.js



let config = {
    type: Phaser.AUTO,
    width: 640,
    height:480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config)




//set ui sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let keyFIRE, keyRESET, keyLEFT, keyRIGHT

