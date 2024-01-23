// Alex Leghart
//Mod Title: Modkit Patrol
//Time Taken Per Mod: 30m (both time mods) + 10m (smaller rocket mod) + 1m (control after rocket fired) + 20m (particle effect)
//Mods:
    //Time increment on hit/miss (5p)
    //Time shown on screen (3p)
    //Smaller Rocket (5p)
        //Bonus Mod: Changes  y-pos on kill/reset but not screen loop
    //Particle effect on spaceship hit (5p)
    //Control Rocket on fire (1p)

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

