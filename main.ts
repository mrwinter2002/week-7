controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . 3 c c c 3 . . . . . 
        . . . b b b 3 c 9 c 3 b b b . . 
        . . . . . . 3 c c c 3 . . . . . 
        . . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, hero, -50, 0)
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . 3 c c c 3 . . . . . 
        . . . b b b 3 c 9 c 3 b b b . . 
        . . . . . . 3 c c c 3 . . . . . 
        . . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, hero, 50, 0)
    projectile.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.changeDataNumberBy(otherSprite, "health", -1)
    sprite.destroy()
    statusbar.value += -5
    if (sprites.readDataNumber(otherSprite, "health") == 0) {
        otherSprite.destroy()
    }
})
let zombie: Sprite = null
let statusbar: StatusBarSprite = null
let projectile: Sprite = null
let hero: Sprite = null
hero = sprites.create(img`
    . . . . . . 5 . 5 . . . . . . . 
    . . . . . f 5 5 5 f f . . . . . 
    . . . . f 1 5 2 5 1 6 f . . . . 
    . . . f 1 6 6 6 6 6 1 6 f . . . 
    . . . f 6 6 f f f f 6 1 f . . . 
    . . . f 6 f f d d f f 6 f . . . 
    . . f 6 f d f d d f d f 6 f . . 
    . . f 6 f d 3 d d 3 d f 6 f . . 
    . . f 6 6 f d d d d f 6 6 f . . 
    . f 6 6 f 3 f f f f 3 f 6 6 f . 
    . . f f d 3 5 3 3 5 3 d f f . . 
    . . f d d f 3 5 5 3 f d d f . . 
    . . . f f 3 3 3 3 3 3 f f . . . 
    . . . f 3 3 5 3 3 5 3 3 f . . . 
    . . . f f f f f f f f f f . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(hero)
game.onUpdateInterval(500, function () {
    zombie = sprites.createProjectileFromSide(img`
        ........................
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff7777ff........
        .......fb777777bf.......
        .......f77777777f.......
        ......f6777777776f......
        ......f6777777776f......
        ......f6777777776f......
        ......f6777777776f......
        ......f6667777666fff....
        ......fb6bf66fb6bfcf....
        ......fc6cf77fc6cfbf....
        ....ffffff6b7b6ffcff....
        ....fcb7bcffffffff......
        ....f7c7c7ffffff........
        ....f6f6f6fffff.........
        .....f.f.f..............
        ........................
        ........................
        ........................
        `, randint(-50, 50), randint(-50, 50))
    zombie.setKind(SpriteKind.Enemy)
    statusbar = statusbars.create(10, 4, StatusBarKind.Health)
    statusbar.setColor(11, 1)
    statusbar.value = 20
    statusbar.attachToSprite(zombie)
    sprites.setDataNumber(zombie, "health", 4)
})
