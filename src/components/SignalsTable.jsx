export default function SignalsTable({ signals = [] }) {
  return (
    <div className="signals-table-wrap">
      <div className="signals-table-head">
        <h3 className="signals-title">Latest Signals</h3>
        <span className="signals-count">Showing {signals.length} signals</span>
      </div>

      <div className="signals-table-card">
        <table className="signals-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Signal</th>
              <th>Entry</th>
              <th>SL</th>
              <th>Target</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {signals.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No signals available
                </td>
              </tr>
            ) : (
              signals.map((s, i) => (
                <tr key={i}>
                  <td className="symbol">{s.symbol}</td>

                  {/* FIX: backend sends action not signal */}
                  <td>
                    <span
                      className={`signal-pill ${
                        (s.action || "").toUpperCase() === "BUY"
                          ? "buy"
                          : "sell"
                      }`}
                    >
                      {s.action || s.signal || "-"}
                    </span>
                  </td>

                  <td>{s.entry}</td>
                  <td>{s.sl}</td>
                  <td>{s.target}</td>
                  <td className="time">{s.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
