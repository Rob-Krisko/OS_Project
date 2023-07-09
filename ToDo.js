import { useState } from 'react';

function ToDo() {

    const [todos, setTodos] = useState([]);
    const [newItem, setNewItem] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        setTodos(currentTodos => {
            return[
                ...currentTodos,
                { id: 1, title: newItem, completed: false }
            ]
        });

        setNewItem('');
    }

    function toggleTodo(id, completed) {
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                if (todo.id === id) {
                    return {...todo, completed};
                }
                return todo;
            })
        })
    }

    function deleteTodo(id) {
        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== id);
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)} />
            </form>
            <ul>
                {todos.map(todo => {
                    return (
                        <li key={todo.id}>
                            <label>
                                <input type="checkbox" checked={todo.completed}
                                onChange = {(e) => toggleTodo(todo.id, e.target.checked)} />
                                {todo.title}
                                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                            </label>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default ToDo;