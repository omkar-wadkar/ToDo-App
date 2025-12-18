import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <header className="d-flex flex-wrap align-items-center py-3 mb-4 border-bottom head">
        
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span className="fs-4 ms-3 head">To-Do App</span>
        </a>

        {isLoggedIn && (
          <div className="me-3">
            <button
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </header>
    </nav>
  );
}

export default Header;
