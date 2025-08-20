import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("admin_session");
    navigate("/admin");
  };

  return (
    <nav
      style={{
        background: "linear-gradient(to right, #1f2937, #111827, #000000)",
        color: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link
            to="/admin/dashboard"
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#fff",
              backgroundColor: "transparent",
              transition: "background-color 0.2s",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              Admin Panel
            </span>
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              backgroundColor: "#dc2626",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#b91c1c")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc2626")}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
