const Cell = require('./Cell.js');

module.exports =
class Square {
    constructor() {
        this._cells = [ 
            [ new Cell(), new Cell(), new Cell() ], 
            [ new Cell(), new Cell(), new Cell() ], 
            [ new Cell(), new Cell(), new Cell() ]
        ];
    }
        
    cell(row, col) {
        return this._cells[row][col];
    }
}