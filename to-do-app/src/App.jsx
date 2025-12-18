import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Header from "./Header";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

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

  const TodoApp = () => (
    <>
      <Header />
      <div className="container mt-4">
        <TodoForm
          selectedTodo={selectedTodo}
          onSave={loadTodos}
        />

        <TodoList
          todos={todos}
          onEdit={setSelectedTodo}
          onDelete={handleDelete}
          onRefresh={loadTodos}
        />
      </div>
    </>
  );

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TodoApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
