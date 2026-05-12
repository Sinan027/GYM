import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminBlog.css";

import AdminSidebar from "../../../admin_components/AdminSidebar/AdminSidebar";

function AdminBlog() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //  CREATE BLOG
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) {
      formData.append("image", file);
    } else if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }
    if (videoUrl) {
      formData.append("videoUrl", videoUrl);
    }

    try {
      await axios.post("http://localhost:5000/api/blogs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTitle("");
      setContent("");
      setFile(null);
      setImageUrl("");
      setVideoUrl("");
      fetchBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  //  DELETE BLOG
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-blog-page" style={{ flex: 1 }}>
        <div className="admin-blog-container">

          <h1 className="title"> Blog Management</h1>

          {/* CREATE FORM */}
          <form className="blog-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Blog Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '0.9rem', color: '#888' }}>Upload Image File:</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <span style={{ textAlign: 'center', color: '#888' }}>— OR —</span>
              <label style={{ fontSize: '0.9rem', color: '#888' }}>Enter Image URL:</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <input
              type="text"
              placeholder="Video URL (e.g. YouTube embed link)"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />

            <button type="submit">Create Blog</button>
          </form>

          {/* BLOG LIST */}
          <div className="blog-list">
            {blogs.map((blog) => (
              <div className="blog-card" key={blog._id}>

                {blog.image && (
                  <img src={blog.image} alt="blog" />
                )}

                <h3>{blog.title}</h3>
                <p>{blog.content}</p>

                <button
                  className="delete-btn"
                  onClick={() => deleteBlog(blog._id)}
                >
                  Delete
                </button>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminBlog;