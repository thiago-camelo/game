let myGamePiece

function startGame() {

    console.log("starting game....")

    myGamePiece = new component(30, 30, "red", 10, 120)
    myScore = new component("30px", "Consolas", "black", 280, 40, "text")

    // criar eventos das direções
    document.addEventListener('keypress', function(event) {
        
        console.log('i', event.key)

        if (event.key == 's')
            myGamePiece.speedY = 2

        if (event.key == 'w')
            myGamePiece.speedY = -2
        
        if (event.key == 'd')
            myGamePiece.speedX = 2

        if (event.key == 'a')
            myGamePiece.speedX = -2
        
    })

    window.addEventListener('keyup', function(event) {

        if (event.key == 's')
            myGamePiece.speedY = 0

        if (event.key == 'w')
            myGamePiece.speedY = 0
        
        if (event.key == 'd')
            myGamePiece.speedX = 0

        if (event.key == 'a')
            myGamePiece.speedX = 0
    })

    myGameArea.start()

    window.requestAnimationFrame(updateGameArea)

}

function component(width, height, color, x, y, type) {
    this.type = type
    this.score = 0
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.x = x
    this.y = y
    this.update = function () {
        ctx = myGameArea.context
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height
            ctx.fillStyle = color
            ctx.fillText(this.text, this.x, this.y)
        } else {
            ctx.fillStyle = color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    this.newPos = function () {
        this.x += this.speedX
        this.y += this.speedY

        this.hitBorder()
    }
    this.hitBorder = function () {
        
        let hitRight = myGameArea.canvas.width - this.width
        let hitBottom = myGameArea.canvas.height - this.height

        if (this.x > hitRight)
            this.x = hitRight
        
        if (this.y > hitBottom)
            this.y = hitBottom

        if (this.x < 0)
            this.x = 0

        if (this.y < 0)
            this.y = 0

    }

    this.crashWith = function (otherobj) {
        let myleft      = this.x
        let myright     = this.x + this.width
        let mytop       = this.y
        let mybottom    = this.y + this.height
        let otherleft   = otherobj.x
        let otherright  = otherobj.x + otherobj.width
        let othertop    = otherobj.y
        let otherbottom = otherobj.y + otherobj.height
        let crash       = true
        if (
            mybottom < othertop ||
            mytop > otherbottom ||
            myright < otherleft ||
            myleft > otherright
        ) {
            crash = false
        }
        return crash
    }
}

let myGameArea = {
    canvas: document.getElementById("canvas"),
    start: function () {
        this.canvas.width = 800
        this.canvas.height = 500
        this.context = this.canvas.getContext("2d")
        this.frameNo = 0
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
}

function updateGameArea() {
    
    let x, height, gap, minHeight, maxHeight, minGap, maxGap
    
    myGameArea.clear()
    myGameArea.frameNo += 1
    
    myScore.text = "SCORE: " + myGameArea.frameNo
    myScore.update()
    myGamePiece.newPos()
    myGamePiece.update()

    window.requestAnimationFrame(updateGameArea)

}

startGame()
