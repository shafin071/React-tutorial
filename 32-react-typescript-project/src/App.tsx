import { useState } from 'react';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo';
// import TodosContextProvider from './store/todos-context';


function App() {
        // When initiating state, the type of the state data should be defined.
        // useState out of the box is a generic function so we can define the type of data we want to store in this state.
        const [todos, setTodos] = useState<Todo[]>([]);

        console.log("todos: ", todos);

        const addTodoHandler = (todoText: string) => {
                const newTodo = new Todo(todoText);

                setTodos((prevTodos) => {
                        return prevTodos.concat(newTodo);
                });
        };

        const removeTodoHandler = (todoId: string) => {
                setTodos((prevTodos) => {
                        return prevTodos.filter((todo) => todo.id !=todoId)
                });
        }

        return (
                <div>
                        <NewTodo onAddTodo={addTodoHandler} />
                        <Todos items={todos} onRemoveTodo={removeTodoHandler} />
                        {/* <Todos items='something' />  this gives an error now that  Todos knows what the items type is */}
                </div>
        );
}

// This app version is with contextAPI but I'll keep the non-conextAPI version because we can see the TS in action better.
// function App() {
//         return (
//                 <TodosContextProvider>
//                         <NewTodo />
//                         <Todos />
//                 </TodosContextProvider>
//         );
// }

export default App;


