const grid = document.querySelector("#grid");
const buttons = document.querySelectorAll(".buttons");
const slider = document.querySelector("#gridSize");
let isBordersOn = false;

let gridSize = 16;


slider.oninput = function () {
    gridSize = this.value;
    clearGrid();
    displayGrid(gridSize);
    document.querySelector("#slideDisplay").innerHTML = `${gridSize} X ${gridSize}`;
    cells = document.querySelectorAll(".cell");
    changeColor();
}



function displayGrid(size = 16) {
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.classList.add('row');
        for (let j = 0; j < size; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            if (isBordersOn) {
                cell.style.border = "1px solid rgba(0,0,0,0.1)";
            } else {
                cell.style.border = 'none';
            }
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

function changeColor() {
    cells.forEach(cell => {
        cell.addEventListener("mouseenter", (e) => {
            if (isBlackRunning) {
                e.target.style.backgroundColor = "rgb(0, 0, 0)";
            } else if (isColorRunning) {
                e.target.style.backgroundColor = getRandomColor();
            } else if (isGreyScaleRunning) {
                e.target.style.backgroundColor = getGreyScale(e.target);
            }
        })

    })

}

function getIsColor(currentColor, colorCode) {
    const firstIndex = Number(currentColor.indexOf(",")) + 2;
    const secondIndex = Number(colorCode.length) + firstIndex;
    const secondCode = currentColor.slice(firstIndex, secondIndex);
    if (colorCode != secondCode) {
        return true;
    } else {
        return false;
    }
}


function getGreyScale(element) {
    const currentColor = window.getComputedStyle(element).backgroundColor;
    const firstIndex = Number(currentColor.indexOf("(")) + 1;
    const secondIndex = Number(currentColor.indexOf(","));
    const colorCode = currentColor.slice(firstIndex, secondIndex);
    if (getIsColor(currentColor, colorCode) || colorCode == 0 || colorCode == 255) {
        return "rgb(220, 220, 220)";
    } else {
        let value = colorCode - 20;
        if (value <= 0) {
            return "rgb(1,1,1)";
        }
        return `rgb(${value}, ${value}, ${value})`;
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;

}

displayGrid(gridSize);
let cells = document.querySelectorAll(".cell");
let isBlackRunning = true;
let isColorRunning = false;
let isGreyScaleRunning = false;

changeColor();

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (e.target.id === "rainbow") {
            isBlackRunning = false;
            isGreyScaleRunning = false;
            isColorRunning = true;
        } else if (e.target.id === "black") {
            isBlackRunning = true;
            isColorRunning = false;
            isGreyScaleRunning = false;
        } else if (e.target.id === "greyScale") {
            isGreyScaleRunning = true;
            isColorRunning = false;
            isBlackRunning = false;
        } else if (e.target.id === "reset") {
            cells.forEach(cell => {
                cell.style.backgroundColor = "white";
            })
        } else if (e.target.id === 'borders') {
            cells.forEach(cell => {
                if (isBordersOn) {
                    cell.style.border = "none";
                } else {
                    cell.style.border = "1px solid rgba(0,0,0,0.1)";
                }

            })
            isBordersOn = (isBordersOn) ? false : true;

        }

    })
})

