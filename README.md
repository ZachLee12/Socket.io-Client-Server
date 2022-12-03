# socket.io-client-server
A WebSocket project using Socket.io that allows clients to send information to the server which will then store it in a PostgreSQL database. 

To connect run a client and a server:
1. Clone the repo or download and extract the .zip folder.

2. Navigate to `yourFolderDirectory/socket.io-client-server` in a terminal.

3. To run the server, navigate to `.../socket.io-client-server/server`, run `npm install` then `npm start`. The server will be listening on 
   `port 3000`.

4. To run the client, navigate to `.../socket.io-client-server/client`, run `npm install` then `npm start`. The client will be running on `port 8080` or `port 8081`. 

5. **Attention!** The client port defaults to `port 8080`, but due to my device configuration, `port 8080` is unavailable, therefore I have configured the server CORS ports to be `8081`. If needed, please change in `server.js` the `origin: "http://localhost:8081"` to `origin: "http://localhost:8080"`.
   
6. A client will open up in a browser window. Upon successful connection to the server, a `Connected to server` message will be displayed and the `Client ID`.
