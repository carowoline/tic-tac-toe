// document. stuff
const startBox = document.querySelector(".start-box"),
selectBtn1 = startBox.querySelector(".optionsNum .player1"),
selectBtn2 = startBox.querySelector(".optionsNum .player2"),

selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),

player1Name = document.querySelector(".player1Name"),
player1Options = document.querySelector(".name1Options"),
player1Btn = document.querySelector(".name1Options .player1Btn"),
player2Name = document.querySelector(".player2Name"),
player2Options = document.querySelector(".name2Options"),
player2Btn = document.querySelector(".name2Options .player2Btn"),
xTurn = document.queryCommandIndeterm(".players .Xturn"),
firstName = document.querySelector(".player1"),
secondName = document.querySelector(".player2"),
nameBox = document.querySelector(".name-box"),
displayPlayer = document.querySelector(".display-player"),

playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),

resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

// on load make all boxes clickable
window.onload = ()=> {
    for (let i = 0; i < allBox.length; i++) {
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

// button functions
selectBtn1.onclick = ()=> {
    startBox.classList.add("hide");
    selectBox.classList.add("show");
}

selectBtnX.onclick = ()=> {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    // nameBox.classList.add("show");
    runBot = true;
}

selectBtnO.onclick = ()=> { 
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    // nameBox.classList.add("show");
    players.setAttribute("class", "players active player");
    runBot = true;
}

selectBtn2.onclick = ()=> {
    startBox.classList.add("hide");
    player1Name.classList.add("show");
}

player1Btn.onclick = ()=> {
    player1Name.classList.add("hide");
    player2Name.classList.add("show");
}

player2Btn.onclick = ()=> {
    player2Name.classList.add("hide");
    playBoard.classList.add("show");
    nameBox.classList.add("show");
    // runSecond = true;
}

// icons and other starting stuff
let playerXIcon = "fas fa-times", playerOIcon = "far fa-circle", playerSign = "X", runBot = false, runSecond = false;

function clickedBox(element) {
    if(runBot) {
        if(players.classList.contains("player")) {
            playerSign = "O";
            element.innerHTML = `<i class="${playerOIcon}"></i>`;
            players.classList.remove("active");
            element.setAttribute("id", playerSign);
        }
        else{
            element.innerHTML = `<i class="${playerXIcon}"></i>`;
            element.setAttribute("id", playerSign);
            players.classList.add("active");
        }
        selectWinner();
        element.style.pointerEvents = "none";
        playBoard.style.pointerEvents = "none";
        let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
        setTimeout(()=>{
            bot(runBot);
        }, randomTimeDelay);
        console.log(playBoard);
    }
}

// ai click empty space
function bot() {
    let array = [];

    if(runBot) {
        playerSign = "O";

        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0) {
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];

        if(array.length > 0) {
            if(players.classList.contains("player")) { 
                playerSign = "X";
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                allBox[randomBox].setAttribute("id", playerSign);
                players.classList.add("active"); 
            }
            else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";        
    }
}

// give each space a value
function getIdVal(classname) {
    return document.querySelector(".box" + classname).id;
}

// check to see if values of 3 boxes have same sign
function checkIdSign(val1, val2, val3, sign) { 
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign) {
        return true;
    }
    return false;
}

// if 3 values of a winning combo matches -> win text. else -> draw
function selectWinner() {
    if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6, playerSign) || checkIdSign(7,8,9, playerSign) || checkIdSign(1,4,7, playerSign) || checkIdSign(2,5,8, playerSign) || checkIdSign(3,6,9, playerSign) || checkIdSign(1,5,9, playerSign) || checkIdSign(3,5,7, playerSign)) {
        runBot = false;
        bot(runBot);
        setTimeout(()=> {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700);
        wonText.innerHTML = `Player ${playerSign} wins!`;
    }
    else {
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != "") {
            runBot = false;
            bot(runBot);
            setTimeout(()=> {
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.textContent = "It's a draw.";
        }
    }
}

// play again button
replayBtn.onclick = () => {
    window.location.reload();
}
