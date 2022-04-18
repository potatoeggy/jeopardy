import { WebSocketServer } from "ws";
import { Game, User } from "./state";

const MAX_PLAYERS = 4;

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
    } else {
      return socket.send(
        JSON.stringify({
          action: "error",
          error: "NoHostAvailable",
        })
      );
    }
  } else if (req.url?.endsWith("/host")) {
    if (game?.hostAlive) {
      return socket.send(
        JSON.stringify({
          action: "error",
          error: "HostAlreadyTaken",
        })
      );
    } else {
      game = new Game(new User(socket));
    }
  }
});
console.log("WebSocket server started");
console.log("Probably at ws://localhost:8080/ for dev");
