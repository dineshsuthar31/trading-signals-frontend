import { useState } from "react";
import { signupApi, loginApi } from "../api/auth";
import { setToken } from "../utils/storage";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      await signupApi({ email, password });

      // auto login after signup
      const data = await loginApi({ email, password });
      setToken(data.access_token);

      navigate("/dashboard");
    } catch (err) {
      setMsg(err?.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2>Create Account</h2>
        <p>Signup to start using signals</p>

        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: 10 }}>
            <label>Email</label>
            <input
              style={{ width: "100%", padding: 10 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@gmail.com"
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>Password</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Test@123"
            />
          </div>

          <button className="btn" disabled={loading}>
            {loading ? "Creating..." : "Signup"}
          </button>
        </form>

        {msg && <p className="error-text">{msg}</p>}

        <p style={{ marginTop: 10 }}>
          Already have account? <Link className="link" to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
