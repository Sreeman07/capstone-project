import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminProfile() {
  const [users, setUsers] = useState([]);
  const [authors, setAuthors] = useState([]);

  // fetch users
  const getUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin-api/users",
        { withCredentials: true }
      );
      setUsers(res.data.payload);
    } catch (err) {
      console.log(err);
    }
  };

  // fetch authors
  const getAuthors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin-api/authors",
        { withCredentials: true }
      );
      setAuthors(res.data.payload);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
    getAuthors();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Users</h3>
      {users.map((u) => (
        <p key={u._id}>{u.email}</p>
      ))}

      <h3>Authors</h3>
      {authors.map((a) => (
        <p key={a._id}>{a.email}</p>
      ))}
    </div>
  );
}

export default AdminProfile;