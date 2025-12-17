import { useState } from "react";
import { addTodo } from "./api";

function TodoForm({ onTodoAdded }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addTodo({ title, content, priority });

    setTitle("");
    setContent("");
    setPriority("Medium");

    onTodoAdded(); 
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Add Todo</h5>

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

          <button className="btn btn-primary w-25 mx-auto">Save Todo</button>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;
