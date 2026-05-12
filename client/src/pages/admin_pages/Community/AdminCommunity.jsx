import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../../admin_components/AdminSidebar/AdminSidebar";

function AdminCommunity() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/community");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:5000/api/community/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchPosts();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="admin-layout" style={{ backgroundColor: "#111", color: "#fff" }}>
      <AdminSidebar />

      <div style={{ flex: 1, padding: "30px" }}>
        <h1 style={{ color: "#B5F23D", borderBottom: "2px solid #333", paddingBottom: "10px", marginBottom: "20px" }}>
           Community Moderation
        </h1>

        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr" }}>
          {posts.map((post) => (
            <div key={post._id} style={{ backgroundColor: "#222", padding: "20px", borderRadius: "8px", border: "1px solid #333", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: `2px solid ${post.color}`, color: post.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                    {post.initials}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "16px" }}>{post.name}</h3>
                    <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>{post.plan} • {new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <p style={{ margin: "10px 0", fontSize: "14px", lineHeight: "1.5", color: "#ccc" }}>{post.content}</p>
                <span style={{ fontSize: "12px", color: "#B5F23D" }}>{post.likes} Likes</span>
              </div>

              <div style={{ marginLeft: "20px" }}>
                <button 
                  onClick={() => deletePost(post._id)}
                  style={{ background: "#ff3333", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
                >
                  Delete Post
                </button>
              </div>

            </div>
          ))}

          {posts.length === 0 && (
            <p style={{ color: "#888" }}>No community posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminCommunity;
