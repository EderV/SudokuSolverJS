let puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// solution
//     [[5,3,4,6,7,8,9,1,2],
//     [6,7,2,1,9,5,3,4,8],
//     [1,9,8,3,4,2,5,6,7],
//     [8,5,9,7,6,1,4,2,3],
//     [4,2,6,8,5,3,7,9,1],
//     [7,1,3,9,2,4,8,5,6],
//     [9,6,1,5,3,7,2,8,4],
//     [2,8,7,4,1,9,6,3,5],
//     [3,4,5,2,8,6,1,7,9]]

console.time("SudokuSolver");

let xPointer = 0
let yPointer = 0

let editableCell = []

console.log('Sudoku solver started!')

if (puzzle[yPointer][xPointer] === 0) {
    editableCell.push(true)
}
else {
    editableCell.push(false)
    stepFw()
}

let times = 0

while (yPointer !== -1) {
    let num = puzzle[yPointer][xPointer]

    console.log('(' + xPointer + ', ' + yPointer + ') = ' + num)

    num++
    do {
        if (validateNumber(xPointer, yPointer, num)) break
        num++
    } while(num < 10)

    if (num >= 10) {
        stepBw()
    }
    else {
        puzzle[yPointer][xPointer] = num
        stepFw()
    }

    times++

}

console.log('Res: ')
console.log(puzzle)
console.log(editableCell)
console.log('Times: ' + times)

console.timeEnd('SudokuSolver');

function stepFw() {
    let editableFound = false
    do {
        xPointer++
        if (xPointer > 8) {
            yPointer++
            xPointer = 0
        }

        if (yPointer > 8) {
            yPointer = -1
            break
        }

        if (puzzle[yPointer][xPointer] === 0) {
            editableCell.push(true)
            editableFound = true
        }
        else {
            editableCell.push(false)
        }
    } while (!editableFound)
}

function stepBw() {
    let editableFound = false
    do {
        if (editableCell[editableCell.length - 1]) {
            puzzle[yPointer][xPointer] = 0
        }
        editableCell.pop()

        xPointer--
        if (xPointer < 0) {
            yPointer--
            xPointer = 8
        }

        if (editableCell[editableCell.length - 1]) {
            editableFound = true
        }
    } while (!editableFound)
}

function validateNumber(xPos, yPos, num) {
    // Check row
    for (let i = 0; i < 9; i++) {
        if (puzzle[yPos][i] === num) return false
    }

    // Check column
    for (let i = 0; i < 9; i++) {
        if (puzzle[i][xPos] === num) return false
    }

    // Check square
    const squareRowStart = Math.floor(yPos / 3) * 3;
    const squareColStart = Math.floor(xPos / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (puzzle[squareRowStart + i][squareColStart + j] === num) return false
        }
    }

    return true
}








