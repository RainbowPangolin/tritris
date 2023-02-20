//TODO JSDOM

import { GameBoard } from '../game/subBoards.js';
import jsdom from"jsdom";
const { JSDOM } = jsdom;
// const assert = require('assert');
import assert from 'node:assert';

describe('Debug Bag System', function () {
  const testBag = ['T','L', 'J','S','I','Z','O']
  const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    let board = new GameBoard({
      width: 9,
      height: 22,
      domDocument: dom.window.document,
      bagSystem: testBag
    })

  // board.startGame()

  it("should allow me to specify an arbitrarily sized bag of any valid shapes", function () {
    for (let i = 0; i < 7; i++){
      let curShape = board.getUpcomingShape(i)
      assert.equal(curShape, testBag[i], 'Actual bag incongruent with test bag!')
    }
  })
})

describe('7-Bag system', function () {
  let board
  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    board = new GameBoard({
      width: 9,
      height: 22,
      domDocument: dom.window.document,
      bagSystem: '7-bag'
    })
  })

  it('uninitialized, should assign a new bag of 7 unique pieces', function () {   

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
    let firstShape = board.getUpcomingShape() 
    board.startGame() //now 6 pieces in queue
  
    assert.equal(board.shapeQueue.length, 6, 'First piece not dequeued on game start')
    assert.equal(board.activePiece.shape, firstShape, `First shape was not gotten from bag. Current queue: ${board.shapeQueue}`)
  })


  it('should, after enough pieces have been used, add another bag to the queue', function () {
    board.startGame() //now 6 pieces in queue
    board.placePiece() //now 5 pieces in queue
    board.placePiece() //now 4 + 7 = 11 pieces in queue
    assert.equal(board.shapeQueue.length, 11, 'New bag was not added correctly')
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

//TODO test kicks and implement 180 kicks (super tedious)
describe('Kick table', function () {
  it("should allow pieces to kick without throwing errors", function () {
    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    let board = new GameBoard({
      width: 9,
      height: 22,
      domDocument: dom.window.document
    })
    board.startGame()

    assert.ok(true)
  })
})

describe('Hold piece function', function () {
  let board
  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    board = new GameBoard({
      width: 9,
      height: 22,
      domDocument: dom.window.document,
      bagSystem: ['T','L', 'J','S','I','Z','O']
    })
    board.startGame()
    board.swapHeldAndActivePieces()
  })

  it("should allow you to hold an arbitrary piece", function () {
    assert.equal(board.heldPiece.shape, 'T')
  })

  it("should dequeue the next piece", function () {
    assert.equal(board.activePiece.shape, 'L')
  })

  it("should allow you to swap back to the piece", function () {
    board.swapHeldAndActivePieces()
    assert.equal(board.activePiece.shape, 'T')
    assert.equal(board.heldPiece.shape, 'L')
  })
})