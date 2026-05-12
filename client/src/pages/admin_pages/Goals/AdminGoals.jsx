import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminGoals.css";
import AdminSidebar from "../../../admin_components/AdminSidebar/AdminSidebar";

function AdminGoals() {
  const [goals, setGoals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/goals");
      setGoals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = goals.filter((g) =>
    g.title?.toLowerCase().includes(search.toLowerCase())
  );

  const deleteGoal = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/goals/${id}`);
      setGoals(goals.filter((g) => g._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Content */}
      <div className="goals-page">

        <h1 className="title"> Goals Management</h1>

        {/* Search */}
        <input
          className="search"
          placeholder="Search goals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Table */}
        <div className="table">

          <div className="row header">
            <span>Title</span>
            <span>Description</span>
            <span>Target</span>
            <span>Actions</span>
          </div>

          {filtered.length === 0 ? (
            <p style={{ padding: "20px" }}>No goals found</p>
          ) : (
            filtered.map((goal) => (
              <div className="row" key={goal._id}>

                <span>{goal.title}</span>
                <span>{goal.description}</span>
                <span>{goal.target}</span>

                <div className="actions">
                  <button className="edit-btn">Edit</button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteGoal(goal._id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminGoals;