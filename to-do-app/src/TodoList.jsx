function TodoList({ todos, onEdit, onDelete }) {
  return (
    <div className="row">
      {todos.map((todo) => (
        <div className="col-md-6 mb-3" key={todo._id}>
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{todo.title}</h5>
              <p className="card-text">{todo.content}</p>

              <span
                className={`badge me-2 ${
                  todo.priority === "High"
                    ? "bg-danger"
                    : todo.priority === "Medium"
                    ? "bg-warning text-dark"
                    : "bg-success"
                }`}
              >
                {todo.priority}
              </span>

              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => onEdit(todo)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDelete(todo._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
