Notes on testing:

Run client tests- cd to src/main/.../resources/static and run npm test. includes unit tests and integration tests. e2e is TODO
backend tests- run gradle test from root

Short todo:
- Randomize playerID
- Have piece placements send a ping to the server
- After 5 pings, server sends a message that the client catches then prints something

TODO:
- Port to React for ease of UI building
- Improved client flow (start game as client, ignore network when singleplayer, check network)
- Start screen allows you to choose singleplayer or multiplayer
- Check network to see if multiplayer is available
- Show a release date
- INitial roomID

- Complete networked multiplayer 
  - Win/loss conditions should be verified on server and sent to clients
  - Allow for rematches
  - Game should not start until both players are in a ready state


Improved Input handling
Set and Load configuration settings
Local multiplayer
Networked multiplayer
Graphics

Improve build system