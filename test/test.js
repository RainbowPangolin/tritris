//TODO JSDOM

import { GameBoard } from '../game/subBoards.js';
import jsdom from"jsdom";
const { JSDOM } = jsdom;
// const assert = require('assert');
import assert from 'node:assert';

describe('Bag system', function () {
  it('should, by default, give each of the 7 pieces in a random order per bag', function () {
    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    let board = new GameBoard({
      width: 9,
      height: 22,
      domDocument: dom.window.document
    })
    board.startGame()
    // console.log(board)
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