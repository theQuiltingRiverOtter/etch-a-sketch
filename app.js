const grid = document.querySelector("#grid");
const buttons = document.querySelectorAll("button");
const slider = document.querySelector("#gridSize");
let borderDisplay = 'solid black 1px';

let gridSize = 16;


slider.oninput = function () {
    gridSize = this.value;
    clearGrid();
    displayGrid(gridSize);
    cells = document.querySelectorAll(".cell");
    changeCellColor();
}



function displayGrid(size = 16) {
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.classList.add('row');
        for (let j = 0; j < size; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.border = borderDisplay;
            row.append(cell);
        }
        grid.append(row);

    }
}

function clearGrid() {
    const rows = document.querySelectorAll(".row");
    rows.forEach(row => {
        row.remove();
    })
}


function changeCellColor(color = 'black') {
    cells.forEach(cell => {
        cell.addEventListener("mouseenter", (e) => {
            console.log('color');
            if (color === 'rainbow') {
                e.target.style.backgroundColor = getRandomColor();
            }
            else if (color === 'greyScale') {
                e.target.style.backgroundColor = 'rgb(240, 240, 240)';

            }
            else {
                e.target.style.backgroundColor = color;
            }

        })
    })
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;

}

displayGrid(gridSize);
let cells = document.querySelectorAll(".cell");
changeCellColor('black');

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (e.target.id === "rainbow") {
            changeCellColor("rainbow");
        } else if (e.target.id === "black") {
            changeCellColor("black");
        } else if (e.target.id === "greyScale") {
            changeCellColor('greyScale');
        } else if (e.target.id === "reset") {
            cells.forEach(cell => {
                cell.style.backgroundColor = "white";
            })
        } else if (e.target.id === 'borders') {
            cells.forEach(cell => {
                cell.style.border = 'none';
            })
            borderDisplay = 'none';
        }

    })
})

