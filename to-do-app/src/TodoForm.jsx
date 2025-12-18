import { useEffect, useState } from "react";
import { addTodo, updateTodo } from "./api";

function TodoForm({ selectedTodo, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setContent(selectedTodo.content);
      setPriority(selectedTodo.priority);
    }
  }, [selectedTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todoData = { title, content, priority };

    if (selectedTodo) {
      await updateTodo(selectedTodo._id, todoData);
    } else {
      await addTodo(todoData);
    }

    setTitle("");
    setContent("");
    setPriority("Medium");

    onSave(); 
  };

  return (
    <div className="card mb-4 todo-form">
      <div className="card-body">
        <h4 className="card-title text-center mb-3">
          {selectedTodo ? "Edit Todo" : "Add Todo"}
        </h4>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2 bg-danger-subtle"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control mb-2 bg-danger-subtle"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <select
            className="form-select mb-3 bg-danger-subtle"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button className="btn btn-info w-25 d-block mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle me-2" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
            {selectedTodo ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;
