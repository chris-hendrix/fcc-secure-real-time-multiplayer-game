# [Secure Real Time Multiplayer Game](https://www.freecodecamp.org/learn/information-security/information-security-projects/secure-real-time-multiplayer-game)

# [Live app](https://fcc-secure-real-time-multiplayer-game.chrishendrix.repl.co/)

**Secure Real Time Multiplayer Game**

Develop a 2D real time multiplayer game using the HTML Canvas API and [Socket.io](https://socket.io/) that is functionally similar to this: <https://secure-real-time-multiplayer-game.freecodecamp.rocks/>. Working on this project will involve you writing your code using one of the following methods:

-   Clone [this GitHub repo](https://github.com/freeCodeCamp/boilerplate-project-secure-real-time-multiplayer-game/) and complete your project locally.
-   Use [our repl.it starter project](https://repl.it/github/freeCodeCamp/boilerplate-project-secure-real-time-multiplayer-game) to complete your project.
-   Use a site builder of your choice to complete the project. Be sure to incorporate all the files from our GitHub repo.

When you are done, make sure a working demo of your project is hosted somewhere public. Then submit the URL to it in the `Solution Link` field. Optionally, also submit a link to your project's source code in the `GitHub Link` field.

* * * * *

**Note**: `helmet@^3.21.3` is needed for the user stories. This means you will need to use the previous version of Helmet's docs, for information on how to achieve the user stories.

* * * * *
**User Stories**

1.   You can provide your own project, not the example URL.

1.   Multiple players can connect to a server and play.

1.   Each player has an avatar.

1.   Each player is represented by an object created by the `Player` class in `Player.mjs`.

1.    At a minimum, each player object should contain a unique `id`, a `score`, and `x` and `y` coordinates representing the player's current position.

1.   The game has at least one type of collectible item. Complete the `Collectible` class in `Collectible.mjs` to implement this.

1.    At a minimum, each collectible item object created by the `Collectible` class should contain a unique `id`, a `value`, and `x` and `y` coordinates representing the item's current position.

1.   Players can use the WASD and/or arrow keys to move their avatar. Complete the `movePlayer` method in `Player.mjs` to implement this.

1.   The `movePlayer` method should accept two arguments: a string of "up", "down", "left", or "right", and a number for the amount of pixels the player's position should change. `movePlayer` should adjust the `x` and `y` coordinates of the player object it's called from.

1.   The player's score should be used to calculate their rank among the other players. Complete the `calculateRank` method in the `Player` class to implement this.

1.   The `calculateRank` method should accept an array of objects representing all connected players and return the string `Rank: currentRanking/totalPlayers`. For example, in a game with two players, if Player A has a score of 3 and Player B has a score of 5, `calculateRank` for Player A should return `Rank: 2/2`.

1.   Players can collide with a collectible item. Complete the `collision` method in `Player.mjs` to implement this.

1.   The `collision` method should accept a collectible item's object as an argument. If the player's avatar intersects with the item, the `collision` method should return `true`.

1.   All players are kept in sync.

1.   Players can disconnect from the game at any time.

1.   Prevent the client from trying to guess / sniff the MIME type.

1.   Prevent cross-site scripting (XSS) attacks.

1.   Nothing from the website is cached in the client.

1.   The headers say that the site is powered by "PHP 7.4.3" even though it isn't (as a security measure).
