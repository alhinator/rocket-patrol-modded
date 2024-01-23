//small ship prefab
class SmallShip extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed*2.5
    }

    update(){
        //move left
        this.x -= this.moveSpeed
        if (this.x <= 0 - this.width -  game.config.width/6) {
            this.x = game.config.width +  game.config.width/6
        }
    }

    reset() {
        this.x = game.config.width +  game.config.width/6
        this.y = borderUISize*(Math.random()*4+4) + borderPadding*3.5
    }
  
}