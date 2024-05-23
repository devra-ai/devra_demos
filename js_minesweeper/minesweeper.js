document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('gameBoard');
    const boardSize = 10;
    const mineCount = 20;
    let tiles = [];
    let mines = Array(mineCount).fill('mine');
    let empty = Array(boardSize * boardSize - mineCount).fill('valid');
    let gameArray = empty.concat(mines);
    gameArray.sort(() => Math.random() - 0.5);

    function createBoard() {
        for (let i = 0; i < boardSize * boardSize; i++) {
            const tile = document.createElement('div');
            tile.setAttribute('id', i);
            tile.classList.add(gameArray[i]);
            board.appendChild(tile);
            tiles.push(tile);

            tile.addEventListener('click', function(e) {
                click(tile);
            });
        }
        addNumbers();
    }

    function addNumbers() {
        for (let i = 0; i < tiles.length; i++) {
            let total = 0;
            const isLeftEdge = (i % boardSize === 0);
            const isRightEdge = (i % boardSize === boardSize - 1);

            if (tiles[i].classList.contains('valid')) {
                if (i > 0 && !isLeftEdge && tiles[i - 1].classList.contains('mine')) total++;
                if (i > 9 && !isRightEdge && tiles[i + 1 - boardSize].classList.contains('mine')) total++;
                if (i > 10 && tiles[i - boardSize].classList.contains('mine')) total++;
                if (i > 11 && !isLeftEdge && tiles[i - 1 - boardSize].classList.contains('mine')) total++;
                if (i < 98 && !isRightEdge && tiles[i + 1].classList.contains('mine')) total++;
                if (i < 90 && !isLeftEdge && tiles[i - 1 + boardSize].classList.contains('mine')) total++;
                if (i < 88 && !isRightEdge && tiles[i + 1 + boardSize].classList.contains('mine')) total++;
                if (i < 89 && tiles[i + boardSize].classList.contains('mine')) total++;
                tiles[i].setAttribute('data', total);
            }
        }
    }

    function click(tile) {
        if (tile.classList.contains('mine')) {
            alert('Game Over!');
            // Reset game or show all mines
        } else {
            let total = tile.getAttribute('data');
            if (total != 0) {
                tile.classList.add('checked');
                tile.innerHTML = total;
                return;
            }
            checkTile(tile, parseInt(tile.id));
        }
    }

    function checkTile(tile, currentId) {
        const isLeftEdge = (currentId % boardSize === 0);
        const isRightEdge = (currentId % boardSize === boardSize - 1);

        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) click(document.getElementById(currentId - 1));
            if (currentId > 9 && !isRightEdge) click(document.getElementById(currentId + 1 - boardSize));
            if (currentId > 10) click(document.getElementById(currentId - boardSize));
            if (currentId > 11 && !isLeftEdge) click(document.getElementById(currentId - 1 - boardSize));
            if (currentId < 98 && !isRightEdge) click(document.getElementById(currentId + 1));
            if (currentId < 90 && !isLeftEdge) click(document.getElementById(currentId - 1 + boardSize));
            if (currentId < 88 && !isRightEdge) click(document.getElementById(currentId + 1 + boardSize));
            if (currentId < 89) click(document.getElementById(currentId + boardSize));
        }, 10);
    }

    createBoard();
});