const canvas = document.querySelector("#canvas");
const btnReset = document.querySelector("#btn-reset");
btnReset.addEventListener("click", resetPrompt);
let dimensionSize = 16;
resetCanvas();

function resetCanvas() {
    removeCanvasContents();
    buildCanvasContents();
    makeDivsDrawable();
}

function removeCanvasContents() {
    //If there are any contents, remove them
    while(canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

function buildCanvasContents() {
    //Create columns in canvas (based on dimensionSize)
    for (let i = 1; i <= dimensionSize; i++) {
        const column = document.createElement("div");
        column.classList.add("column")
        canvas.appendChild(column);

        //Create divs in column (based on dimensionSize)
        for (let j = 1; j <= dimensionSize; j++) {
            const drawableDiv = document.createElement("div");
            drawableDiv.classList.add("drawableDiv");
            column.appendChild(drawableDiv);
        }
    }
}

function makeDivsDrawable() {
    //Get all drawable divs; give them event listeners
    const drawableDivs = document.querySelectorAll(".drawableDiv");
    drawableDivs.forEach(div => div.addEventListener("mouseenter", function(e) {
        e.target.classList.add("filledInBlack"); //Class approach
        e.stopPropagation();
    }));
}

function resetPrompt() {
    //Prompt
    const promptMsg =
        "How many grid cells would you like on each dimension? " +
        "(Enter a number between 2 and 100.)"
    dimensionSize = prompt(promptMsg);

    //Response if too high
    if (dimensionSize > 100) {
        const alertMsg =
            dimensionSize + " is over maximum value; 100 will be used."
        alert(alertMsg);
        dimensionSize = 100;
    }

    //Response if too low
    if (dimensionSize < 2) {
        const alertMsg =
            dimensionSize + " is under maximum value; 2 will be used."
        alert(alertMsg);
        dimensionSize = 2;
    }

    resetCanvas();
}