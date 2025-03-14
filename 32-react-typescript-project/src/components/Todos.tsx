import React from 'react';

import Todo from '../models/todo';
import TodoItem from './TodoItem';
import classes from './Todos.module.css';

// this is the react + ts way to declaring a functional component
// React.FC is a FunctionComponent type defined in react package.
// <{ items: Todo[] }> we are explicitly declaring the type of property that will be passed in with props.
// NOTE: ToDo is a class which we are using as the type alias (see intro code).
// This means the object will have an items key and the value will be a list of ToDo objects.

// Its done this way because its cumbersome to typecast the props object, since props also has the children property
// and we don't really know what the type is for children.
// Cool thing about defining the type is that now you get autocomplete for props object.

const Todos: React.FC<{ items: Todo[], onRemoveTodo: (text: string) => void  }> = (props) => {
        return (
                <ul className={classes.todos}>
                        {props.items.map((item) => (
                                <TodoItem todo={item} onRemoveTodo={props.onRemoveTodo}/>
                        ))}
                </ul>
        );
};

export default Todos;