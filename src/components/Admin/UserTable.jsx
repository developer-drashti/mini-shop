const API_URL = "http://localhost:5000/users"; // your JSON Server URL

const HeadCellStyle = {
  padding: "8px",
  border: "1px solid #ccc",
};

const TableCellStyle = {
  padding: "8px",
  border: "1px solid #ccc",
  textAlign: "center",
};

const UserTable = ({ users, onEdit, onDelete }) => {
  const handleDelete = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        const res = await fetch(`${API_URL}/${user.id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete");
        onDelete(user.id);
      } catch (err) {
        alert("Error deleting user: " + err.message);
      }
    }
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={HeadCellStyle}>ID</th>
            <th style={HeadCellStyle}>Username</th>
            <th style={HeadCellStyle}>Name</th>
            <th style={HeadCellStyle}>Email</th>
            <th style={HeadCellStyle}>Role</th>
            <th style={HeadCellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td style={TableCellStyle}>{index + 1}</td>
              <td style={TableCellStyle}>{user.userName}</td>
              <td style={TableCellStyle}>{user.name}</td>
              <td style={TableCellStyle}>{user.email}</td>
              <td style={TableCellStyle}>{user.role}</td>
              <td style={TableCellStyle}>
                <button
                  style={{ marginRight: "8px" }}
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
