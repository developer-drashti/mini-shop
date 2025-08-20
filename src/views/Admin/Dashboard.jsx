import { useState, useEffect } from "react";
import UserTable from "../../components/Admin/UserTable";
import UserForm from "../../components/Admin/UserForm";
import axios from "axios";

const API_URL = "http://localhost:5000/users";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Load users from JSON server
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add or update user
  const handleSaveUser = async (userData) => {
    try {
      if (editingUser) {
        await axios.put(`${API_URL}/${editingUser.id}`, userData);
      } else {
        await axios.post(API_URL, userData);
      }
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Failed to save user:", err);
    }
  };

  // Edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  // Delete user
  const handleDeleteUser = async (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${API_URL}/${user.id}`);
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  // Apply search + filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          background: "#f9f9f9",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <UserTable
        users={filteredUsers}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      <UserForm
        onSubmit={handleSaveUser}
        editingUser={editingUser}
        onCancel={handleCancelEdit}
      />
    </div>
  );
};

export default AdminDashboard;
