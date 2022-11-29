
import pkg from "pg";
const { Client } = pkg;

let client = new Client({
    user: "postgres", //default
    host: "localhost",
    database: "smart-region-board",
    password: "jarofcookies22",
    port: "5433"

});

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

awaitConnection.then(() => {
    console.log("connected to database");
    client.query("SELECT * FROM users", (err, res) => {
        if (err) {//returns an error if failed
            console.log(`QUERY ERROR: ${err}`)
            client.end() 
        } else {
            console.log(res);
            client.end();
        }
    })
})

