import { useState } from "react";
import { loginApi } from "../api/auth";
import { setToken } from "../utils/storage";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMsg("");
        setLoading(true);

        try {
            const data = await loginApi({ email, password });
            setToken(data.access_token);
            navigate("/dashboard");
        } catch (err) {
            setMsg(err?.response?.data?.detail || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
            <h2>Trading Signals SaaS</h2>

            <form onSubmit={handleLogin}>
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
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            <p style={{ marginTop: 10 }}>
                New user? <Link className="link" to="/signup">Create account</Link>
            </p>

        </div>
            { msg && <p className="error-text">{msg}</p> }
        </div >
    );
}
