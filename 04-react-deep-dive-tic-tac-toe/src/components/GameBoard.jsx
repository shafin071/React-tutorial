
export default function GameBoard({ onSelectSquare, board }) {
        // onSelectSquare is the handleSelectSquare in App.jsx
        // turns is the gameTurns state in App.jsx



        // The following code is deprecated but kept for explanation purposes
        // // It's also strongly recommended that if your state is an object or array, you update that state
        // // in an immutable way, which simply means you create a copy of the old state, so a new object or a new array first,
        // // and you then just change that copy instead of that existing object or array. And the reason for that recommendation
        // // is that if your state is an object or array you are dealing with a reference value in JavaScript.
        // // And therefore if you would be updating it like this you would be updating the old value in-memory immediately,
        // // even before this scheduled state update was executed by React. And this can again lead to strange bugs or side effects
        
        // function handleSelectSquare(rowIndex, colIndex) {
        //         setGameBoard((prevGameBoard) => {
        //                 // const updatedBoard = prevGameBoard OR const updatedGameBoard = [...preGameBoard] won't work
        //                 // creates a shallow copy of the gameBoard. The outer array is copied, 
        //                 // but the inner arrays are still references to the same arrays as in the original gameBoard. 
        //                 // This means that if you make changes to updatedGameBoard, the corresponding inner arrays will still be shared with the original gameBoard. 
        //                 // If you modify the inner arrays in updatedGameBoard, it will also affect the inner arrays in the original gameBoard.
        //                 // Hence, we must make a deep copy of the array object
        //                 const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
        //                 console.log("activePlayerSymbol: ", activePlayerSymbol);
        //                 updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
        //                 console.log("updatedBoard: ", updatedBoard);
        //                 return updatedBoard;
        //         });
        //         onSelectSquare();
        // }

        return (
                <ol id="game-board">
                        {board.map(
                                (row, rowIndex) =>
                                        <li key={rowIndex}>
                                                <ol>
                                                        {row.map(
                                                                (playerSymbol, colIndex) =>
                                                                        <li key={colIndex}>
                                                                                <button onClick={() => onSelectSquare(rowIndex, colIndex)}
                                                                                        disabled={playerSymbol !== null}>
                                                                                        {playerSymbol}
                                                                                </button>
                                                                        </li>)
                                                        }
                                                </ol>
                                        </li>
                        )}
                </ol >
        )
}

