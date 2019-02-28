const Puzzle = require('./Puzzle.js');
const fs = require('fs');

module.exports = 
class Sudoku {
    constructor() {
        this._puzzle = new Puzzle();
    }
    
    loadFile(filename, callback) {
        fs.readFile(filename, 'utf8', (err, contents) => {
            if (!err) {
                let lines = contents.split('\n');
                for (let iLine = 0; iLine < lines.length; iLine++) {
                    let line = lines[iLine];
                    if (line[0] != '#') {
                        let values = line.split(' ');   // row, col, value
                        if (values.length == 3) {
                            try {
                                let row = parseInt(values[0]);
                                let col = parseInt(values[1]);
                                let value = parseInt(values[2]);
                                if (1 <= row   && row   <= 9 &&
                                    1 <= col   && col   <= 9 &&
                                    1 <= value && value <= 9) {                                
                                    this._puzzle.addInitialValue(row - 1, col - 1, value);
                                }
                                else {
                                    throw "Invalid value";
                                }
                            } 
                            catch (err) {
                                throw `Invalid initial puzzle value in file "${filename}" on line #${iLine + 1}, "${line}". Should contain a row, column and value separated by a space. The row, column and value should be a number from 1 to 9`;
                            }
                        }
                        else if (values.length > 1) {
                            throw `Invalid initial puzzle value in file "${filename}" on line #${iLine + 1}, "${line}". Should contain a row, column and value separated by a space. The row, column and value should be a number from 1 to 9`;
                        }
                    }
                }
            }
            
            if (callback) {
                callback(err);
            }
        });
    }
    
    solve() {
        return this._puzzle.solve();
    }
    
    show() {
        this._puzzle.show();
    }

    show1() {
        this._puzzle.show1();
    }
}
