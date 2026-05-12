import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Community.css';

function Community() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ name: '', plan: '', content: '' });

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.content) return;
    try {
      await axios.post("http://localhost:5000/api/community", form);
      setForm({ name: '', plan: '', content: '' });
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/community/${id}/like`);
      fetchPosts(); // Refresh likes
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="community-page">
      <div className="community-container">
        {/* Header Section */}
        <header className="community-header">
          <div className="header-left">
            <p className="section-label">9 — COMMUNITY</p>
            <h1 className="heavy-heading">TRAIN <br /> TOGETHER</h1>
          </div>
          <div className="header-right">
            <p className="community-stat">
              Join thousands of members sharing progress, tips, and motivation every single day.
            </p>
          </div>
        </header>

        {/* Create Post Section */}
        <div className="create-post-section" style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', marginBottom: '40px', border: '1px solid #333' }}>
          <h3 style={{ color: '#B5F23D', marginBottom: '15px' }}>Share Your Progress</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name *" 
                value={form.name} 
                onChange={handleChange} 
                required 
                style={{ flex: 1, padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
              />
              <input 
                type="text" 
                name="plan" 
                placeholder="Current Program (Optional)" 
                value={form.plan} 
                onChange={handleChange} 
                style={{ flex: 1, padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
              />
            </div>
            <textarea 
              name="content" 
              placeholder="What's on your mind? Did you hit a PR? *" 
              value={form.content} 
              onChange={handleChange} 
              required 
              rows="3"
              style={{ padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
            />
            <button type="submit" style={{ padding: '10px 20px', background: '#B5F23D', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', alignSelf: 'flex-start' }}>
              POST UPDATE
            </button>
          </form>
        </div>

        {/* Community Feed Grid */}
        <div className="feed-grid">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                <div 
                  className="avatar" 
                  style={{ border: `2px solid ${post.color}`, color: post.color }}
                >
                  {post.initials}
                </div>
                <div className="user-info">
                  <h4 className="user-name">{post.name}</h4>
                  <p className="user-plan">{post.plan}</p>
                </div>
              </div>
              
              <div className="post-content">
                <p>{post.content}</p>
              </div>

              <div className="post-footer">
                <span className="stat" onClick={() => handleLike(post._id)} style={{ cursor: 'pointer', color: '#B5F23D' }}>
                  <strong>{post.likes}</strong> ❤️ Likes
                </span>
                <span className="stat" style={{ color: '#888' }}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
          {posts.length === 0 && <p style={{ color: '#888', textAlign: 'center', width: '100%' }}>No posts yet. Be the first to share!</p>}
        </div>
      </div>
    </div>
  );
}

export default Community;