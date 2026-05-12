import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminNutrition.css";
import AdminSidebar from "../../../admin_components/AdminSidebar/AdminSidebar";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

function AdminNutrition() {
  const [items, setItems] = useState([]);
  const [powders, setPowders] = useState([]);
  const [activeTab, setActiveTab] = useState("nutrition");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPowderModal, setShowPowderModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editPowder, setEditPowder] = useState(null);

  const [form, setForm] = useState({
    name: "", calories: "", protein: "", carbs: ""
  });

  const [powderForm, setPowderForm] = useState({
    name: "", brand: "", price: "", description: "", inStock: true
  });

  useEffect(() => {
    fetchNutrition();
    fetchPowders();
  }, []);

  const fetchNutrition = async () => {
    const res = await axios.get("http://localhost:5000/api/nutrition");
    setItems(res.data);
  };

  const fetchPowders = async () => {
    const res = await axios.get("http://localhost:5000/api/protein-powders");
    setPowders(res.data);
  };

  const filteredItems = items.filter((i) =>
    i.name?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPowders = powders.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ OPEN MODALS
  const openModal = (item = null) => {
    setEditItem(item);
    setForm(item || { name: "", calories: "", protein: "", carbs: "" });
    setShowModal(true);
  };

  const openPowderModal = (powder = null) => {
    setEditPowder(powder);
    setPowderForm(powder || { name: "", brand: "", price: "", description: "", inStock: true });
    setShowPowderModal(true);
  };

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // ✅ SAVE (ADD / EDIT)
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("calories", form.calories);
      formData.append("protein", form.protein);
      formData.append("carbs", form.carbs);

      if (file) {
        formData.append("image", file);
      } else if (imageUrl) {
        formData.append("imageUrl", imageUrl);
      }

      if (editItem) {
        await axios.put(`http://localhost:5000/api/nutrition/${editItem._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await axios.post("http://localhost:5000/api/nutrition", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      setShowModal(false);
      setFile(null);
      setImageUrl("");
      fetchNutrition();
    } catch (err) {
      console.log("FRONTEND ERROR:", err);
    }
  };

  const handlePowderSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", powderForm.name);
      formData.append("brand", powderForm.brand);
      formData.append("price", powderForm.price);
      formData.append("description", powderForm.description);
      formData.append("inStock", powderForm.inStock);

      if (file) {
        formData.append("image", file);
      } else if (imageUrl) {
        formData.append("imageUrl", imageUrl);
      }

      if (editPowder) {
        await axios.put(`http://localhost:5000/api/protein-powders/${editPowder._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await axios.post("http://localhost:5000/api/protein-powders", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      setShowPowderModal(false);
      setFile(null);
      setImageUrl("");
      fetchPowders();
    } catch (err) {
      console.log("FRONTEND ERROR:", err);
    }
  };

  // ✅ DELETE
  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    await axios.delete(`http://localhost:5000/api/nutrition/${id}`);
    fetchNutrition();
  };

  const deletePowder = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;
    await axios.delete(`http://localhost:5000/api/protein-powders/${id}`);
    fetchPowders();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="nutrition-admin" style={{ flex: 1, padding: "40px", backgroundColor: "#111", color: "#fff", minHeight: "100vh" }}>
        <h1 className="title"> Nutrition & Supplements Management</h1>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
          <button 
            style={{ background: 'transparent', border: 'none', color: activeTab === 'nutrition' ? '#B5F23D' : '#fff', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' }}
            onClick={() => setActiveTab('nutrition')}
          >
            Nutrition Database
          </button>
          <button 
            style={{ background: 'transparent', border: 'none', color: activeTab === 'powders' ? '#B5F23D' : '#fff', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' }}
            onClick={() => setActiveTab('powders')}
          >
            Protein Powders
          </button>
        </div>

        {/* Top Actions */}
        <div className="top-bar">
          <input
            className="search"
            placeholder={activeTab === 'nutrition' ? "Search food..." : "Search products..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="add-btn" onClick={() => activeTab === 'nutrition' ? openModal() : openPowderModal()}>
            + {activeTab === 'nutrition' ? "Add Food" : "Add Product"}
          </button>
        </div>

        {activeTab === 'nutrition' && (
          <>
            {/* Chart */}
            <div className="chart-box">
              <h3>Calories Chart</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={items}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calories" fill="#B5F23D" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="table">
              <div className="row header">
                <span>Image</span>
                <span>Name</span>
                <span>Calories</span>
                <span>Protein</span>
                <span>Carbs</span>
                <span>Actions</span>
              </div>

              {filteredItems.map((item) => (
                <div className="row" key={item._id}>
                  <span>{item.image && <img src={item.image} alt={item.name} style={{width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover'}} />}</span>
                  <span>{item.name}</span>
                  <span>{item.calories}</span>
                  <span>{item.protein}</span>
                  <span>{item.carbs}</span>

                  <div className="actions">
                    <button onClick={() => openModal(item)}>Edit</button>
                    <button onClick={() => deleteItem(item._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'powders' && (
          <div className="table">
            <div className="row header">
              <span>Image</span>
              <span>Name</span>
              <span>Brand</span>
              <span>Price</span>
              <span>Stock Status</span>
              <span>Actions</span>
            </div>

            {filteredPowders.map((item) => (
              <div className="row" key={item._id}>
                <span>{item.image && <img src={item.image} alt={item.name} style={{width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover'}} />}</span>
                <span>{item.name}</span>
                <span>{item.brand}</span>
                <span>${item.price}</span>
                <span style={{ color: item.inStock ? '#B5F23D' : '#FF4D4D' }}>{item.inStock ? "IN STOCK" : "OUT OF STOCK"}</span>

                <div className="actions">
                  <button onClick={() => openPowderModal(item)}>Edit</button>
                  <button className="delete-btn" onClick={() => deletePowder(item._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NUTRITION MODAL */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>{editItem ? "Edit Food" : "Add Food"}</h2>
              <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input placeholder="Calories" type="number" value={form.calories} onChange={(e) => setForm({ ...form, calories: e.target.value })} />
              <input placeholder="Protein" type="number" value={form.protein} onChange={(e) => setForm({ ...form, protein: e.target.value })} />
              <input placeholder="Carbs" type="number" value={form.carbs} onChange={(e) => setForm({ ...form, carbs: e.target.value })} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0' }}>
                <label style={{ fontSize: '0.9rem', color: '#888' }}>Upload Image File:</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ color: '#000' }} />
                <span style={{ textAlign: 'center', color: '#888', margin: '5px 0' }}>— OR —</span>
                <label style={{ fontSize: '0.9rem', color: '#888' }}>Enter Image URL:</label>
                <input type="text" placeholder="https://example.com/food.jpg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              </div>

              <div className="modal-actions">
                <button onClick={handleSubmit}>Save</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* POWDER MODAL */}
        {showPowderModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>{editPowder ? "Edit Product" : "Add Product"}</h2>
              <input placeholder="Product Name" value={powderForm.name} onChange={(e) => setPowderForm({ ...powderForm, name: e.target.value })} />
              <input placeholder="Brand" value={powderForm.brand} onChange={(e) => setPowderForm({ ...powderForm, brand: e.target.value })} />
              <input placeholder="Price" type="number" value={powderForm.price} onChange={(e) => setPowderForm({ ...powderForm, price: e.target.value })} />
              <textarea placeholder="Description" value={powderForm.description} onChange={(e) => setPowderForm({ ...powderForm, description: e.target.value })} />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
                <input type="checkbox" checked={powderForm.inStock} onChange={(e) => setPowderForm({ ...powderForm, inStock: e.target.checked })} style={{ width: 'auto' }} />
                <label>In Stock</label>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0' }}>
                <label style={{ fontSize: '0.9rem', color: '#888' }}>Upload Image File:</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ color: '#000' }} />
                <span style={{ textAlign: 'center', color: '#888', margin: '5px 0' }}>— OR —</span>
                <label style={{ fontSize: '0.9rem', color: '#888' }}>Enter Image URL:</label>
                <input type="text" placeholder="https://example.com/product.jpg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              </div>

              <div className="modal-actions">
                <button onClick={handlePowderSubmit}>Save</button>
                <button onClick={() => setShowPowderModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminNutrition;