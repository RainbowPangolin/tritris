# Notes for devs

## Building
Ensure you go to app\src\main\resources\static\node_modules and run `npm install`
At the top level, `gradle bootRun` should start the Spring server, and going to `localhost:8080` should serve the app. 

## Deployment
Details not shared.

## Todo list for (the) dev

### Network features
- Complete networked multiplayer 
  - Win/loss conditions should be verified on server and sent to clients
  - Allow for rematches
  - Game should not start until both players are in a ready state

### Client features
- Apply configuration settings to localstorage
- Enable editing of controls and handling settings
- Add network checking feature?

### Infrastructure
- Add version number udpater script

### Misc
- Improve wiki (???)