import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/users"; // JSON Server URL

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}?username=${username}&role=admin`);
      const data = await res.json();

      if (data.length === 0) {
        setError("Admin user not found");
        return;
      }
    
      if (data[0].password === password) {
        sessionStorage.setItem(
          "admin_session",
          JSON.stringify({ id: data[0].id, username: data[0].username })
        );
        navigate("/admin/dashboard");
      } else {
        setError("Incorrect password");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to login");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "40px 16px",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "24px",
        }}
      >
        Admin Login
      </h1>

      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        {error && (
          <div style={{ color: "#dc2626", fontSize: "14px" }}>{error}</div>
        )}

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: "14px", marginBottom: "4px" }}>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              borderRadius: "12px",
              border: "1px solid #ccc",
              padding: "8px 12px",
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: "14px", marginBottom: "4px" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              borderRadius: "12px",
              border: "1px solid #ccc",
              padding: "8px 12px",
              fontSize: "14px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px 16px",
            borderRadius: "12px",
            backgroundColor: "#000",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            border: "none",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
