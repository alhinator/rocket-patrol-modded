class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    preload(){

    }

    create(){
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)


        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        
        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)
        this.ship04 = new SmallShip(this, game.config.width + game.config.width/6, borderUISize*6 + borderPadding*3.5, 'smallship', 0, 50).setOrigin(0,0)
  

        //keybinds
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    
        //init score    
        this.p1Score = 0
        //display score
        let scoreConfig = {
            fontFamily: 'Courier', 
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

        this.gameOver = false
        // 60-second play clock
        //modded
        this.clock = game.settings.gameTimer
        this.timeLast = -1

        this.timeText = this.add.text(game.config.width*3/4 + borderPadding, borderUISize + borderPadding*2, this.clock, scoreConfig)


        scoreConfig.fixedWidth = 0
        // this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        //     this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
        //     this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
        //     this.gameOver = true
        // }, null, this)

        //fire UI
        this.fireUI = this.add.text(game.config.width/2 - borderPadding*2, borderUISize + borderPadding*2, "FIRE", scoreConfig)
        this.fireUI.alpha = 0


        //particle emitters
        //code adapted from https://labs.phaser.io/edit.html?src=src\game%20objects\particle%20emitter\explode%20emitter.js

        this.emitter = this.add.particles(-100,-100, 'bit', {
          lifespan: 1200,
          speed: {min: 10, max: 50},
          scale: {start:4, end:0},
          gravityX: 200,
          gravityY: 1,
          blendMode: 'ADD', 
          emitting: false
        })

        this.createExplosion = (_x, _y) => {
          this.emitter.setPosition(_x, _y)
          this.emitter.explode(Math.random()*10+10)
        }
        
    }

    update(time, delta){
        
    // check key input for restart
    if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
        this.scene.restart()
    }
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        this.scene.start("menuScene")
    }

        if(!this.gameOver){
            this.p1Rocket.update()
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            this.ship04.update()

            if (this.timeLast == -1) {
              this.timeLast = time
            }
            //timecount
            //console.log(`time: ${time}`)
            //console.log(`timeLast: ${this.timeLast}`)
            if (time >= this.timeLast + 1000){
              console.log("clock update")
              this.timeLast += 1000
              this.clock -= 1
              this.timeText.text = this.clock

              
            }
            if (this.clock <= 0){
              this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
              this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
              this.gameOver = true
              this.timeText.text = 0

            }
            
            
        }
        



        this.starfield.tilePositionX -= 4

        //collisions
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }    
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            console.log('kaboom ship 01')
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
          console.log('kaboom ship 04')
          this.p1Rocket.reset()
          this.shipExplode(this.ship04)
        }
    }


    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
      }

      shipExplode(ship){
        this.incTime(1)
        ship.alpha = 0
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0)
        this.createExplosion(ship.x + ship.width/2, ship.y + ship.height/2)
        boom.anims.play('explode')
        boom.on('animationcomplete', () => {
            ship.reset()
            ship.alpha = 1
            boom.destroy()
        })
        //score & text
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score    
        
        this.sound.play('sfx-explosion')
      }

      incTime(amount){
        this.clock += amount
        this.timeText.text = this.clock
      }

      fireAlpha(_a){
        this.fireUI.alpha = _a
      }
}