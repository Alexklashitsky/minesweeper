function createBoard(size) {

    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: false
            }


        }
    }
    console.log(board[2][2]);

    // placeRandomMins(board, gLevel.MINES)


    return board;
}

// function printMat(mat, selector) {
//     var strHTML = '<table border="1"><tbody>';
//     for (var i = 0; i < mat.length; i++) {
//         strHTML += '<tr>';

//         for (var j = 0; j < mat[0].length; j++) {
//             var cell = mat[i][j];
//             var className = 'cell cell' + i + '-' + j;
//             if (mat[i][j].isMine) {
//                 strHTML += '<td class="' + 'isMine' + '">  </td>'
//             } else
//                 strHTML += '<td class="' + className + '">  </td>'

//         }
//         strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>';
//     console.log('strHTML:', strHTML);

//     var elContainer = document.querySelector(selector);
//     elContainer.innerHTML = strHTML;
// }



function copyMat(mat) {
    var newMat = []
    for (vari = 0; i < mat.length; i++) {
        newMat[i] = []
        for (var j = 0; j < mat.length; j++) {
            newMat[i][j] = mat[i][j]
        }
    }
    return newMat
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function toggleGame(elBtn) {
    if (gGameInterval) {
        clearInterval(gGameInterval);
        gGameInterval = null;
        elBtn.innerText = 'Play';
    } else {
        gGameInterval = setInterval(play, GAME_FREQ);
        elBtn.innerText = 'Pause';

    }
}

function countNegs(cellI, cellJ, mat) {
    var negsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > mat[i].length - 1) continue;
            if (i === cellI && j === cellJ) continue;

            if (mat[i][j].isMine) negsCount++;// might need a change
        }
    }
    return negsCount;
}


function playSound(file) {
    var audio = new Audio(file)
    audio.play()
}

function drawNum() {
    var idx = getRandomInt(0, gNums.length)
    var num = gNums[idx]
    gNums.splice(idx, 1)
    return num
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// printPrimaryDiagonal(mat)

function printPrimaryDiagonal(squareMat) {
    for (var d = 0; d < squareMat.length; d++) {
        var item = squareMat[d][d];
        console.log(item);
    }
}


// printSecondaryDiagonal(mat)

function printSecondaryDiagonal(squareMat) {
    for (var d = 0; d < squareMat.length; d++) {
        var item = squareMat[d][squareMat.length - 1 - d];
        console.log(item);
    }
}


// function renderBoard(board) {
//     var strHTML = ''
//     // console.table(board);
//     for (var i = 0; i < board.length; i++) {
//         strHTML += '<tr>'
//         for (var j = 0; j < board[0].length; j++) {
//             var cell = board[i][j]
//             var className = (cell) ? 'occupied' : ''
//             strHTML += `
//             <td data-i="${i}" data-j="${j}" onclick="cellClicked(this, ${i}, ${j})" class="${className}" >
//                 ${cell}
//             </td>
//             `
//         }
//         strHTML += '</tr>'
//     }
//     var elBoard = document.querySelector('.board')
//     elBoard.innerHTML = strHTML
// }

function shuffle(items) {
    var randIdx, keep;
    for (var i = items.length - 1; i > 0; i--) {
        // randIdx = getRandomInt(0, items.length);
        randIdx = getRandomInt(0, i + 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function renderCell(cellI, cellJ, value) {
    var elCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
    console.log('elCell:', elCell);
    elCell.innerText = value
    elCell.classList.remove('occupied')

}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function buildBoard(size) {

    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
            board[i][j] = ' ';
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1) {
                board[i][j] = '*';
            }
        }
    }
    return board;
}

function timeToString(time) {
    var diffInHrs = time / 3600000
    var hh = Math.floor(diffInHrs)
    var diffInMin = (diffInHrs - hh) * 60
    var mm = Math.floor(diffInMin)
    var diffInSec = (diffInMin - mm) * 60
    var ss = diffInSec.toFixed(3)

    return `${hh}:${mm}:${ss}`

}