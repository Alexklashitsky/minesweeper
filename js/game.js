
var gInerval
var gElapsedTime
var gIsclockIsOn = false
var gBoard = []
var glives = 3
var gElmodal = document.querySelector('.modal')
var elCells = []
var gBestTIME = Infinity
var gElBestTime = document.querySelector('.best-time span')
var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gMines = gLevel.MINES
var gClickCunter = 0
var gEllives = document.querySelector('.lives span')

function initGame() {
    gEllives.innerText = glives
    setEmoji('start')
    buildBoard(gLevel.SIZE)
    renderBoard(gBoard)
}
function buildBoard(size) {
    gBoard = createBoard(size)

}
function renderBoard(board) {
    var strHTML = ''
    // console.table(board);
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]

            var className = (cell.isMine) ? 'isMine' : ''
            strHTML += `
            <td data-i="${i}" data-j="${j}" onclick="cellClicked(this, ${i}, ${j})" class="${className} ${isVisible(cell)}""${className} "  >${board[i][j].minesAroundCount}
               
            </td>
            `
        }
        strHTML += '</tr>'
        var elBoard = document.querySelector('.game');
        elBoard.innerHTML = strHTML;

    }

}

function cellClicked(elCell, i, j) {
    gClickCunter++
    console.log('gClickCunter:', gClickCunter);

    if (gClickCunter === 1) {
        elCell.classList.remove('invisible')
        gBoard[i][j].isShown = true
        isClicked()
    }
    if (gBoard[i][j].isMarked) cellMarked(elCell)

    // cellMarked(elCell)
    if (elCell.classList.contains('isMine')) {
        console.log('boom!');
        elCell.innerText = '💣'
        glives--
        gEllives.innerText = glives
    }
    if (glives === 0) endGame()
    if (gBoard[i][j].minesAroundCount === 0) expandShown(i, j, gBoard, elCell)
    gBoard[i][j].isShown = true
    elCell.classList.remove('invisible')
    if (victoryCheck()) victory()
}
function cellMarked(elCell) {
    console.log('bla bla');
    elCell.classList.add('.invisible')
    renderBoard(gBoard)
    rightClick()
}
function expandShown(cellI, cellJ, mat, elCell) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > mat[i].length - 1) continue;
            if (i === cellI && j === cellJ) continue;
            // console.log(i, j);
            // console.log(mat[i][j]);
            if (mat[i][j].isMine === false) {
                console.log('nooo');
                elCell.classList.remove('invisible')
                mat[i][j].isShown = true
                renderBoard(gBoard)
                rightClick()
            }
        }
    }
}
function setMinesNegsCount(gBoard) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currNegsCount = countNegs(i, j, gBoard)
            gBoard[i][j].minesAroundCount = currNegsCount
        }
    }
}
function placeRandomMins(board, num) {
    var mineCounter = 0
    while (mineCounter < num) {
        var i = getRandomInt(0, board.length)
        var j = getRandomInt(0, board.length)
        if (!board[i][j].isMine && !board[i][j].isShown) {
            board[i][j].isMine = true
            mineCounter++
        }
    }
}
function endGame() {
    var mineCells = []
    gElmodal.innerText = 'YOU DEAD!!!'
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            gBoard[i][j].isShown = true
            if (gBoard[i][j].isMine) {
                var currLoction = { i: i, j: j }
                console.log('currLoction:', currLoction);
                mineCells.push(currLoction)
            }
        }
    }
    console.log('mineCells:', mineCells);
    renderBoard(gBoard)
    for (i = 0; i < gLevel.MINES; i++) {

        renderCell(mineCells[i].i, mineCells[i].j, '💣')
    }
    clearInterval(gInerval)
    setEmoji('lose')

}
function isVisible(cell) {
    if (!cell.isShown) return 'invisible'
    else return
}
function rest() {
    glives = 3
    gMines = gLevel.MINES
    gElmodal.innerText = ''
    gClickCunter = 0
    initGame()
    rightClick()
    gEllives.innerText = glives
    clearInterval(gInerval)
    var elClock = document.querySelector('.timer')
    elClock.innerText = '00:00:000'
}
function rightClick() {
    const noContext = document.querySelectorAll('td');
    for (var i = 0; i < noContext.length; i++) {
        noContext[i].addEventListener('contextmenu', e => {
            e.preventDefault();
        });
        noContext[i].addEventListener('contextmenu', rightClicked)
    }
}
function rightClicked() {
    console.log(this);
    var elCell = this

    elCell.classList.remove('invisible')
    elCell.innerText = '🚩'
    var i = elCell.dataset.i
    var j = elCell.dataset.j
    gBoard[i][j].isMarked = true
    if (gBoard[i][j].isMine) gMines--
    console.log('gMines:', gMines);

    if (victoryCheck()) victory()
}
function victory() {
    console.log('victory!!');
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            gBoard[i][j].isShown = true
        }
    }
    renderBoard(gBoard)
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMarked) renderCell(i, j, '🚩')
        }
    }
    clearInterval(gInerval)
    gElmodal.innerText = 'VICTORY!!!'
    setEmoji('mod')
}
function isClicked() {
    placeRandomMins(gBoard, gLevel.MINES)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    rightClick()
    timer()
    console.log('gMine:', gMines);
}
function timer() {
    startTime = Date.now();
    gInerval = setInterval(function printTime() {
        gElapsedTime = Date.now() - startTime;
        if (gElapsedTime < gBestTIME) {
            gBestTIME = gElapsedTime
            gElBestTime.innerHTML = timeToString(gBestTIME)
        }
        document.querySelector(".timer").innerHTML = timeToString(gElapsedTime);
    }, 10);
}
function victoryCheck() {
    if (gMines === 0) {
        var counter = 0
        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[0].length; j++) {
                console.log('i:', i);

                if ((gBoard[i][j].isShown) || (gBoard[i][j].isMarked)) counter++
            }
        }
        if (counter === gLevel.SIZE * gLevel.SIZE) return true
    }
}
function setLevel(btn) {

    var setLevel = btn.dataset.level
    if (setLevel === 'beginner') {
        gLevel.SIZE = 4
        gLevel.MINES = 2
        rest()
    }
    if (setLevel === 'advance') {
        gLevel.SIZE = 8
        gLevel.MINES = 12
        rest()
    }
    if ((setLevel === 'expert')) {
        gLevel.SIZE = 12
        gLevel.MINES = 30
        rest()
    }
}
function setEmoji(mod) {
    var strHTML = ''
    var emoji = document.querySelector('.setemoji')
    if (mod === 'start') emoji.innerHTML = '🙂'
    if (mod === 'win') emoji.innerHTML = '🤑'
    if (mod === 'lose') emoji.innerHTML = '💀'
}
