//TODO JSDOM

import { GameBoard } from '../game/subBoards.js';
import jsdom from"jsdom";
const { JSDOM } = jsdom;
// const assert = require('assert');
import assert from 'node:assert';

describe('Bag system', function () {
  it('uninitialized, should assign a new bag of 7 unique pieces', function () {
    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    let board = new GameBoard({
      width: 9,
      height: 22,
      domDocument: dom.window.document
    })
    let testBag = new Set()
    for (let i = 0; i < 7; i++){
      let curShape = board.getUpcomingShape(i)
      testBag.add(curShape)
    }
    assert.equal(testBag.size, 7, `Bag should have 7 pieces, has ${testBag.size}`)
    assert.ok(testBag.has('L'), 'Bag is missing L');
    assert.ok(testBag.has('J'), 'Bag is missing J');
    assert.ok(testBag.has('S'), 'Bag is missing S');
    assert.ok(testBag.has('Z'), 'Bag is missing Z');
    assert.ok(testBag.has('T'), 'Bag is missing T');
    assert.ok(testBag.has('I'), 'Bag is missing I');
    assert.ok(testBag.has('O'), 'Bag is missing O');

  });

  it('should, after starting a game, have have its current piece assign to the first shape', function(){
    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    let board = new GameBoard({
      width: 9,
      height: 22,
      domDocument: dom.window.document
    })
    let firstShape = board.getUpcomingShape()
    board.startGame()

    assert.equal(board.activePiece.shape, firstShape, 'First shape was not gotten from bag')

  })

});

describe('Shadowpiece color', function () {
  it("should be different from the parent piece's color", function () {
    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    let board = new GameBoard({
      width: 9,
      height: 22,
      domDocument: dom.window.document
    })
    board.startGame()

    let activePiece = board.activePiece
    let shadowPiece = board.shadowPiece
    assert.notEqual(activePiece.color, shadowPiece.color, 'Piece colors are the same (should be different)')

  })
})