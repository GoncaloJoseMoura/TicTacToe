const startGame = document.querySelector('.start');

const tictactoe = (function () {

    const body = document.querySelector('body');
    let player_1;
    let player_2;

    let boardGame;

    const charSelect = function () {
        body.innerHTML = `
        <div class="logo">
            <img src="./assets/Odin_Logo.svg" alt="Odin Project Viking Logo">
        </div>

        <div class="player-sign">
            <p>Pick Players Names</p>
            <div class="signs">

                <div>
                    <label for="player_1">X:</label>
                    <input type="text" id="player_1" placeholder="Player 1's name" value="Player 1">
                </div>

                <div>
                    <label for="player_2">O:</label>
                    <input type="text" id='player_2' placeholder="Player 2's name" value="Player 2">
                </div>

            </div>
            <p class="reminder">Remember: X Goes first</p>

        </div>

        <button type="button" class="start">Start Game!</button>
        `



        const startGame = document.querySelector('.start');
        startGame.addEventListener('click', () => {
            player_1 = document.querySelector('#player_1').value
            player_2 = document.querySelector('#player_2').value
            buildBoard(player_1, player_2)
        });
    }

    const resetBoard = function (player_1, player_2) {
        document.querySelector('#myDialog').close()
        buildBoard(player_1, player_2)
    }

    const checkResult = function (num, player_1, player_2) {
        if (checkForWinner()) {

            let winner =  num%2 != 0 ? player_1 : player_2

            const dialog = body.querySelector('dialog')

            dialog.querySelector('h2').textContent = `🎉 ${winner} Won 🎉`
            dialog.showModal()

        } else if (num == 9) {

            const dialog = body.querySelector('dialog')
            dialog.querySelector('h2').textContent = '⚖️ Its a Draw ⚖️'
            dialog.showModal()

        }
    }

    const checkForWinner = function () {
        return ((boardGame[0] != null & boardGame[0] == boardGame[1] & boardGame[1] == boardGame[2]) |
        (boardGame[3] != null & boardGame[3] == boardGame[4] & boardGame[4] == boardGame[5]) |
        (boardGame[6] != null & boardGame[6] == boardGame[7] & boardGame[7] == boardGame[8]) |
        (boardGame[0] != null & boardGame[0] == boardGame[4] & boardGame[4] == boardGame[8]) |
        (boardGame[6] != null & boardGame[6] == boardGame[4] & boardGame[4] == boardGame[2]) |
        (boardGame[0] != null & boardGame[0] == boardGame[3] & boardGame[3] == boardGame[6]) |
        (boardGame[1] != null & boardGame[1] == boardGame[4] & boardGame[4] == boardGame[7]) |
        (boardGame[2] != null & boardGame[2] == boardGame[5] & boardGame[5] == boardGame[8])
    ) 
    }

    const buildBoard = function (player_1, player_2) {

        let num = 0

        boardGame = [null, null, null,
            null, null, null, 
            null, null, null]

        const body = document.querySelector('body');
        body.innerHTML = `    
        <section class="board">

            <div class="player">
                <p class="player_1_name">${player_1}</p><span class= 'X'>Turn</span>
            </div>

            <div class="outside">
                <div class="0"></div>
                <div class="1"></div>
                <div class="2"></div>
                <div class="3"></div>
                <div class="4"></div>
                <div class="5"></div>
                <div class="6"></div>
                <div class="7"></div>
                <div class="8"></div>
            </div>

            <div class="player">
                <p class="player_2_name">${player_2}</p><span class='O'></span>
            </div>
        </section>

        <dialog id="myDialog">
            <h2></h2>
            <button onclick="tictactoe.charSelect()">Quit</button>
            <button onclick="tictactoe.resetBoard('${player_1}', '${player_2}')">Reset</button>
        </dialog>
        `


        body.querySelectorAll('.outside div').forEach((value) => {
            value.addEventListener('click', (value) => {
                
                if (value.target.textContent == '') {
                    if (num%2==0) {

                        boardGame[Number(value.target.classList.value)] = 'X'
                        value.target.textContent = 'X'
                
                        body.querySelector('.X').textContent = ''
                        body.querySelector('.O').textContent = 'Turn'
                        
                
                        num += 1
                
                        checkResult(num, player_1, player_2)
                
                    } else if (num%2!=0) {
                
                        boardGame[Number(value.target.classList.value)] = 'O'
                        value.target.textContent = 'O'
                
                        body.querySelector('.O').textContent = ''
                        body.querySelector('.X').textContent = 'Turn'
                
                        num += 1
                
                        checkResult(num, player_1, player_2)
                    }
                }

            })
        })

    }

    return {checkResult, checkForWinner, buildBoard, resetBoard, charSelect}
})()


tictactoe.charSelect()