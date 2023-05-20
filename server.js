require('dotenv').config();
const express = require('express')
const webApp = express()
const webServer = require('http').createServer(webApp)
const io = require('socket.io')(webServer, {
    cors: {
        origin: process.env.LOCALHOST || 'https://brothersgames.online', 
        methods: ['GET', 'POST'],
        credentials: true
    }
})

const game = createGame()

io.on('connection', function (socket) {

    console.log('New connection: ', socket.id);

    const playerState = game.addPlayer(socket.id)
    socket.emit('bootstrap', game)

    socket.broadcast.emit('player-update', {
        socketId: socket.id,
        newState: playerState
    })
    
    socket.on('player-move', (direction) => {

        console.log('move to: ', direction)

        game.movePlayer(socket.id, direction)

        console.log('depois de mover: ', game.players[socket.id]);
        
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
        objects: {},
        step: 2,
        addPlayer: socketId => {
            return game.players[socketId] = {
                x: Math.floor(Math.random() * game.canvasWidth),
                y: Math.floor(Math.random() * game.canvasHeight),
                score: 0,
                socketId: socketId
            }
        },
        removePlayer: socketId => {
            delete game.players[socketId]
        },
        movePlayer: (socketId, direction) => {

            const player = game.players[socketId]
            
            console.log(player)

            if (direction === 'left' && player.x - game.step >= 0) {
                player.x = player.x - game.step
            }
    
            if (direction === 'up' && player.y - game.step >= 0) {
                player.y = player.y - game.step
            }
    
            if (direction === 'right' && player.x + game.step < game.canvasWidth) {
                player.x = player.x + game.step
            }
    
            if (direction === 'down' && player.y + game.step < game.canvasHeight) {
                player.y = player.y + game.step
            }
    
            return player

        }

    }

    return game

}
