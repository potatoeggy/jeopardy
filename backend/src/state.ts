import {
  Action,
  CanvasEvent,
  Event,
  NewRoundEvent,
  User,
  UserEvent,
  VictoryEvent,
} from "./types";
import { WIN_CONFIDENCE_THRESHOLD, SYNC_INTERVAL_MS } from "./data/defaults";
import getLabels from "./recogniser";

export class Guild {
  users: User[] = [];
  rounds = 0;
  alive = true;
  id: string;
  game: GameManager;

  interval: NodeJS.Timer;

  constructor(id: string, rounds: number) {
    this.rounds = rounds;
    this.id = id;
    this.game = new GameManager(rounds);

    this.interval = setInterval(() => {
      const winners = this.game.reviewImages(this.users);
      if (winners.length > 0) {
        this.fireEventAll(
          this.generateVictoryEvent(
            winners[(winners.length * Math.random()) | 0]
          )
        );
        this.game.gamePlaying = false;
      }
    }, SYNC_INTERVAL_MS);
  }

  addUser(user: User) {
    this.users.push(user);
    console.log(`User joined, now ${this.users.length}`);

    this.configureUser(user);
    this.fireEventAll(this.generateUserEvent());
  }

  configureUser(user: User) {
    // on receive
    user.socket.on("message", (msg) => {
      console.log(msg);
      try {
        const data: Action = JSON.parse(msg.toString());
        switch (data.action) {
          case "set_profile":
            if (!data.name) {
              return user.error("MissingName");
            }
            user.name = data.name;
            this.fireEventAll(this.generateUserEvent());
            return;
          case "draw":
            if (!data.image) {
              return user.error("MissingImage");
            }
            this.game.setImage(user, data.image);
            if (this.game.sinceLastSync >= 5) {
              this.fireEventAll(this.generateCanvasEvent());
            }
            return;
          case "finished":
            this.game.markFinished(user);
            if (this.users.every((u) => this.game.userFinished[u.id])) {
              // if everyone is done go next round
              if (this.game.startNextRound()) {
                this.fireEventAll(
                  this.generateNewRoundEvent(this.game.activeWord)
                );
              }
            }
            return;
          case "begin":
            if (user.isHost) {
              this.game.beginRound();
              this.fireEventAll(
                this.generateNewRoundEvent(this.game.activeWord)
              );
            } else {
              user.error("HostOnlyCommand");
            }
            return;
          case undefined:
          case null:
            return user.error("MissingAction");
        }
      } catch (SyntaxError) {
        return user.error("MalformedJSON");
      }
    });

    // for quitting
    user.socket.on("close", () => {
      this.users = this.users.filter((s) => s.id !== user.id);
      console.log(`User left, now ${this.users.length}`);

      if (user.isHost) {
        if (this.users.length !== 0) {
          this.users[0].isHost = true;
        }

        console.log("Host left, finding new host");
      }

      this.fireEventAll(this.generateUserEvent());

      if (this.users.length === 0) {
        this.alive = false;
        console.log(`All members left, shutting down guild ${this.id}`);
      }
    });
  }

  fireEventAll(event: Event) {
    console.log("Fired event to all users: ", event);
    for (const u of this.users) {
      u.send(event);
    }
  }

  generateUserEvent(): UserEvent {
    return {
      event: "user_update",
      guild_id: this.id,
      users: this.users.map((e) => {
        return { id: e.id, name: e.name, isHost: e.isHost };
      }),
    };
  }

  generateNewRoundEvent(word: string): NewRoundEvent {
    return {
      event: "new_round",
      total_rounds: this.rounds,
      word: word,
    };
  }

  generateCanvasEvent(): CanvasEvent {
    const event: CanvasEvent = {
      event: "draw",
      images: this.users.map((u) => {
        return {
          user_id: u.id,
          content: this.game.images[u.id] ?? "",
          confidence: this.game.confidences[u.id] ?? 0,
        };
      }),
    };
    return event;
  }

  generateVictoryEvent(user: User): VictoryEvent {
    const event: VictoryEvent = {
      event: "victory",
      victor_user_id: user.id,
    };
    return event;
  }
}
