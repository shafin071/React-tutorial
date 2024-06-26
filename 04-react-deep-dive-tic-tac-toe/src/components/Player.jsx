import { useState } from "react";


export default function Player({ initialName, symbol, isActive, onChangeName }) {
        const [playerName, setPlayerName] = useState(initialName);  //initial value is initialName
        const [isEditing, setIsEditing] = useState(false);  //initial value is false

        function handleEditClick() {
                // editing is isEditing passed into setIsEditing
                // REACT BEST PRACTICE:
                // When updating your state based on the previous value of that state, you should pass a function
                // to that state updating function instead of that new state value you want to have.
                // Why? Remember setIsEditing is a scheduled function to update the state
                // We want setIsEditing to have the LATEST state of isEditing at the time of the execution
                // Having setIsEditing(!editing) will give setIsEditing the version of isEditing at the time this line is read by React
                // which may become an older version by the time function is executed

                // EXAMPLE:
                // setIsEditing(!editing)  // isEditing changed from false to true
                // setIsEditing(!editing)  // also isEditing changed from false to true because when this line is read, state han't updated yet

                // setIsEditing((editing) => !editing);  // isEditing changed from false to true
                // setIsEditing((editing) => !editing);  // isEditing changed from true to false. So when the 2nd setIsEditing executes, it has the latest isEditing

                setIsEditing((editing) => !editing);  // causes React to re-execute the component
                if (isEditing) {
                        onChangeName(symbol, playerName);
                }  
        }

        function handleChange(event) {
                setPlayerName(event.target.value);
        }

        let editablePlayerName = (<span className="player-name">{playerName}</span>);

        if (isEditing) {
                // value={playerName} onChange={handleChange} is called 2-WAY-BINDING
                // because we're getting a value out of this input and we're feeding a value back into this input.
                editablePlayerName = (<input type='text' required value={playerName} onChange={handleChange}></input>);
        };

        return (
                <li className={isActive ? 'active' : undefined}>
                        <span className="player">
                                {editablePlayerName}
                                <span className="player-symbol">{symbol}</span>
                        </span>
                        {/* onClick={() => handleEditClick()} and onClick={handleEditClick}  does the same thing*/}
                        <button onClick={handleEditClick}>{(isEditing) ? 'Save' : 'Edit'}</button>
                </li>
        )
}