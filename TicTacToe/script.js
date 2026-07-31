let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-Btn");
let newGameBtn = document.querySelector("#new-Btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")

let turnO = true; //playerX, playerO
let count = 0; //to track draw 

//2D array-> stores all wining chances(rows, column, diagonal)
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}
const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x");
        box.classList.remove("o");
    }
};
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("o");
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("x");
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if(count === 9 && !isWinner) {
            gameDraw();
        }
    })
});
const gameDraw = () => {
    msg.innerText = `Oops! Draw Game`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if(pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return true;

            }
        }
        
    }
    return false;
};

const showWinner = (winner) => {
    msg.innerText = `WOhhoo! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);