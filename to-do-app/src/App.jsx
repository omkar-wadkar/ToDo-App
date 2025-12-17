import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { getTodos } from "./api";
import Header from "./Header";

function App() {
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="container mt-4">
      <TodoForm onTodoAdded={loadTodos} />
      <TodoList
        todos={todos}
        onTodoDeleted={loadTodos}
      />
    </div>
  );
}

export default App;
