import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { getTodos, deleteTodo } from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const loadTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
    setSelectedTodo(null); 
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="container mt-4">
      <TodoForm
        selectedTodo={selectedTodo}
        onSave={loadTodos}
      />

      <TodoList
        todos={todos}
        onEdit={setSelectedTodo}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
