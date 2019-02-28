const Sudoku = require('./Sudoku.js');

var puzzle = new Sudoku();
try {
    if (process.argv.length < 3) {
        console.log("Enter the name of the file containing the initial values for the Sudoku puzzle.");
    }
    else  {
        let fname = process.argv[2];
        puzzle.loadFile(fname, (err) => {
            if (!err) {
                console.log("Initial Sudoku puzzle");
                puzzle.show();
                console.log();
                console.log();
                
                let fSolved = puzzle.solve();
                if (fSolved) {            
                    console.log("Finished Sudoku puzzle");
                    puzzle.show();
                }
            }
            else {
                console.log("Errors occurred while loading the data file, perhaps the file doesn't exist: " + fname);
            }
        });
    }
}
catch (err) {
    console.log(err);
}
