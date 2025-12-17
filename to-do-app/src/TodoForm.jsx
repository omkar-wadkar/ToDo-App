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
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">
          {selectedTodo ? "Edit Todo" : "Add Todo"}
        </h5>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control mb-2"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <select
            className="form-select mb-3"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button className="btn btn-primary w-100">
            {selectedTodo ? "Update Todo" : "Save Todo"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;
