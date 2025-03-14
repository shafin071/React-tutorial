import { useRef } from 'react';

import classes from './NewTodo.module.css';

// <{onAddTodo: (text: string) => void }> This is NOT anarrow function.
// this means the passed in prop will be a function of generic type.
// Recall: in TS you can also define function types.
// We are defining the generic type to be a function that takes string as input and doesn't return anything.
const NewTodo: React.FC<{ onAddTodo: (text: string) => void }> = (props) => {

        // Recall <> means generic type
        // HTMLInputElement is the built-in type for HTML element
        // You can find the HTML element type by looking up the element in MDN and looking at the Attribute section.
        // With TS we have to assign an inital value null to useRef, otherwise TS will show error.
        // Not providing an initial value means its undefined and TS doesn't like it.
        const todoTextInputRef = useRef<HTMLInputElement>(null);

        // React.FormEvent is the React form event object type
        // You can find the event obj type by googling typescript react form event type
        // If you assign the wrong kind of event, TS shows error hinting at the right type of object.
        const submitHandler = (event: React.FormEvent) => {
                event.preventDefault();

                // Notice the ! mark in current. These are called TS annotations.
                // Question mark (?) is used to denote optional properties or parameters.
                // Exclamation mark (!) is used to denote the property will defintely not be null when its evaluated.
                // Since we initiate todoTextInputRef as null, TS is not sure if todoTextInputRef will have a value by the time its executed.
                // Hence TS will automatically atthe ? after current. But since we are sure that todoTextInputRef will have a value
                // we can assign the !
                const enteredText = todoTextInputRef.current!.value;

                if (enteredText.trim().length === 0) {
                        // throw an error
                        return;
                }

                props.onAddTodo(enteredText);
        };

        return (
                <form onSubmit={submitHandler} className={classes.form}>
                        <label htmlFor='text'>Todo text</label>
                        <input type='text' id='text' ref={todoTextInputRef} />
                        <button>Add Todo</button>
                </form>
        );
};

export default NewTodo;