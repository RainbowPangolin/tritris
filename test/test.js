//TODO JSDOM

import { GameBoard } from '../game/subBoards.js';
// const assert = require('assert');
import assert from 'node:assert';

describe('Bag system', function () {
  it('should, by default, give each of the 7 pieces in a random order per bag', function () {
    let board = new GameBoard()
    let bag = new Set()
    bag.add(board.curPiece)
    for (let i = 0; i < 6; i++){
      let lastPiece = board.curPiece
      board.nextPiece(lastPiece)
      bag.add(board.curPiece)
    }
    assert.ok(bag.has('L'), 'Has L');
    assert.ok(bag.has('T'), 'Has T');
  });

});