//UNDERSTAND WHAT ARE NAMESPACES PLEASE
import { createServer } from "http";
import { Server } from "socket.io";

import pkg from "pg";
const { Client } = pkg;


let client = new Client({
    user: "postgres", //default
    host: "localhost",
    database: "smart-region-board",
    password: "jarofcookies22",
    port: "5433"

});

//connect to database
const awaitConnection = new Promise((resolve, reject) => {
    client.connect((err) => {
        if (err) {
            reject("Connection failed: " + err.stack)
        } else {
            resolve()
        }
    });
    // resolve(client.connect());
    // reject("failed")
})
    .then(() => {
        console.log("connected to database");
        client.query("SELECT * FROM users", (err, res) => {
            if (err) {//returns an error if failed
                console.log(`QUERY ERROR: ${err}`)

            } else {
                // console.log(res["rows"]);

            }
        })
    })
    .catch((err) => console.log(err))


const httpServer = createServer((req, res) => {
    if (req.url === "/") {
        res.end("server is running")
    }
});

const io = new Server(httpServer, {
    cors: { //or use "*" for all 
        origin: "http://localhost:8081"
    }
});

io.on("connection", (socket) => {
    console.log(`${socket.id} joined.`);

    socket.on("connected", (message) => {
        console.log(message)
        socket.emit("confirmConnection", "Connected to server", socket.id)
    })

    //INSERT SQL (from client)
    socket.on("sendData", (username, session_id) => {
        console.log("received, making query...")
        client.query(`INSERT INTO users(user_id, session_id) VALUES ('${username}','${session_id}')`, (err, res) => {
            if (err) {
                console.log("QUERY ERROR: " + err);
            } else {
                console.log(res.command)
                socket.emit("database", username, session_id);
            }
        })
    })
});

httpServer.listen(3000, () => {
    console.log("server listening on port 3000...")
});