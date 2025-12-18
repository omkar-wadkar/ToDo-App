import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "./api";
import Header from "./Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <>
    <Header />
    <div className="container mt-5 col-md-4">
      <h3 className="text-center mb-4">Login</h3>

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <p className="text-center mt-3">
        Don’t have an account?{" "}
        <Link to="/register">Register here</Link>
      </p>
    </div>
    </>
  );
}

export default Login;
