import { useEffect, useState } from "react";
import { meApi } from "../api/auth";
import { billingStatusApi, createCheckoutApi } from "../api/billing";
import { getSignalsApi } from "../api/signals";
import { clearToken } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import SignalsTable from "../components/SignalsTable";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [paid, setPaid] = useState(false);
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const loadAll = async () => {
    setLoading(true);
    setMsg("");

    try {
      const me = await meApi();
      setUser(me);

      const bill = await billingStatusApi();
      setPaid(bill.is_paid);

      const sig = await getSignalsApi();
      setSignals(sig.signals || []);
    } catch (err) {
      setMsg(err?.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const logout = () => {
    clearToken();
    navigate("/");
  };

  const subscribe = async () => {
    try {
      const data = await createCheckoutApi();
      window.location.href = data.checkout_url;
    } catch (err) {
      alert(err?.response?.data?.detail || "Checkout failed");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-wrap">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-title">Trading Signals Dashboard</h2>
            <p className="dashboard-subtitle">
              Welcome back! Check your subscription status & latest signals.
            </p>
          </div>

          <div className="dashboard-actions">
            <span className={`badge ${paid ? "badge-paid" : "badge-free"}`}>
              {paid ? "PAID USER" : "FREE USER"}
            </span>

            {!paid && (
              <button onClick={subscribe} className="btn btn-inline">
                Subscribe ₹499
              </button>
            )}

            <button className="btn btn-inline btn-ghost" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      {loading ? (
        <div className="card">
          <div className="card-body">
            <p className="small-muted">Loading dashboard...</p>
          </div>
        </div>
      ) : (
        <>
          {/* User Info */}
          <div className="card">
            <div className="card-head">
              <div className="card-title">Account Info</div>
            </div>

            <div className="card-body">
              <p className="info-line">
                <span className="info-label">Email:</span>
                <span className="info-value">{user?.email}</span>
              </p>

              <p className="info-line">
                <span className="info-label">Plan:</span>
                <span className="info-value">
                  {paid ? "Premium (Unlocked)" : "Free (Limited)"}
                </span>
              </p>

              {!paid && (
                <p className="small-muted" style={{ marginTop: 8 }}>
                  Free users can see limited signals. Upgrade to unlock all.
                </p>
              )}
            </div>
          </div>

          {/* Signals Table */}
          <div className="card" style={{ marginTop: 16 }}>
            <div className="card-head">
              <div className="card-title">Latest Signals</div>
              <div className="small-muted">
                Showing {signals?.length || 0} signals
              </div>
            </div>

            <div className="card-body">
              <SignalsTable signals={signals} />
            </div>
          </div>
        </>
      )}

      {/* Error Message */}
      {msg && <p className="error-text">{msg}</p>}
    </div>
  );
}
