import { useState } from "react";
import API from "./api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    await API.post("/api/auth/register", {
      name,
      email,
      password,
    });

    window.location.href = "/login";
  };

  return (
    <div className="container mt-5 col-md-4">
        
                <h3 className="text-center">Register</h3>
                <form onSubmit={handleRegister}>
                    <input
                    className="form-control mb-2"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    />

                    <input
                    className="form-control mb-2"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn btn-success w-100">
                    Register
                    </button>
                </form>
            </div>  
       
  );
}

export default Register;
