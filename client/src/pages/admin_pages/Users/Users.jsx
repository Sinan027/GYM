import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";
import AdminSidebar from "../../../admin_components/AdminSidebar/AdminSidebar";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState("users");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchBookings();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Fetch bookings error:", err);
    }
  };

  const handleAcceptBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}`, 
        { status: "Confirmed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update local state
      setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: "Confirmed" } : b));
    } catch (err) {
      console.error(err);
      alert("Failed to confirm booking");
    }
  };

  const handleRemoveBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to remove this trainer request?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(prev => prev.filter(b => b._id !== bookingId));
    } catch (err) {
      console.error(err);
      alert("Failed to remove booking");
    }
  };

  const filtered = users.filter(
    (u) =>
      u.username?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRole = async (user) => {
    const role = user.role === "admin" ? "user" : "admin";
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, role } : u))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to toggle role");
    }
  };

  const toggleBlock = async (user) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${user._id}/block`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, isBlocked: !user.isBlocked } : u
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to toggle block status");
    }
  };

  const removeUser = async (user) => {
    if (user.role === "admin") return alert("Cannot remove an admin.");
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${user._id}/remove`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers((prev) => prev.map((u) => u._id === user._id ? { ...u, isDeleted: true } : u));
    } catch (err) {
      console.error(err);
      alert("Failed to remove user");
    }
  };

  const restoreUser = async (user) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${user._id}/restore`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers((prev) => prev.map((u) => u._id === user._id ? { ...u, isDeleted: false } : u));
    } catch (err) {
      console.error(err);
      alert("Failed to restore user");
    }
  };

  const hardDeleteUser = async (user) => {
    if (!window.confirm("Are you sure you want to permanently delete this user? This cannot be undone.")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${user._id}/hard-delete`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
    } catch (err) {
      console.error(err);
      alert("Failed to permanently delete user");
    }
  };

  return (
    <div className="admin-layout">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <div className="users-page">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1> Users Management</h1>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setActiveTab("users")}
                style={{ padding: '10px 20px', background: activeTab === 'users' ? '#38bdf8' : '#333', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '4px' }}
              >
                Active Users
              </button>
              <button 
                onClick={() => setActiveTab("restore")}
                style={{ padding: '10px 20px', background: activeTab === 'restore' ? '#FF9F43' : '#333', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '4px' }}
              >
                Restore List
              </button>
              <button 
                onClick={() => setActiveTab("bookings")}
                style={{ padding: '10px 20px', background: activeTab === 'bookings' ? '#B5F23D' : '#333', border: 'none', color: activeTab === 'bookings' ? '#000' : '#fff', cursor: 'pointer', borderRadius: '4px' }}
              >
                Trainer Requests
              </button>
            </div>
          </div>

          {activeTab === "users" ? (
            <>
              <input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search"
              />

              <div className="table">
                <div className="row header">
                  <span>Name</span>
                  <span>Email</span>
                  <span>Role</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>

                {filtered.filter(u => !u.isDeleted).length === 0 ? (
                  <p style={{ padding: "20px" }}>No active users found</p>
                ) : (
                  filtered.filter(u => !u.isDeleted).map((user) => (
                    <div className="row" key={user._id}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {user.profileImage ? (
                          <img src={user.profileImage} alt="avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#333', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#B5F23D', fontWeight: 'bold' }}>
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                        )}
                        {user.username}
                      </span>
                      <span>{user.email}</span>

                      <span style={{ fontWeight: 'bold', color: user.role === 'admin' ? '#FF4D4D' : '#B5F23D' }}>
                        {user.role}
                      </span>

                      <span className={user.isBlocked ? "blocked" : "active"}>
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>

                      <div className="actions" style={{ gap: '5px' }}>
                        <button onClick={() => toggleRole(user)} style={{ padding: '5px', fontSize: '0.8rem' }}>
                          Role
                        </button>

                        <button onClick={() => toggleBlock(user)} style={{ padding: '5px', fontSize: '0.8rem' }}>
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                        
                        {user.role !== "admin" && (
                          <button onClick={() => removeUser(user)} style={{ padding: '5px', fontSize: '0.8rem', background: '#FF4D4D', color: '#fff', border: 'none' }}>
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : activeTab === "restore" ? (
            <>
              <div className="table">
                <div className="row header">
                  <span>Name</span>
                  <span>Email</span>
                  <span>Role</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>

                {filtered.filter(u => u.isDeleted).length === 0 ? (
                  <p style={{ padding: "20px" }}>No deleted users found</p>
                ) : (
                  filtered.filter(u => u.isDeleted).map((user) => (
                    <div className="row" key={user._id}>
                      <span>{user.username}</span>
                      <span>{user.email}</span>
                      
                      <span style={{ fontWeight: 'bold', color: user.role === 'admin' ? '#FF4D4D' : '#B5F23D' }}>
                        {user.role}
                      </span>

                      <span style={{ color: '#FF9F43' }}>Removed</span>

                      <div className="actions" style={{ gap: '10px' }}>
                        <button onClick={() => restoreUser(user)} style={{ padding: '5px 15px', background: '#38bdf8', color: '#fff', border: 'none', borderRadius: '4px' }}>
                          Restore User
                        </button>
                        <button onClick={() => hardDeleteUser(user)} style={{ padding: '5px 15px', background: '#FF4D4D', color: '#fff', border: 'none', borderRadius: '4px' }}>
                          Permanently Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <>
              <div className="table">
                <div className="row header">
                  <span>User</span>
                  <span>Trainer Requested</span>
                  <span>Date Requested</span>
                  <span>Status</span>
                  <span>Action</span>
                </div>

                {bookings.length === 0 ? (
                  <p style={{ padding: "20px" }}>No trainer requests found</p>
                ) : (
                  bookings.map((booking) => (
                    <div className="row" key={booking._id}>
                      <span>{booking.user?.name || booking.user?.email || "Unknown User"}</span>
                      <span>{booking.trainer?.name || "Unknown Trainer"}</span>
                      <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
                      
                      <span style={{ color: booking.status === "Confirmed" ? '#B5F23D' : '#FF9F43', fontWeight: 'bold' }}>
                        {booking.status}
                      </span>

                      <div className="actions" style={{ gap: '10px' }}>
                        {booking.status === "Pending" ? (
                          <>
                            <button 
                              onClick={() => handleAcceptBooking(booking._id)}
                              style={{ background: '#B5F23D', color: '#000', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => handleRemoveBooking(booking._id)}
                              style={{ background: '#FF4D4D', color: '#fff', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                              Remove
                            </button>
                          </>
                        ) : (
                          <>
                            <span style={{ color: '#888' }}>Accepted</span>
                            <button 
                              onClick={() => handleRemoveBooking(booking._id)}
                              style={{ background: '#FF4D4D', color: '#fff', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                              Remove
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;