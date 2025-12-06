const board=document.getElementById("board");
const status=document.getElementById("status");
const restart=document.getElementById("restart")
const scoreXvalue=document.getElementById("X")
const scoreOvalue=document.getElementById("O")
const reset=document.getElementById("reset")

let cells=[];
let boardState=Array(9).fill(null);
let currentPlayer="X";
let gameOver=false;
let scoreX=0;
let scoreO=0;


//creates the gameboard
function createBoard(){
	for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
        cells.push(cell);
	}
}

//updates the scoreboard
function updateScore() {
	scoreXvalue.textContent=scoreX;
	scoreOvalue.textContent=scoreO;
}

//determines player turns and when the game is over
function handleMove(event){
	const index=event.target.dataset.index;

	if (gameOver || boardState [index]) return;

	boardState[index]=currentPlayer;
	event.target.textContent=currentPlayer;

	//adds to scoreboard
	if(checkWin(currentPlayer)) {
		status.textContent=`Player ${currentPlayer} wins!`;

		if (currentPlayer === "X") scoreX++;
		else scoreO++;
		updateScore();
		gameOver=true;
		return;
	}

	//determines draw
	if(boardState.every(cell => cell !== null)) {
		status.textContent="It's a draw"
		gameOver=true;
		return;
	}

	//switches players
	console.log(index);
	if(!boardState[index]){
		boardState[index]=currentPlayer;
		event.target.textContent=currentPlayer;
	}
	currentPlayer=currentPlayer==="X"?"O":"X";
	status.textContent=`Player ${currentPlayer} turn`;
	
}
// checks for which player won, got general idea from daniel and some forums, used chagpt to help with smaller syntax errors
function checkWin(player) { 
	const winning = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	];

	return winning.some(combo => 
		combo.every(index => boardState[index] === player)
	)
}

//resets game board
function resetGame(){
    boardState = Array(9).fill(null);
    currentPlayer = "X";
    gameOver = false;
    status.textContent = `Player ${currentPlayer} turn`;
    cells.forEach(cell => {
        cell.textContent = "";
    });
}

function resetScore() {
	scoreX=0;
	scoreO=0;
	updateScore();
}

//connects to restart button
restart.addEventListener("click", resetGame);
reset.addEventListener("click", resetScore);

//initializes board
createBoard();
updateScore();

