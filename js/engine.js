let game
const socket = io('localhost:3000')

socket.on('bootstrap', (gameInitialState) => {

    console.log('conectado')

    console.log('Game', gameInitialState);

    game = gameInitialState

    game.start = () => {
        game.canvas = document.createElement('canvas');
        game.canvas.setAttribute('id', 'canvas');
        game.canvas.width = `${game.canvasWidth}`
        game.canvas.height = `${game.canvasHeight}`        
        game.context = game.canvas.getContext('2d')

        document.querySelector('#container').appendChild(game.canvas);
    };
    
    game.start();

    game.render = () => {
        
        game.clear()
        
        // game.frameNo += 1
        // text = "SCORE: " + Math.floor(game.frameNo / 15)
        // myScore.update()
        
        for (const socketId in game.players) {

            const player = game.players[socketId];
            
            if (!player.object) {
                const color = socketId === socket.id ? 'red' : 'blue'

                const object = new gameObject(30, 30, color, player.x, player.y)

                player.object = object                
            }
            
            player.object.move(player.x, player.y)
            player.object.update()
        }

        window.requestAnimationFrame(game.render)

    }

    game.clear = () => {
        game.context.clearRect(0, 0, game.canvasWidth, game.canvasHeight)
    }    

    // user events
    document.addEventListener('keypress', function(event) {
        
        const player = game.players[socket.id]

        console.log('event: ', event.key)

        if (event.key == 'a' && player.x - game.step >= 0) {
            player.x = player.x - game.step;
            socket.emit('player-move', 'left')
        }
        
        if (event.key == 'w' && player.y - game.step >= 0) {
            player.y = player.y - game.step;
            socket.emit('player-move', 'up')
        }

        if (event.key == 'd' && player.x + game.step < game.canvasWidth){
            player.x = player.x + game.step;
            socket.emit('player-move', 'right')
        }
            
        if (event.key == 's' && player.y + game.step < game.canvasHeight) {
            player.y = player.y + game.step
            socket.emit('player-move', 'down')
        }
        
    })

    // socket events
    socket.on('player-update', player => {

        if (!game.players[player.socketId]) {
            const color = player.socketId === socket.id ? 'red' : 'blue'
            const object = new gameObject(30, 30, color, player.x, player.y)
            game.players[player.socketId] = { object }
        }

        game.players[player.socketId] = { 
            ...game.players[player.socketId], 
            ...player.newState
        }

        console.log('atualização...');        
    })

    socket.on('player-remove', socketId => {
        delete game.players[socketId]
    })

    // Game Obejcts
    // new gameObject("30px", "Consolas", "black", 280, 40, "text")

    // start
    setTimeout(() => {
        window.requestAnimationFrame(game.render)
    }, 1000)

})

function gameObject(width, height, color, x, y, type) {

    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.type = type
    this.score = 0
    this.color = color

    this.update = function () {
        ctx = game.context
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height
            ctx.fillStyle = color
            ctx.fillText(this.text, this.x, this.y)
        } else {
            ctx.fillStyle = color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    this.move = function (x, y) {
        this.x = x
        this.y = y
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
