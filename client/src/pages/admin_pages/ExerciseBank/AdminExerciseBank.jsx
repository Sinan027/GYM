import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminExerciseBank.css";
import AdminSidebar from "../../../admin_components/AdminSidebar/AdminSidebar";

function AdminExerciseBank() {
  const [exercises, setExercises] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [icon, setIcon] = useState("");
  const [file, setFile] = useState(null);

  const [imageUrl, setImageUrl] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/exercise-bank");
      setExercises(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("icon", icon);
    
    if (file) {
      formData.append("image", file);
    } else if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }

    try {
      await axios.post("http://localhost:5000/api/exercise-bank", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setName("");
      setCategory("");
      setIcon("");
      setFile(null);
      setImageUrl("");
      alert("Exercise added to Bank successfully!");
      fetchExercises();
    } catch (err) {
      console.log(err);
      alert("Failed to add exercise.");
    }
  };

  const deleteExercise = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/exercise-bank/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExercises(exercises.filter((e) => e._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="exercise-page" style={{ flex: 1, padding: '20px', backgroundColor: '#111', color: '#fff', minHeight: '100vh' }}>
        <h1 className="title" style={{ color: '#B5F23D', borderBottom: '2px solid #333', paddingBottom: '10px' }}>Arsenal Management</h1>

        <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
          
          {/* Form Section */}
          <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#222', padding: '20px', borderRadius: '8px' }}>
            <h3>Add New Exercise</h3>
            <input type="text" placeholder="Exercise Name (e.g., Lat Pulldown)" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }} />
            <input type="text" placeholder="Category (e.g., BACK / BICEPS)" value={category} onChange={(e) => setCategory(e.target.value)} required style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }} />
            <input type="text" placeholder="Emoji Icon (e.g., )" value={icon} onChange={(e) => setIcon(e.target.value)} required style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '10px 0' }}>
              <label style={{ fontSize: '0.9rem', color: '#888' }}>Upload Image File:</label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ color: '#000', background: '#fff', padding: '5px' }} />
              <span style={{ textAlign: 'center', color: '#888' }}>— OR —</span>
              <label style={{ fontSize: '0.9rem', color: '#888' }}>Enter Image URL:</label>
              <input type="text" placeholder="https://example.com/image.jpg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }} />
            </div>
            <button type="submit" style={{ padding: '12px', background: '#B5F23D', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>ADD EXERCISE</button>
          </form>

          {/* List Section */}
          <div style={{ flex: 2, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
            {exercises.map((ex) => (
              <div key={ex._id} style={{ backgroundColor: '#222', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                <div style={{ height: '120px', backgroundImage: `url(${ex.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div style={{ padding: '15px' }}>
                  <span style={{ background: '#B5F23D', color: '#000', padding: '2px 6px', fontSize: '10px', fontWeight: 'bold' }}>{ex.category}</span>
                  <h4 style={{ margin: '10px 0 0 0' }}>{ex.icon} {ex.name}</h4>
                  <button onClick={() => deleteExercise(ex._id)} style={{ marginTop: '10px', width: '100%', padding: '8px', background: '#ff3333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminExerciseBank;
