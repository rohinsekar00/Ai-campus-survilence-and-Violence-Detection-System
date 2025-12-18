import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary dummy auth
    if (email && password) {
      navigate("/surveillance"); // ✅ DIRECT CCTV PAGE
    }
  };

  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={handleLogin}>
        <h1>AI Campus Guard</h1>
        <p>Welcome to Campus Surveillance</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p className="link" onClick={() => navigate("/signup")}>
          Create new account
        </p>
      </form>
    </div>
  );
}
