
// this is how you create a class in TS
// you have to state the class attributes first and then do the constructor
class Todo {
        id: string;
        text: string;

        constructor(todoText: string) {
                this.text = todoText;
                this.id = new Date().toISOString();
        }
}

export default Todo;