const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {

        console.log(
            `Dashboard connected: ${socket.id}`
        );

        socket.on("disconnect", () => {

            console.log(
                `Dashboard disconnected: ${socket.id}`
            );

        });

    });

    return io;
};

const emitSecurityEvent = (event) => {

    if (!io) {
        return;
    }

    io.emit("security_event", event);
};

module.exports = {
    initializeSocket,
    emitSecurityEvent
};