document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#minesweeper');
    const width = 10;
    const height = 10;
    const minesCount = 20;
    const cells = [];
    let isGameOver = false;
    let flags = 0;
    let isFirstClick = true;

    // Create the board
    function createBoard() {
        const minesArray = Array(minesCount).fill('mine');
        const emptyArray = Array(width * height - minesCount).fill('empty');
        const gameArray = emptyArray.concat(minesArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

        for (let i = 0; i < width * height; i++) {
            const cell = document.createElement('div');
            cell.setAttribute('id', i);
            cell.classList.add('cell');
            // Do not add the 'mine' class initially
            if (shuffledArray[i] === 'mine') {
                cell.setAttribute('data-mine', 'true');
            }
            grid.appendChild(cell);
            cells.push(cell);

            // Normal click
            cell.addEventListener('click', () => {
                click(cell);
            });

            // Right click
            cell.oncontextmenu = function(e) {
                e.preventDefault();
                addFlag(cell);
            }
        }

        // Add numbers
        for (let i = 0; i < cells.length; i++) {
            let total = 0;
            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i % width === width - 1);

            if (!cells[i].getAttribute('data-mine')) {
                if (i > 0 && !isLeftEdge && cells[i - 1].getAttribute('data-mine')) total++;
                if (i > 9 && !isRightEdge && cells[i + 1 - width].getAttribute('data-mine')) total++;
                if (i > 10 && cells[i - width].getAttribute('data-mine')) total++;
                if (i > 11 && !isLeftEdge && cells[i - 1 - width].getAttribute('data-mine')) total++;
                if (i < 98 && !isRightEdge && cells[i + 1].getAttribute('data-mine')) total++;
                if (i < 90 && !isLeftEdge && cells[i - 1 + width].getAttribute('data-mine')) total++;
                if (i < 88 && !isRightEdge && cells[i + 1 + width].getAttribute('data-mine')) total++;
                if (i < 89 && cells[i + width].getAttribute('data-mine')) total++;
                cells[i].setAttribute('data', total);
            }
        }
    }

    createBoard();

    // Click on cell actions
    function click(cell) {
        let currentId = cell.id;
        if (isGameOver) return;
        if (cell.classList.contains('revealed') || cell.classList.contains('flag')) return;
        if (cell.getAttribute('data-mine')) {
            if (isFirstClick) {
                reshuffleBoard(currentId);
                return;
            } else {
                gameOver(cell);
                return;
            }
        }
        isFirstClick = false;
        let total = cell.getAttribute('data');
        if (total != 0) {
            cell.classList.add('revealed');
            cell.innerHTML = total;
            return;
        }
        revealCell(cell, currentId);
        cell.classList.add('revealed');
    }

    // Add flag with right click
    function addFlag(cell) {
        if (isGameOver) return;
        if (!cell.classList.contains('revealed') && (cell.classList.contains('flag'))) {
            cell.classList.remove('flag');
            cell.innerHTML = '';
            flags--;
        } else if (!cell.classList.contains('revealed') && (!cell.classList.contains('flag')) && flags < minesCount) {
            cell.classList.add('flag');
            cell.innerHTML = '\ud83d\udea9';
            flags++;
        }
    }

    // Reveal cells
    function revealCell(cell, currentId) {
        const isLeftEdge = (currentId % width === 0);
        const isRightEdge = (currentId % width === width - 1);

        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = cells[parseInt(currentId) - 1].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (currentId > 9 && !isRightEdge) {
                const newId = cells[parseInt(currentId) + 1 - width].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (currentId > 10) {
                const newId = cells[parseInt(currentId - width)].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (currentId > 11 && !isLeftEdge) {
                const newId = cells[parseInt(currentId) - 1 - width].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (currentId < 98 && !isRightEdge) {
                const newId = cells[parseInt(currentId) + 1].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (currentId < 90 && !isLeftEdge) {
                const newId = cells[parseInt(currentId) - 1 + width].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (currentId < 88 && !isRightEdge) {
                const newId = cells[parseInt(currentId) + 1 + width].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (currentId < 89) {
                const newId = cells[parseInt(currentId) + width].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
        }, 10);
    }

    // Game over
    function gameOver(cell) {
        isGameOver = true;

        // Show all mines
        cells.forEach(cell => {
            if (cell.getAttribute('data-mine')) {
                cell.innerHTML = '\ud83d\udca3';
                cell.classList.add('revealed');
            }
        });
    }

    // Reshuffle the board if the first click is on a mine
    function reshuffleBoard(firstClickId) {
        // Remove all cells from the grid
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
        cells.length = 0;
        isFirstClick = true;
        createBoard();
        // Trigger click on the same cell after reshuffling
        click(document.getElementById(firstClickId));
    }
});
