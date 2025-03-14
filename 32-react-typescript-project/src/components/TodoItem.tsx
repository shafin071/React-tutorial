import classes from './TodoItem.module.css';
import Todo from '../models/todo';


const TodoItem: React.FC<{ todo: Todo,  onRemoveTodo: (text: string) => void }> = (props) => {

        const RemoveItemHandler = (event: React.MouseEvent) =>{
                event.preventDefault();
                props.onRemoveTodo(props.todo.id);
        }

        return <li key={props.todo?.id} className={classes.item} onClick={RemoveItemHandler}>{props.todo?.text}</li>;
        };

        export default TodoItem;