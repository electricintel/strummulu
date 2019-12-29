const port = process.env.PORT || 5000;
const io = require('socket.io')();
const { MESSAGES, EVENTS, CLIENT_ACTIONS } = require('./const');
const Server = require('./game/Server');

const server = new Server();

io.on(EVENTS.CONNECTION, c => {
    server.connected(c.id, c);


    c.once(EVENTS.DISCONNECTED, () => {
        server.disconnected(c.id)
    });

    c.on(CLIENT_ACTIONS.CREATE_ROOM, () => {
        server.createRoom(c);
    });

    c.on(CLIENT_ACTIONS.JOIN_ROOM, data => {
        const { roomId } = data;
        console.log(`[main]: ${roomId}`);
        server.joinRoom(roomId, c.id);
    });

});

io.listen(port);
console.log('socket.io listening on ', port);