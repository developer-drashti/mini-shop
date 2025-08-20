import { useState, useEffect } from "react";

const EmptyUser = {
  userName: "",
  password: "",
  name: "",
  email: "",
  role: "User",
};

const UserForm = ({ onSubmit, editingUser, onCancel }) => {
  const [formData, setFormData] = useState({ ...EmptyUser });
  const [errors, setErrors] = useState({});

  // Load editing user into form
  useEffect(() => {
    if (editingUser) {
      setFormData({
        userName: editingUser.userName || "",
        password: editingUser.password || "",
        name: editingUser.name || "",
        email: editingUser.email || "",
        role: editingUser.role || "User",
      });
      setErrors({});
    } else {
      setFormData({ ...EmptyUser });
      setErrors({});
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.userName || !formData.userName.trim())
      newErrors.userName = "Username is required";
    if (!formData.name || !formData.name.trim())
      newErrors.name = "Name is required";
    if (!formData.email || !formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    const password = formData.password || "";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    else if (!/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
      newErrors.password =
        "Password must include at least 1 number and 1 symbol";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    setFormData(EmptyUser);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
        margin: "20px 0",
        background: "#f1f1f1",
      }}
    >
      <h3>{editingUser ? "Edit User" : "Add User"}</h3>
      <div style={{ marginRight: "17px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            placeholder="UserName"
            value={formData.userName}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {errors.userName && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {errors.userName}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {errors.password && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {errors.password}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {errors.name && (
            <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {errors.email && (
            <div style={{ color: "red", fontSize: "12px" }}>{errors.email}</div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Role:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
          }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="submit"
          style={{
            padding: "8px 12px",
            borderRadius: "5px",
            border: "1px solid #333",
            background: "#000",
            color: "#fff",
          }}
        >
          {editingUser ? "Update" : "Add"}
        </button>
        {editingUser && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              border: "1px solid #333",
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
