/*
    Consegna
    Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco
    Attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
    Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
    nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
    In seguito l'utente clicca su una cella:
    se il numero è presente nella lista dei numeri generati
    abbiamo calpestato una bomba
    la cella si colora di rosso e la partita termina.
    Altrimenti
    la cella cliccata si colora di azzurro
    l'utente può continuare a cliccare sulle altre celle.
    La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
    Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
    
    BONUS:
    Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
    difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
    difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
    difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/

const rowEl = document.querySelector('#app_main .ms-row');
const maxNumberOfBombs = 16;

const closeBtn = document.querySelector('#close_btn');
const maskEl = document.querySelector('#app_main > .mask');
closeBtn.addEventListener('click', function(){
    maskEl.classList.toggle('d-none');
    clearGrid();
});


const submitBtn = document.querySelector('#play-btn');
submitBtn.addEventListener('click', function(e){
    e.preventDefault();
    const difficultyValue = document.querySelector('#difficulty-selection').value;
    let maxCells = setDifficulty(difficultyValue);
    clearGrid();
    createGrid(maxCells);
    //console.log('maxCells', maxCells);
    const boxesEl = document.querySelectorAll('.ms-col');
    let bombsPosition = [];
    let score = 0;
    //console.log(`bombsPosition`, bombsPosition);
    bombsPosition = generateBombs(maxCells, bombsPosition);
    
    for(let i=0; i<boxesEl.length; i++){
        boxesEl[i].addEventListener("click", function(){
            if(checkBomb(i, bombsPosition)){
                changeBgColor(this, 'failure');
                printNumber(i, true);
                endGame(score, 'lose');
                score = 0;
            }else{
                if(haveAdiacentBombs(i, bombsPosition, maxCells)){
                    changeBgColor(this, 'near');
                }else{
                    changeBgColor(this, 'success');
                }
                printNumber(i, false);
                if(score == bombsPosition.length - maxNumberOfBombs - 1){
                    endGame(score, 'win');
                    score = 0;
                }else{
                    score++;
                }
            }
        });
    }
});

/**
 * ## Set Difficulty
 * Set the difficulty of the game
 * @param {String} difficulty 
 * @returns 
 */
function setDifficulty(difficulty){
    switch(difficulty){
        case 'easy':
            return 100;
        case 'medium':
            return 81;
        case 'hard':
            return 49;
    }
}

/**
 * ## Set Table Size
 * Sets the table colums width depending the of the parameter
 * @param {Number} max 
 * @returns 
 */
function setTableSize(max){
    switch(max){
        case 100:
            return 'ms-width-10';
        case 81:
            return 'ms-width-9';
        case 49:
            return 'ms-width-7';
    }
}

/**
 * ## Create Grid
 * Creates the grid of box elements with macCells amount
 * @param {Number} max
 */
function createGrid(max){
    for(let i=0; i < max; i++){
        rowEl.innerHTML += `
            <div class="ms-col bg-transparent ${setTableSize(max)}">
                <span class="box-index fs-4">${i+1}</span>
            </div>
        `
        //console.log(setTableSize(max));
    }
}

/**
 * ## Clear Grid
 * Clears the innerHTML of the row       
 */
function clearGrid(){
    rowEl.innerHTML = '';
}

/**
 * ## Change Background Color
 * Given an Html Element, changes is bg-class with the special bg class 
 * @param {HTMLElement} element 
 * @param {String} colorToUse
 */
function changeBgColor(element, colorToUse){
    if(colorToUse === 'success'){
        element.classList.remove('bg-transparent');
        element.classList.add('ms-bg-success'); 
    }else if(colorToUse === 'near'){
        element.classList.remove('bg-transparent');
        element.classList.add('ms-bg-alert'); 
    }else{
        element.classList.remove('bg-transparent');
        element.classList.add('ms-bg-danger'); 
    }
}

/**
 * ## Print Number
 * Prints in console the index of the box clicked and a status string
 * @param {Number} index 
 * @param {Boolean} isBomb 
 */
function printNumber(index, isBomb){
    if(isBomb){
        console.log(`The box ${index+1} is a Bomb!`);
    }else{
        console.log(`The box ${index+1} is a Flower!`);
    }
}

/**
 * ## Generate Bombs
 * Creates an array of bombs with random position, it takes in input te length of the array 
 * @param {Number} arrayLength 
 * @param {Array} array 
 * @returns
 */
function generateBombs(arrayLength, array){
    array.length = 0;
    
    let bombsCounter = 0;

    array.length = arrayLength;
    
    while(bombsCounter < maxNumberOfBombs){
        let randomIndex = randomValue(0, arrayLength - 1);  
        if(array[randomIndex] != 'bomb'){
            array[randomIndex] = 'bomb';
            bombsCounter++;
        }else continue;
    }
    return array;
}

/**
 * ## Bheck Bomb
 * verify if in index position of the array contains a bomb
 * @param {Number} index 
 * @param {Array} array 
 * @returns
 */
function checkBomb(index, array){
    if(array[index] == 'bomb') {
        return true;
    }
    else{
        return false;
    } 
}

/**
 * ## Random Value
 * return a random value between min and max
 * @param {Number} min 
 * @param {Number} max 
 * @returns 
 */
function randomValue(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * ## End Game
 * creates the end game event with the print of the final score
 * @param {Number} score 
 */
function endGame(score, gameResult){
    const scoreEl = document.querySelector('#score');
    const resultEl = document.querySelector('#result-message');

    resultEl.innerHTML = `You ${gameResult}!`;
    maskEl.classList.toggle('d-none');
    scoreEl.innerHTML = `${score}`;
}

// ! bonus dei bonus
// funzione per verifcare se attorno alla casella cliccata ci sia una bomba
// prendo in input l'indice della casella cliccata
// faccio una verifica sulla casella subito dopo e subito prima
// faccio un controllo sulle caselle dopo di +10 e prima di -10 per avere la casella superiore e inferiore
// devo avere come controllo che non sia una casella ai bordi, in prima riga o nell'ultima, in tal caso non devo eseguire certi controlli.

/**
 * ## Have adiacent Bombs
 * Verify if in the cross near the index, we have a bomb
 * @param {Number} i 
 * @param {Array} array 
 * @param {Number} max 
 * @returns 
 */
function haveAdiacentBombs(i, array, max){
    let numberOfCols = Math.sqrt(max);
    //console.log(numberOfCols, ' number of cols');
    //console.log(max, ' max');
    let nearBomb = false;
    switch(true){
        case (i == 0): // prima posizione
            if(checkBomb(i + 1, array)){
                return nearBomb = true;
            }else if(checkBomb(i + numberOfCols, array)){
                return nearBomb = true;
            }else return nearBomb;
        case (i == array.length - 1): // ultima posizione
            if(checkBomb(i - 1, array)){
                return nearBomb = true;
            }else if(checkBomb(i - numberOfCols, array)){
                return nearBomb = true;
            }else return nearBomb;
        case (i <= numberOfCols): // prima riga
            if(checkBomb(i + 1, array) || checkBomb(i - 1, array) || checkBomb(i + numberOfCols, array)){
                return nearBomb = true;
            }else return nearBomb;
        case (i >= ((array.length - 1) - numberOfCols)): // ultima riga
            if(checkBomb(i + 1, array) || checkBomb(i - 1, array) || checkBomb(i - numberOfCols, array)){
                return nearBomb = true;
            }else return nearBomb;
        default:
            if(checkBomb(i + 1, array) || checkBomb(i - 1, array) || checkBomb(i + numberOfCols, array) || checkBomb(i - numberOfCols, array)){
                return nearBomb = true;
            }else return nearBomb;
    }
}
