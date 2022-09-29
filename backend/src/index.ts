import { WebSocketServer } from "ws";
import { Game, User } from "./state";

const MAX_PLAYERS = 6;

let game: Game;

const server = new WebSocketServer({ port: 8080 });

server.on("connection", (socket, req) => {
  if (req.url?.endsWith("/join")) {
    if (game?.hostAlive) {
      if (game.players.length >= MAX_PLAYERS) {
        socket.send(
          JSON.stringify({
            action: "error",
            error: "TooManyPlayers",
          })
        );
        socket.close();
        return;
      }
      game.addPlayer(new User(socket));
      console.log("New player joined");
    } else {
      console.log("ERROR joining guild: NoHostAvailable");
      socket.send(
        JSON.stringify({
          action: "error",
          error: "NoHostAvailable",
        })
      );
      return socket.close();
    }
  } else if (req.url?.endsWith("/host")) {
    if (game?.hostAlive) {
      console.log("ERROR creating guild: HostAlreadyTaken");
      socket.send(
        JSON.stringify({
          action: "error",
          error: "HostAlreadyTaken",
        })
      );
      return socket.close();
    } else {
      game = new Game(new User(socket));
      console.log("New game created!");
    }
  }
});
console.log("WebSocket server started");
console.log("Probably at ws://localhost:8080/ for dev");
