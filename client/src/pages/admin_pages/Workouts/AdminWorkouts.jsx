import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminWorkouts.css";
import AdminSidebar from "../../../admin_components/AdminSidebar/AdminSidebar";

function AdminWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    level: "",
    duration: "",
    exercises: ""
  });
  const [file, setFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/workouts");
      setWorkouts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("level", form.level);
    formData.append("duration", form.duration);
    formData.append("exercises", form.exercises);
    if (file) {
      formData.append("image", file);
    } else if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }
    
    if (videoFile) {
      formData.append("video", videoFile);
    } else if (videoUrl) {
      formData.append("videoUrl", videoUrl);
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/workouts/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("http://localhost:5000/api/workouts", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setForm({ title: "", description: "", level: "", duration: "", exercises: "" });
      setFile(null);
      setVideoFile(null);
      setImageUrl("");
      setVideoUrl("");
      setEditingId(null);
      alert(editingId ? "Workout updated successfully!" : "Workout added successfully!");
      fetchWorkouts();
    } catch (err) {
      console.log(err);
      alert("Failed to save workout: " + (err.response?.data?.msg || err.message));
    }
  };

  const handleEdit = (workout) => {
    setForm({
      title: workout.title || "",
      description: workout.description || "",
      level: workout.level || "",
      duration: workout.duration || "",
      exercises: workout.exercises ? workout.exercises.join(", ") : ""
    });
    setEditingId(workout._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        await axios.delete(`http://localhost:5000/api/workouts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchWorkouts();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const filtered = workouts.filter((w) =>
    w.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="workout-page" style={{ flex: 1, padding: '20px', backgroundColor: '#111', color: '#fff', minHeight: '100vh' }}>
        <h1 className="title" style={{ color: '#B5F23D', borderBottom: '2px solid #333', paddingBottom: '10px' }}> Workouts Management</h1>

        <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
          
          {/* Form Section */}
          <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#222', padding: '20px', borderRadius: '8px' }}>
            <h3>{editingId ? "Edit Workout" : "Add New Workout"}</h3>
            <input type="text" name="title" placeholder="Workout Title (e.g., Full Body Blast)" value={form.title} onChange={handleChange} required style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }} />
            <input type="text" name="level" placeholder="Level (e.g., Beginner, Advanced)" value={form.level} onChange={handleChange} required style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }} />
            <input type="number" name="duration" placeholder="Duration (in minutes)" value={form.duration} onChange={handleChange} required style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }} />
            <textarea name="description" placeholder="Description of the workout" value={form.description} onChange={handleChange} required style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', minHeight: '100px' }} />
            <input type="text" name="exercises" placeholder="Exercises (comma-separated, e.g., Push-ups, Squats)" value={form.exercises} onChange={handleChange} required style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '14px', color: '#B5F23D' }}>{editingId ? "Update Cover Image (optional)" : "Upload Cover Image"}</label>
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} style={{ color: '#fff' }} />
              <span style={{ textAlign: 'center', color: '#888', fontSize: '12px', margin: '5px 0' }}>— OR —</span>
              <input type="text" placeholder="Image URL (https://...)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '10px' }}>
              <label style={{ fontSize: '14px', color: '#B5F23D' }}>{editingId ? "Update Video (optional)" : "Upload Video"}</label>
              <input type="file" accept="video/mp4,video/webm" onChange={(e) => setVideoFile(e.target.files[0])} style={{ color: '#fff' }} />
              <span style={{ textAlign: 'center', color: '#888', fontSize: '12px', margin: '5px 0' }}>— OR —</span>
              <input type="text" placeholder="Video URL (https://...)" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }} />
            </div>

            <button type="submit" style={{ padding: '12px', background: '#B5F23D', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '15px' }}>
              {editingId ? "UPDATE WORKOUT" : "ADD WORKOUT"}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setForm({ title: "", description: "", level: "", duration: "", exercises: "" }); setFile(null); setVideoFile(null); setImageUrl(""); setVideoUrl(""); }} style={{ padding: '10px', background: '#555', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel Edit</button>
            )}
          </form>

          {/* List Section */}
          <div style={{ flex: 2 }}>
            <input
              type="text"
              placeholder="Search workouts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '20px', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
              {filtered.map((workout) => (
                <div key={workout._id} style={{ backgroundColor: '#222', borderRadius: '8px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '140px', backgroundImage: `url(${workout.image || 'https://via.placeholder.com/300'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  <div style={{ padding: '15px', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ background: '#B5F23D', color: '#000', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold', borderRadius: '12px' }}>{workout.level}</span>
                      <span style={{ color: '#aaa', fontSize: '12px' }}>⏱ {workout.duration}m</span>
                    </div>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{workout.title}</h4>
                    <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#ccc', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{workout.description}</p>
                    
                    <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                      <button onClick={() => handleEdit(workout)} style={{ flex: 1, padding: '8px', background: '#444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => handleDelete(workout._id)} style={{ flex: 1, padding: '8px', background: '#ff3333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminWorkouts;
