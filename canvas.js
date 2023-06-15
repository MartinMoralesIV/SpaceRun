import platform from '../img/platform.png'
import hills from '../img/hills.png'
import background from '../img/background.png'
import platformSmallTall from '../img/platformSmallTall.png'

import spriteRunLeft from '../img/spriteRunLeft.png'
import spriteRunRight from '../img/spriteRunRight.png'
import spriteStandLeft from '../img/spriteStandLeft.png'
import spriteStandRight from '../img/spriteStandRight.png'

console.log(platform)
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 1.3  // gravity CONST that affects how fast player falls //

      /// ------------------ Creating the Player Class  ------------------ ///
class Player {
  constructor() {
    this.speed = 10  /// ------------ PLAYER SPEED  10  is best ------------ ///
    this.position = {         // Setting default POSITION values //
      x: 100,
      y: 100
    } //END of position

              // Adding VELOCITY to our player (GRAVITY) //
    this.velocity = {
      x: 0,
      y: 0
    } // END of velocity

    this.width = 67     // Setting default SIZE values    //
    this.height = 150

    this.image = createImage(spriteStandRight)
    this.frames = 0
    this.sprites = {
      stand: {
        right: createImage(spriteStandRight),
        left: createImage(spriteStandLeft),
        cropWidth: 177,
        width: 66
      }, 
      run: {
        right: createImage(spriteRunRight),
        left: createImage(spriteRunLeft),
        cropWidth: 341,
        width: 127.875
      }
    }

    this.currentSprite = this.sprites.stand.right
    this.currentCropWidth = 177
  } // END of constructor element
      /// ------------------ Drawing what player looks like ------------------ ///
  draw() {
     c.drawImage(
      this.currentSprite, 
      this.currentCropWidth * this.frames, 
      0,
      this.currentCropWidth,
      400,
      this.position.x, 
      this.position.y, 
      this.width, 
      this.height
      )
  }
          /// --------- UPDATE function changes player properties over time --------- ///
  update() {
    this.frames++
    if (this.frames > 59 && (this.currentSprite === this
      .sprites.stand.right || this.currentSprite === this.sprites.stand.left) 
      )
      this.frames = 0
    else if (this.frames > 29 && (this.currentSprite === this
      .sprites.run.right || this.currentSprite == this.sprites.run.left))
      this.frames = 0
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y +this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity              // ----- IF statement that keeps player form falling off bottom of screen ----- /

  }
}

      /// ------------------ Creating the Scrolling and Moving Platforms for game ------------------ ///
class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    }

    this.image = image
    this.width = image.width
    this.height = image.height 
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    }

    this.image = image
    this.width = image.width
    this.height = image.height
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

function createImage(imageSrc) {
  const image = new Image()
  image.src = imageSrc
  return image
}

let platformImage = createImage(platform)
let platformImageSmallTallImage = createImage(platformSmallTall)

      /// ------------------ Emplementing the Player Class  ------------------ ///
let player = new Player()
let platforms = []
let genericObjects = []

let lastKey
const keys = {
  right: {
    pressed: false
  },
    left: {
    pressed: false
  },
}

let scrollOffset = 0   // Constant used as counter for distance traveled (TO WIN GAME) ///

function init() {
  platformImage = createImage(platform)

              /// ---------------------------------------- UPPER PLATFORMS  ----------------------------------------------///
  player = new Player()
  platforms = [
    new Platform({
    x: platformImage.width * 4 + 300 - 2 + platformImage.width - platformImageSmallTallImage.width,
    y: 270,
    image: createImage(platformSmallTall)
  }),
    new Platform({
    x: platformImage.width * 7.5 + 600 - 2 + platformImage.width - platformImageSmallTallImage.width,
    y: 270,
    image: createImage(platformSmallTall)
  }),
    new Platform({
    x: platformImage.width * 7.5 + 2000 - 2 + platformImage.width - platformImageSmallTallImage.width,
    y: 270,
    image: createImage(platformSmallTall)
  }),
    new Platform({
    x: platformImage.width * 7.5 + 2500 - 2 + platformImage.width - platformImageSmallTallImage.width,
    y: 80,
    image: createImage(platformSmallTall)
  }),
    new Platform({
    x: platformImage.width * 7.5 + 3000 - 2 + platformImage.width - platformImageSmallTallImage.width,
    y: 270,
    image: createImage(platformSmallTall)
  }),

                      /// --------------------------- LOWER PLATFORMS ---------------------------- ///
  new Platform({
    x: -2,
    y: 470,
    image: platformImage
  }), 
  new Platform({
    x: platformImage.width -4,
    y: 470,
    image: platformImage
  }),
  new Platform({
    x: platformImage.width * 2 + 100,
    y: 470,
    image: platformImage
  }),
  new Platform({
    x: platformImage.width * 3 + 300,
    y: 470,
    image: platformImage
  }),
  new Platform({
    x: platformImage.width * 4 + 298,
    y: 470,
    image: platformImage
  }),
  new Platform({
    x: platformImage.width * 5 + 698,
    y: 470,
    image: platformImage
  }),
  new Platform({
    x: platformImage.width * 6 + 950,
    y: 470,
    image: platformImage
  }),
  new Platform({
    x: platformImage.width * 7 + 1760,
    y: 470,
    image: platformImage
  }),
  new Platform({
    x: platformImage.width * 8 + 3500,
    y: 470,
    image: platformImage
  }),
  new Platform({
    x: platformImage.width * 9 + 3498,
    y: 470,
    image: platformImage
  }),



  ]
                /// ------------- Background -------------
  genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(background)
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(hills)
    })

    ]
          
  scrollOffset = 0   // used as counter for distance traveled (TO WIN GAME) ///

} /// END of init()

      /// ------------------ ANIMATE function loops to keep player movement consant  ------------------ ///
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

genericObjects.forEach(genericObject => {
  genericObject.draw()
})

  platforms.forEach(platform => {
    platform.draw()
  })
  player.update()

  if (keys.right.pressed && player.position.x < 400) {  // ----- Movement code to stop PLAYER when key is lifted ----- //
    player.velocity.x = player.speed
  } else if (
    (keys.left.pressed && player.position.x > 100) || 
    (keys.left.pressed && scrollOffset == 0 
    && player.position.x > 0)
    ) {
    player.velocity.x = -player.speed
  } else {
    player.velocity.x = 0

    if (keys.right.pressed) {     // ---- Movement code for PLATFORMS to move, giving "scroll" effect ----- // 
      scrollOffset += player.speed
      platforms.forEach((platform) => {
      platform.position.x -= player.speed
      })
      genericObjects.forEach(genericObject => {
        genericObject.position.x -= player.speed * .50
      })
      
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed
      platforms.forEach((platform) => {
      platform.position.x += player.speed
      })

      genericObjects.forEach(genericObject => {
        genericObject.position.x += player.speed * .60
      })

    } //END of IF
  }

  platforms.forEach((platform, platformSmallTall) => {
    if (                                       
    // ----- IF statement for platform COLLISSION DETECTION  ----- //
      player.position.y + player.height <= 
        platform.position.y && 
      player.position.y + player.height + player.velocity.y >= 
        platform.position.y && player.position.x + player.width >=
        platform.position.x && player.position.x <=
        platform.position.x + platform.width
    ) {
      player.velocity.y = 0
    } // END of IF for collision det.
  })


            // ---------- Sprite Switching -----------// 
  if (
    keys.right.pressed && 
    lastKey === 'right' && player.currentSprite !==
    player.sprites.run.right) {
    player.frames = 1
    player.currentSprite = player.sprites.run.right
    player.currentCropWidth = player.sprites.run.cropWidth
    player.width = player.sprites.run.width
  } else if (
    keys.left.pressed && 
    lastKey === 'left' && 
    player.currentSprite !== player.sprites.run.left) {
    player.currentSprite = player.sprites.run.left
    player.currentCropWidth = player.sprites.run.cropWidth
    player.width = player.sprites.run.width
  }
  else if (
    !keys.left.pressed && 
    lastKey === 'left' && 
    player.currentSprite !== player.sprites.stand.left) {
    player.currentSprite = player.sprites.stand.left
    player.currentCropWidth = player.sprites.stand.cropWidth
    player.width = player.sprites.stand.width
  }
  else if (
    !keys.right.pressed && 
    lastKey === 'right' && 
    player.currentSprite !== player.sprites.stand.right) {
    player.currentSprite = player.sprites.stand.right
    player.currentCropWidth = player.sprites.stand.cropWidth
    player.width = player.sprites.stand.width
  }


//-win condition-//
  if (scrollOffset > platformImage.width * 5 + 300 - 2) {         /// ----- Distance required for player to WIN GAME ------ ///
    console.log('You win!')
  }

//-lose condition-//
  if(player.position.y > canvas.height) {
    init()
  }
}
init()
animate()

                     /// ------------------ Event Listeners  (game controls) ------------------ ///

window.addEventListener('keydown', ({ keyCode }) => {
  // console.log(keyCode)
  switch (keyCode) {
    case 65:
      console.log('left')     // LEFT button assigned to A //
      keys.left.pressed = true
      lastKey = 'left'
      break

    case 83:            // DOWN button assigned to S //
      console.log('down')
      break

    case 68:            // RIGHT button assigned to D //
      console.log('right')
      keys.right.pressed = true
      lastKey = 'right'
      break

    case 87:
      console.log('up')     // UP button assigned to W  //
      player.velocity.y -= 25
      break
  }
})

window.addEventListener('keyup', ({ keyCode }) => {
  // 'console.log(keyCode)' to view codes 
  switch (keyCode) {
    case 65:
      console.log('left')
      keys.left.pressed = false
      break

    case 83:
      console.log('down')
      break

    case 68:
      console.log('right')
      keys.right.pressed = false
      break

    case 87:
      console.log('up')
      break
  }
})

