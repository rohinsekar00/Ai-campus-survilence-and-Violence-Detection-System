import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Login.css";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (email && password) {
      // Dummy signup success
      navigate("/"); // ✅ BACK TO LOGIN
    }
  };

  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={handleSignup}>
        <h1>Create Account</h1>
        <p>AI Campus Guard</p>

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

        <button type="submit">Sign Up</button>

        <p className="link" onClick={() => navigate("/")}>
          Back to Login
        </p>
      </form>
    </div>
  );
}
