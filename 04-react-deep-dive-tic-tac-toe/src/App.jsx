import { useState } from "react";

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combination";


const PLAYERS = {
        X: 'Player 1',
        O: 'Player 2'
      };

const  INITIAL_GAME_BOARD = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
]

function deriveActivePlayer(gameTurns) {
        let currentPlayer = 'X';
        currentPlayer = (gameTurns.length > 0 && gameTurns[0].player === 'X') ? 'O' : 'X';
        return currentPlayer
}

function deriveWinner(gameBoard, players) {
        let winner;
        for (const combination of WINNING_COMBINATIONS) {
                // combination -->                 
                // [ { row: 0, column: 0 },
                //   { row: 0, column: 1 },
                //   { row: 0, column: 2 } ]
                // represents X X X on the first row

                // each value in gameBoard is either X, O or null
                // each of these values have a row and col index
                // ex: gameBoard[combination[0].row][combination[0].column] returns value X or O in the gameBoard state
                const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];  // gameBoard[0][0]
                const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];  // gameBoard[0][1]
                const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];  // gameBoard[0][2]

                if (
                        // we will loop through all the winning combos to see if the condtions are met
                        firstSquareSymbol &&    // if there is an entry by player, if its null dont proceed to check the below conditions
                        firstSquareSymbol === secondSquareSymbol &&   // and the entry matches with the secondSquareSymbol and thirdSquareSymbol
                        firstSquareSymbol === thirdSquareSymbol
                ) {
                        winner = players[firstSquareSymbol];
                }
        }
        return winner;
}

function deriveGameBoard(gameTurns) {
        // making a deep copy of the initialGameBoard so when we change values in gameBoard, we are not changing initialGameBoard
        let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];

        for (const turn of gameTurns) {
          const { square, player } = turn;
          const { row, col } = square;
      
          gameBoard[row][col] = player;
        }
      
        return gameBoard;
}

function App() {
        const [players, setPlayers] = useState(PLAYERS);
        const [gameTurns, setGameTurns] = useState([]);

        const activePlayer = deriveActivePlayer(gameTurns);
        const gameBoard = deriveGameBoard(gameTurns);
        const winner = deriveWinner(gameBoard, players);

        function handleSelectSquare(rowIndex, colIndex) {
                // this updated func is depracated due to code optimization
                // setActivePlayer((curActivePlayer) => {
                // curActivePlayer = curActivePlayer === 'X' ? 'O' : 'X';  // if current player is X, set it to O when scheduled setActivePlayer is executed
                // return curActivePlayer;   // if you use {} you MUST return
                // without {} the arrow function  must look like this
                //  setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X';  )
                // });

                setGameTurns((prevTurns) => {
                        const currentPlayer = deriveActivePlayer(prevTurns);
                        const updatedTurns = [
                                {
                                        square: { row: rowIndex, col: colIndex },
                                        player: currentPlayer
                                },
                                ...prevTurns,
                        ];
                        return updatedTurns;
                });
        }

        function handleRestart() {
                setGameTurns([]);
        }

        function handlePlayerNameChange(symbol, newName) {
                setPlayers(prevPlayers => {
                  return {
                    ...prevPlayers,   // unpack the players object and overwrite the symbol value with the name saved
                    [symbol]: newName
                  };
                });
              }

        const hasDraw = gameTurns.length === 9 && !winner;

        // this approach for coditonally rendering  works
        let winningMsg = (winner || hasDraw) ? (<GameOver winner={winner} onRestart={handleRestart} />) : null;



        return (
                <main>
                        <div id="game-container">
                                <ol id="players" className="highlight-player">
                                        <Player initialName={PLAYERS.X} symbol={"X"} isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
                                        <Player initialName={PLAYERS.O} symbol={"O"} isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
                                </ol>
                                {/*  JSX does not support the traditional if (condition) {}else{} statement
                                      It supports ternary operator or the inline && as shown below
                                      (winner || hasDraw) can be T/F so the expression below means T/F && some-expression
                                      If (winner || hasDraw) is  true, then some-expression will get evaluated and the component will be rendered
                                      If its false, then some-expression will not be evaludated
                                      */}
                                {/* {(winner || hasDraw) && <GameOver winner={winner} />} */}

                                {/* this approach of conditonally rendering works as its ternary operator */}
                                {/* { (winner || hasDraw) ? <GameOver winner={winner} /> : null} */}

                                {winningMsg}
                                {<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />}
                        </div>
                        <Log turns={gameTurns} />
                </main>
        )
}

export default App;
