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

const submitBtn = document.querySelector('#play-btn');
submitBtn.addEventListener('click', function(e){
    e.preventDefault();
    const difficultyValue = document.querySelector('#difficulty-selection').value;
    let maxCells = setDifficulty(difficultyValue);
    clearGrid();
    createGrid(maxCells);
    
    const boxesEl = document.querySelectorAll('.ms-col');
    
    for(let i=0; i<boxesEl.length; i++){
        boxesEl[i].addEventListener("click", function(){
            changeBgColor(this);
            printNumber(i);
        });
    }
})





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
        console.log(setTableSize(max));
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
 */
function changeBgColor(element){
    element.classList.toggle('bg-transparent');
    element.classList.toggle('ms-bg-active');
}

function printNumber(index){
    console.log(`The box clicked is the number ${index+1}`);
}