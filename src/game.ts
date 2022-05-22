type GameArray = [
    [number, number, number, number, number],
    [number, number, number, number, number],
    [number, number, number, number, number],
    [number, number, number, number, number],
    [number, number, number, number, number]
]

const controls = {
    up: function (GameArray: GameArray): GameArray {
        for (let i = 0; i != GameArray.length; i++) {
            for (let j = 0; j != GameArray[i].length; j++) {
                if (i === 0) continue;
                if (GameArray[i][j] === 0) continue;
                if (GameArray[i - 1][j] === 0) {
                    GameArray[i - 1][j] = GameArray[i][j]
                    GameArray[i][j] = 0
                    continue;
                }
                if (GameArray[i - 1][j] === GameArray[i][j]) {
                    GameArray[i - 1][j]++
                    GameArray[i][j] = 0
                    continue;
                }
            }
        }
        return GameArray;
    },

    down: function (GameArray: GameArray): GameArray {
        for (let i = 4; i != -1; i--) {
            for (let j = 4; j != -1; j--) {
                if (i === 4) continue;
                if (GameArray[i][j] === 0) continue;

                if (GameArray[i + 1][j] === 0) {
                    GameArray[i + 1][j] = GameArray[i][j]
                    GameArray[i][j] = 0
                    continue;
                }
                if (GameArray[i + 1][j] === GameArray[i][j]) {
                    GameArray[i + 1][j]++
                    GameArray[i][j] = 0
                    continue;
                }
            }
        }
        return GameArray;
    },

    left: function (GameArray: GameArray): GameArray {
        for (let i = 0; i != GameArray.length; i++) {
            for (let j = 0; j != GameArray.length; j++) {
                if (j === 0) continue;
                if (GameArray[i][j] === 0) continue

                if (GameArray[i][j - 1] === 0) {
                    GameArray[i][j - 1] = GameArray[i][j]
                    GameArray[i][j] = 0
                    continue;
                }
                if (GameArray[i][j - 1] === GameArray[i][j]) {
                    GameArray[i][j - 1]++
                    GameArray[i][j] = 0
                    continue;
                }

            }
        }
        return GameArray
    },

    right: function (GameArray: GameArray): GameArray {
        for (let i = 0; i != GameArray.length; i++) {
            for (let j = 4; j != -1; j--) {
                if (j === 4) continue;
                if (GameArray[i][j] === 0) continue
                if (GameArray[i][j + 1] === 0) {
                    GameArray[i][j + 1] = GameArray[i][j]
                    GameArray[i][j] = 0
                    continue;
                }
                if (GameArray[i][j + 1] === GameArray[i][j]) {
                    GameArray[i][j + 1]++
                    GameArray[i][j] = 0
                    continue;
                }
            }
        }
        return GameArray
    }



}

function getNewGameArray(): GameArray {
    const x = Math.floor(Math.random() * 5)
    const y = Math.floor(Math.random() * 5)
    const array: GameArray = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]
    array[x][y] = 1
    return array;
}

function insertNewBlockAtRandomPos(GameArray: GameArray): GameArray {
    let done = false
    while (!done) {
        const x = Math.floor(Math.random() * 5)
        const y = Math.floor(Math.random() * 5)
        console.log
        if (GameArray[x][y] > 0) {
            continue;
        } else {
            GameArray[x][y] = 1
            done = true
        }
    }
    return GameArray

}

function CheckIfWin(GameArray: GameArray): boolean {
    let result = false
    for (let i = 0; i != GameArray.length; i++) {
        if (GameArray[i].includes(7)) result = true
    }
    return result;
}

function checkIfLost(GameArray: GameArray): boolean {
    let result = true
    for (let i = 0; i != GameArray.length; i++) {
        if (GameArray[i].includes(0)) result = false;
    }
    return result;
}


export { CheckIfWin, insertNewBlockAtRandomPos, getNewGameArray, checkIfLost, controls, GameArray }
