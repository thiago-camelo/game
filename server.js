const express = require('express')
const webApp = express()
const webServer = require('http').createServer(webApp)
const io = require('socket.io')(webServer)

const game = createGame()

io.on('connection', function (socket) {

    const playerState = game.addPlayer(socket.id)
    socket.emit('bootstrap', game)

    socket.broadcast.emit('player-update', {
        socketId: socket.id,
        newState: playerState
    })

    socket.on('player-move', (direction) => {

        game.movePlayer(socket.id, direction)

        socket.broadcast.emit('player-update', {
            socketId: socket.id,
            newState: game.players[socket.id]
        })

    })

    socket.on('disconnect', () => {
        game.removePlayer(socket.id)
        socket.broadcast.emit('player-remove', socket.id)
    })

})

webServer.listen(3000, function () {
    console.log('> Server listening on port:', 3000)
});

function createGame() {

    const game = {
        canvasWidth: 800,
        canvasHeight: 500,
        players: {},
        fruits: {},
        addPlayer: socketId => {
            return game.players[socketId] = {
                x: Math.floor(Math.random() * game.canvasWidth),
                y: Math.floor(Math.random() * game.canvasHeight),
                score: 0
            }
        },
        removePlayer: socketId => {
            delete game.players[socketId]
        },
        movePlayer: (socketId, direction) => {
            
            const player = this.players[socketId]

            if (direction === 'left' && player.x - 2 >= 0) {
                player.x = player.x - 2
            }
    
            if (direction === 'up' && player.y - 2 >= 0) {
                player.y = player.y - 2
            }
    
            if (direction === 'right' && player.x + 2 < game.canvasWidth) {
                player.x = player.x + 2
            }
    
            if (direction === 'down' && player.y + 2 < game.canvasHeight) {
                player.y = player.y + 2
            }
    
            return player

        }

    }

    return game

}
