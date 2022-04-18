import type { Action, ErrorAction } from "./types";
import { MessageEvent, WebSocket } from "ws";
import crypto from "crypto";

export class User {
  id: string;
  socket: WebSocket;

  #name: string = "Unnamed";

  constructor(socket: WebSocket, name?: string) {
    this.socket = socket;
    this.id = crypto.randomUUID();
  }

  get name() {
    return this.#name;
  }

  set name(name: string) {
    this.#name = name;
  }

  send(event: Action) {
    this.socket.send(JSON.stringify(event));
  }

  error(msg: string) {
    const errorEvent: ErrorAction = { action: "error", error: msg };
    this.send(errorEvent);
  }
}

export class Game {
  host: User;
  #players: User[] = [];
  hostAlive = false;

  /*
   * It is expected that any function creating a Game is
   * responsible for detecting and destroying it once the
   * host leaves.
   */
  constructor(host: User) {
    this.host = host;
    this.host.socket.on("message", (msg) => {
      try {
        const data: Action = JSON.parse(msg.toString());
        switch (data.action) {
          case "ready":
            for (const u of this.#players) {
              u.send(data);
            }
          case undefined:
          case null:
            return this.host.error("MissingAction");
          default:
            return this.host.error("InvalidAction");
        }
      } catch (SyntaxError) {
        return this.host.error("MalformedJSON");
      }
    });

    // kill everything if the host leaves
    this.host.socket.on("close", () => {
      for (const u of this.#players) {
        u.socket.close();
      }
      this.hostAlive = false;
    });
    this.hostAlive = true;
  }

  fireUserEvent() {
    this.host.send({
      action: "user",
      userIds: this.#players.map((u) => u.id),
    });
  }

  addPlayer(user: User) {
    this.#players.push(user);
    user.socket.addEventListener("message", (msg) => {
      try {
        const data: Action = JSON.parse(msg.toString());
        switch (data.action) {
          case "setname":
            if (data.name) {
              this.host.send(data);
            }
          case "pressed":
            this.host.send(data);
          case undefined:
          case null:
            return this.host.error("MissingAction");
          default:
            return this.host.error("InvalidAction");
        }
      } catch (SyntaxError) {
        return this.host.error("MalformedJSON");
      }
    });

    user.socket.addEventListener("close", () => {
      this.#players = this.#players.filter((s) => s.id !== user.id);
      this.fireUserEvent();
    });

    this.fireUserEvent();
  }
}
