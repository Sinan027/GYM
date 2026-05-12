import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPrograms.css";
import AdminSidebar from "../../../admin_components/AdminSidebar/AdminSidebar";

function AdminPrograms() {
  const [programs, setPrograms] = useState([]);
  const [form, setForm] = useState({
    title: "",
    duration: "",
    level: "",
    description: "",
    videoUrl: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    const res = await axios.get("http://localhost:5000/api/programs");
    setPrograms(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("duration", form.duration);
      formData.append("level", form.level);
      formData.append("description", form.description);
      if (form.videoUrl) formData.append("videoUrl", form.videoUrl);
      if (form._id) formData.append("_id", form._id);
      
      if (file) {
        formData.append("image", file);
      } else if (imageUrl) {
        formData.append("imageUrl", imageUrl);
      }

      if (editingId) {
        await axios.put(`http://localhost:5000/api/programs/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await axios.post("http://localhost:5000/api/programs", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      setForm({ title: "", duration: "", level: "", description: "", videoUrl: "" });
      setEditingId(null);
      setFile(null);
      setImageUrl("");
      alert("Program saved successfully!");
      fetchPrograms();
    } catch (err) {
      console.error(err);
      alert("Failed to save program: " + (err.response?.data?.msg || err.message));
    }
  };

  //  Edit
  const handleEdit = (p) => {
    setForm(p);
    setEditingId(p._id);
  };

  //  Delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this program?")) {
      await axios.delete(`http://localhost:5000/api/programs/${id}`);
      fetchPrograms();
    }
  };

  const filtered = programs.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="program-page">
        <h1>Programs Management</h1>

        {/* FORM */}
        <div className="form-box">
          <input
            name="title"
            placeholder="Program Title"
            value={form.title}
            onChange={handleChange}
          />
          <input
            name="duration"
            placeholder="Duration (e.g. 4 weeks)"
            value={form.duration}
            onChange={handleChange}
          />
          <input
            name="level"
            placeholder="Level (Beginner/Advanced)"
            value={form.level}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <input
            name="videoUrl"
            placeholder="Video URL (Optional, e.g. YouTube or mp4 link)"
            value={form.videoUrl || ""}
            onChange={handleChange}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0' }}>
            <label style={{ fontSize: '0.9rem', color: '#888' }}>Upload Image File:</label>
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files[0])} 
              style={{ color: '#fff' }}
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

          <button onClick={handleSubmit}>
            {editingId ? "Update Program" : "Add Program"}
          </button>
        </div>

        {/* SEARCH */}
        <input
          className="search"
          placeholder="Search program..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE */}
        <div className="table">
          <div className="row header">
            <span>Image</span>
            <span>Title</span>
            <span>Duration</span>
            <span>Level</span>
            <span>Actions</span>
          </div>

          {filtered.map((p) => (
            <div className="row" key={p._id}>
              <span>
                {(p.image || p.imageUrl) && (
                  <img src={p.image || p.imageUrl} alt="Program" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                )}
              </span>
              <span>{p.title}</span>
              <span>{p.duration}</span>
              <span>{p.level}</span>

              <div className="actions">
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPrograms;