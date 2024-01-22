//rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)

        //add object to existing scene
        scene.add.existing(this)

        this.isFiring = false
        this.moveSpeed = 2

        this.sfxShot = scene.sound.add('sfx-shot')
    }

    update(){
        //lr movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed
            }
        }

        //fire
        if(Phaser.Input.Keyboard.JustDown(keyFIRE)) {
            if (!this.isFiring){
                this.sfxShot.play()
            }
            this.isFiring = true
        }

        //if firing, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed
        }

        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset()
        }
    }

    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding        
    }

}