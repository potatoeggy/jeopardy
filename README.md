# jeopardy!

A pretty version of Jeopardy made for Bayview's Computer Club.

Demo available at https://jeopardy.bayview.club.

The code is hackathon quality don't bother reviewing this.

The code in this repository is licensed under the AGPLv3 (or any later version) at LICENSE.md.

Current members of the Bayview Computer Club and current students in the York Region District School Board may choose to use this code under the AGPLv3-or-later OR the 0BSD.

## Installation

Clone the repository:

```sh
git clone https://github.com/potatoeggy/jeopardy.git
```

Build the frontend:

```sh
cd jeopardy/frontend
yarn install
yarn build
```

Serve the built files in `jeopardy/frontend/dist` using your favourite web server.

Build the backend:

```sh
cd jeopardy/backend
yarn install
yarn build
```

## Usage

Start the backend WebSocket server in `jeopardy/backend/build`:

```sh
node index.js
```

Similar to Kahoot, the host should visit $DOMAIN/host (e.g., for Bayview students, visit https://jeopardy.bayview.club/host)

All players (up to 4) should join at $DOMAIN (e.g., for Bayview students, visit https://jeopardy.bayview.club)

## Gameplay

Manually pressing "Ready" will allow all connected clients to press the buzzer for 20 s.

If a buzzer is pressed, the colour that pressed the buzzer will brighten, and the button will go into cooldown for 5 s.

Pressing the mute icon will enable lobby music.

Pressing "Toggle" will toggle between the scoreboard and tile board. This will disable lobby music.

Pressing the game title in the bottom right corner (defaults to "Computer Club") will switch game data and reset any progress in the game.

### Main loop

 - The current team (left to right, begins with Red) selects a tile.
 - The host left-clicks the tile, and the announcer has 7 s to read the question before the team has 20 s to respond by pressing the buzzer.
 - The host should know the answer in advance. If the team answered incorrectly, the host should allow other teams to steal by pressing "Ready". If the team does not press the buzzer in time, other teams will automatically have the opportunity to steal.
 - Right-click the question screen to toggle showing the answer. This will automatically mark the question as completed.
 - Left-click the question screen to return to the tile board. This will not change the question status, so it is useful if the wrong tile was pressed. You typically want to right-click to complete the question then left-click to exit.
 - Right-click a tile on the tile board to toggle whether it is completed.
 - Left- / right-click on a team colour to increase / decrease their score by 100.

### Final Jeopardy

Pressing "Final" will enter Final Jeopardy mode. Pressing "Final" again will undo the action. Pressing "Progress" will advance the step by 1.

1. Teams will be able to place bets on their screen and see the category of the question. Once they submit their bet, their coloured ball will light up.
2. The question appears. The announcer has 5 s to read the question before teams have 45 s to answer the question on their screen.
3. The first team's bet and answer appears. Press "Progress" again for each team for their bet and answer to appear.
4. The answer appears on the screen. The announcer should now award / deduct points as necessary.
5. The answer disappears.