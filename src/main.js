// Alex Leghart
//Mod Title: Modkit Patrol
//Time Taken Per Mod: 30m (both time mods) + 10m (smaller rocket mod) + 25m (particle effect)
//Mods:
    //Time increment on hit/miss
    //Time shown on screen
    //Smaller Rocket
        //Bonus Mod: Changes  y-pos on kill/reset but not screen loop
    //Particle effect on spaceship hit

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

