# 4wide Multiplayer Block Stacking

## Overview 

This is a Multiplayer Tetris Clone based on a 4 wide grid, rather than a traditional 10 wide grid. I was inspired to make this by [Tetr.io's 4 wide mode](youtube.com/watch?v=5IbvrTA2hJg), since currently normal users are not able to make 4 wide based multiplayer lobbies. This was built from the ground up to be a fast, responsive, and fun Modern Tetris clone.

The latest deployment can be found at https://tritris-4btnjlmuaq-uc.a.run.app/

## Features
- **Modern Tetris features.** Hard drop, improved DAS, hold pieces, and bags. Everything you expect from a Modern Tetris based game.
- **Responsive input.** Extra care was taken to ensure that dropped inputs, lag, and misinputs are minimized despite being a browser game. Additional settings for DAS, keybinds, and drop speed are planned.
- **Advanced kick tables.** [Tetr.io](https://tetr.io/) revolutionized competitive Tetris with its advanced kick tables, allowing for unique T-Spin based set ups. Our kick tables are based on Tetr.io's standard SRS+ kick table. Additional tables are planned.
- **(In Progress) Networked Multiplayer.** Half the reason I wanted to make this was to be able to play 4-wide online, competitively, with friends. Currently, basic instanced synchronization is possible in the game, but I need to rewrite it to take advantage of a microservices architecture. As a result, multiplayer is currently disabled. 
- **(In Progress) Custom Game Settings.** When you host a multiplayer or single player game, you will be able to change the settings, like board size, gravity, kick tables, scoring system, etc. 

## Misc

[Report Issues](https://github.com/RainbowPangolin/tritris/issues)

[Feedback](mailto:kktsou@ucsd.edu)

[For Devs](/wiki/DevNotes.md)