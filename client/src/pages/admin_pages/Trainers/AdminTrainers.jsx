import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminTrainers.css";
import AdminSidebar from "../../../admin_components/AdminSidebar/AdminSidebar";

function AdminTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [name, setName] = useState("");
  const [expertise, setExpertise] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/trainers");
      setTrainers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("expertise", expertise);
    formData.append("availableTime", availableTime);
    formData.append("isActive", isActive);
    if (file) formData.append("image", file);

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/trainers/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Trainer updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/trainers", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Trainer added successfully!");
      }
      setName("");
      setExpertise("");
      setAvailableTime("");
      setIsActive(true);
      setFile(null);
      setEditingId(null);
      fetchTrainers();
    } catch (err) {
      console.log(err);
      alert("Failed to save trainer. If you uploaded an image, make sure your Cloudinary credentials in server/.env are correct!");
    }
  };

  const handleEdit = (trainer) => {
    setName(trainer.name);
    setExpertise(trainer.expertise);
    setAvailableTime(trainer.availableTime);
    setIsActive(trainer.isActive);
    setEditingId(trainer._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteTrainer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/trainers/${id}`);
      setTrainers(trainers.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleStatus = async (trainer) => {
    try {
      const formData = new FormData();
      formData.append("name", trainer.name);
      formData.append("expertise", trainer.expertise);
      formData.append("availableTime", trainer.availableTime);
      formData.append("isActive", !trainer.isActive);

      await axios.put(`http://localhost:5000/api/trainers/${trainer._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchTrainers();
    } catch (err) {
      console.log(err);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="trainers-admin-page" style={{ flex: 1 }}>
        <div className="trainers-container">
          <h1 className="title"> Trainer Management</h1>
          
          <form className="trainer-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Trainer Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Expertise (e.g. HIIT, Powerlifting)" value={expertise} onChange={(e) => setExpertise(e.target.value)} required />
            <input type="text" placeholder="Available Time (e.g. 9 AM - 5 PM)" value={availableTime} onChange={(e) => setAvailableTime(e.target.value)} required />
            
            <div className="checkbox-group">
              <label>Currently Active:</label>
              <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
            </div>

            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit">{editingId ? "Update Trainer" : "Add Trainer"}</button>
            {editingId && (
              <button type="button" onClick={() => {
                setName("");
                setExpertise("");
                setAvailableTime("");
                setIsActive(true);
                setFile(null);
                setEditingId(null);
              }} style={{ backgroundColor: '#333', color: '#fff', marginTop: '-10px' }}>
                Cancel Edit
              </button>
            )}
          </form>

          <div className="table">
            <div className="row header">
              <span>Name</span>
              <span>Expertise</span>
              <span>Available</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {trainers.map((t) => (
              <div className="row" key={t._id}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {t.image && <img src={t.image} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />}
                  {t.name}
                </span>
                <span>{t.expertise}</span>
                <span>{t.availableTime}</span>
                <span className={t.isActive ? "active-status" : "inactive-status"}>
                  {t.isActive ? "ACTIVE" : "INACTIVE"}
                </span>
                <div className="actions">
                  <button onClick={() => handleEdit(t)}>Edit</button>
                  <button onClick={() => toggleStatus(t)}>Toggle Status</button>
                  <button className="delete-btn" onClick={() => deleteTrainer(t._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTrainers;
