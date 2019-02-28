const Square = require('./Square.js');

const NUM_SQUARE_ROWS = 3;
const NUM_SQUARE_COLS = 3;
const NUM_CELL_ROWS = 9;
const NUM_CELL_COLS = 9;

module.exports =
class Puzzle {
    
    constructor() {
        this._squares = [ 
            [ new Square(), new Square(), new Square() ],
            [ new Square(), new Square(), new Square() ], 
            [ new Square(), new Square(), new Square() ]
        ];
    }
    
    addInitialValue(row, col, value) {
        let cell = this._cell(row, col); 
        cell.value = value;
        cell.initalValue = true;
    }
    
    _square(row, col) {
        return this._squares[Math.floor(row / NUM_SQUARE_ROWS)][Math.floor(col / NUM_SQUARE_COLS)];
    }
    
    _cell(row, col) {
        return this._square(row, col).cell(row % NUM_SQUARE_ROWS, col % NUM_SQUARE_COLS);
    }
    
    solve() {
        let fSolved = false;
        
        // determine the beginning state of the potential values
        this.setInitialPotentialValues();
            
        // check cells only have one potential value, set the cell's value, and continue until no more are found
        let fValueFound = true
        while (fValueFound) {
            fValueFound = false
            // for each cell in the puzzle
            for (let iRow = 0; iRow < NUM_CELL_ROWS; iRow++) {
                for (let iCol = 0; iCol < NUM_CELL_COLS; iCol++) {
                    let cell = this._cell(iRow, iCol);
                    let fCellValueFound = cell.foundSingleValue();
                    
                    if (fCellValueFound) {
                        fValueFound = true;
                        
                        // remove value from the cells' potential values in the square
                        this.clearPotentialValues(iRow, iCol, cell.value);
                    }
                }
            }
        }
        
        if (this._isSolved()) {
            fSolved = true;
        }
        else {
            throw "Unsolvable puzzle - more than one solution";
        }
        
        return fSolved;
    }
    
    // set the potential values for all of the cells in the puzzle
    setInitialPotentialValues() {
        // for each cell in the puzzle
        for (let iRow = 0; iRow < NUM_CELL_ROWS; iRow++) {
            for (let iCol = 0; iCol < NUM_CELL_COLS; iCol++) {
                let cell = this._cell(iRow, iCol);
                
                // set the potential value flags to true
                cell.setAllPotentialValues();
                
                // clear the flags for the final values found in the the cell's square
                let square = this._square(iRow, iCol);
                for (let iSquareRow = 0; iSquareRow < NUM_SQUARE_ROWS; iSquareRow++) {
                    for (let iSquareCol = 0; iSquareCol < NUM_SQUARE_COLS; iSquareCol++) {
                        let checkCell = square.cell(iSquareRow, iSquareCol);
                        cell.clearPotentialValue(checkCell.value);
                    }
                }
                
                // clear the flags for the final values found in the the cell's row
                for (let iCheckCol = 0; iCheckCol < NUM_CELL_COLS; iCheckCol++) {
                    let checkCell = this._cell(iRow, iCheckCol);
                    cell.clearPotentialValue(checkCell.value);
                }

                // clear the flags for the final values found in the the cell's column
                for (let iCheckRow = 0; iCheckRow < NUM_CELL_COLS; iCheckRow++) {
                    let checkCell = this._cell(iCheckRow, iCol);
                    cell.clearPotentialValue(checkCell.value);
                }
            }
        }
    }
    
    // remove value from the cells' potential values in the square, row and column
    clearPotentialValues(row, col, value) {
        // remove value from the cells' potential values in the square
        let square = this._square(row, col);
        for (let iSquareRow = 0; iSquareRow < NUM_SQUARE_ROWS; iSquareRow++) {
            for (let iSquareCol = 0; iSquareCol < NUM_SQUARE_COLS; iSquareCol++) {
                let cell = square.cell(iSquareRow, iSquareCol);
                cell.clearPotentialValue(value);
            }
        }
        
        // remove value from the cells' potential values in the row
        for (let iCheckCol = 0; iCheckCol < NUM_CELL_COLS; iCheckCol++) {
            let cell = this._cell(row, iCheckCol);
            cell.clearPotentialValue(value);
        }

        // remove value from the cells' potential values in the column
        for (let iCheckRow = 0; iCheckRow < NUM_CELL_COLS; iCheckRow++) {
            let cell = this._cell(iCheckRow, col);
            cell.clearPotentialValue(value);
        }
    }
    
    _isSolved() {
        let fSolved = true;
        for (let iRow = 0; fSolved && iRow < NUM_CELL_ROWS; iRow++) {
            for (let iCol = 0; fSolved && iCol < NUM_CELL_COLS; iCol++) {
                if (this._cell(iRow, iCol).value == 0) {
                    fSolved = false;
                }
            }
        }

        return fSolved
    }
    
    show1() {
        for (let iRow = 0; iRow < NUM_CELL_ROWS; iRow++) {
            let rowValues = "";
            for (let iCol = 0; iCol < NUM_CELL_COLS; iCol++) {
                if (iCol % NUM_SQUARE_COLS == 0) {
                    rowValues += ". ";
                }
                let cell = this._cell(iRow, iCol);
                rowValues += (cell.value ? cell.value : " ") + " ";
            }
            if (iRow % NUM_SQUARE_ROWS == 0) {
                console.log(". . . . . . . . . . . . .");
            }
            console.log(rowValues + ".");
        }
        console.log(". . . . . . . . . . . . .");
    }
    
    show() {
        for (let iRow = 0; iRow < NUM_CELL_ROWS; iRow++) {
            let rowValues = "";
            for (let iCol = 0; iCol < NUM_CELL_COLS; iCol++) {
                if (iCol % NUM_SQUARE_COLS == 0) {
                    rowValues += " ";
                }
                let cell = this._cell(iRow, iCol);
                rowValues += cell.value + " ";
            }
            if (iRow > 0 && iRow % NUM_SQUARE_ROWS == 0) {
                console.log();
            }
            console.log(rowValues);
        }
    }
}
