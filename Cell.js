const NUM_POTENTIAL_VALUES = 9;

module.exports =
class Cell {
    constructor() {
        this._value = 0;
        this._fInitalValue = false;
        this._potentialValues = [ 
            false, false, false, 
            false, false, false, 
            false, false, false 
        ];
    }
    
    get value() {
        return this._value;
    }
    
    set value(value) {        
        this._value = value;
    }
    
    get initialValue() {
        return this._fInitalValue;
    }
    
    set initialValue(value) {
        this._fInitalValue = value;
    }

    clearPotentialValue(value) {
        if (1 <= value && value <= NUM_POTENTIAL_VALUES) {
            this._potentialValues[value - 1] = false;
        }
    }    
    
    clearAllPotentialValues() {
        this._setPotentialValues(false);
    }
        
    setAllPotentialValues() {
        this._setPotentialValues(true);
    }
        
    _setPotentialValues(value) {
        for (let i = 0; i < NUM_POTENTIAL_VALUES; i++) {
            this._potentialValues[i] = value;
        }
    }
    
    clearPotentialValues() {
        for (let i = 0; i < NUM_POTENTIAL_VALUES; i++) {
            this._potentialValues[i] = false;
        }
    }
        
    // check the cell's potential values, if only one, set the value, clear potential values
    // returns boolean
    foundSingleValue() {
        let fFound = false;
        
        // if a value has not been found yet
        if (this._value == 0)
        {
            // check potential values
            let value = 0;
            for (let i = 0; i < NUM_POTENTIAL_VALUES; i++) {
                // if this is a potential value
                if (this._potentialValues[i]) {
                    // if one has not been found yet
                    if (!fFound) {
                        value = i + 1;
                        fFound = true;
                    }
                    else { // one has already been found
                        fFound = false;
                        break;
                    }
                }
            }
            
            // if one found
            if (fFound) {
                // set the value
                this.value = value;
                
                // clear potential values
                this.clearAllPotentialValues();
            }
        }
    
        return fFound;
    }

        
    isSolved() {
        /*
        fValueFound = false
        if there is only 1 potential value
            set the value to the potential value
            clear the potential values
            for each cell in the cell's square
                fValueFound |= clearPotentialValue(value)
            for each cell in the cell's row
                fValueFound |= clearPotentialValue(value)
            for each cell in the cell's column
                fValueFound |= clearPotentialValue(value)
        return fValueFound
        */
    }
    
}