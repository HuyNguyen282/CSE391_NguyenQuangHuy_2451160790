const MAX_ATTEMPS = 7;
let secret, attemps, guessed, gameOver;

function init() {
    secret = Math.floor(Math.random() * 100) + 1;
    attemps = 0;
    guessed = [];
    gameOver = false;

    document.getElementById("guess-input").value = "";
    document.getElementById("guess-input").disabled = false;
    document.getElementById("btn-guess").disabled = false;
    document.getElementById("hint").textContent = "Nhập số đầu tiên của bạn";
    document.getElementById("remaining").textContent = MAX_ATTEMPS;
    document.getElementById("history").textContent = "-";

}
function updateHistory(){
    document.getElementById("history").textContent = guessed.join(", ");
    
}
function endGame(win){
    gameOver = true;
    document.getElementById("guess-input").disabled = true;
    document.getElementById("btn-guess").disabled = true;

    if(win){
        document.getElementById("hint").textContent = "Bạn đã đoán đúng sau " + attemps + " lần";
    }
    else{
        document.getElementById("hint").textContent = "Bạn đã đoán sai, số đúng là" + secret +".";

    }

}
function submitGuess(){
    if(gameOver) return;

    const input = document.getElementById("guess-input");
    const raw = input.value.trim();
    const num = parseInt(raw, 10);

    if(!raw || isNaN(num) || num < 1 || num > 100 ){
        document.getElementById("hint").textContent  = "Nhap so tu 1 den 100";
        return;

    }
    if(guessed.includes(num)){
        document.getElementById("hint").textContent = "Ban da doan so nay r, thu lai";
        return;

    }
    attemps++;
    guessed.push(num);
    input.value ="";
    updateHistory();

    const remaining = MAX_ATTEMPS - attemps;
    document.getElementById("remaining").textContent = remaining;
        if (num === secret) {
        endGame(true);
    } else if (attemps >= MAX_ATTEMPS) {
        endGame(false);
    } else if (num < secret) {
        document.getElementById("hint").textContent =
           num + "thap hon so du doan. Con " + remaining + "lan";
    } else {
        document.getElementById("hint").textContent =
             num + "cao hon so du doan. Con " + remaining + "lan";
    }
 
    input.focus();
}
document.getElementById("btn-guess").addEventListener("click", submitGuess);
document.getElementById("btn-restart").addEventListener("click", init);
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") submitGuess();
});

init();