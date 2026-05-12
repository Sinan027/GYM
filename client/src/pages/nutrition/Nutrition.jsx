import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Nutrition.css';

function Nutrition() {
  const [foods, setFoods] = useState([]);
  const [powders, setPowders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const navigate = useNavigate();

  const openModal = (food) => {
    setSelectedFood(food);
  };

  const closeModal = () => {
    setSelectedFood(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resFood, resPowders] = await Promise.all([
          axios.get("http://localhost:5000/api/nutrition"),
          axios.get("http://localhost:5000/api/protein-powders")
        ]);
        setFoods(resFood.data);
        setPowders(resPowders.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="nutrition-page">
      <div className="nutrition-container">
        {/* Header Section */}
        <header className="nutrition-header">
          <div className="header-left">
            <p className="section-num">04 — NUTRITION DATABASE</p>
            <h1 className="heavy-title">FUEL <br /> RIGHT</h1>
          </div>
          {/* <div className="header-right">
            <p className="header-desc">
              Science-based meal plans for every goal. Clean macros, real food, no supplements required.
            </p>
          </div> */}
        </header>

        {loading ? (
          <div className="loading-state">Loading data...</div>
        ) : (
          <>
            {/* --- PROTEIN POWDER STORE --- */}
            <div style={{ marginTop: '40px', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '2rem', color: '#fff', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
                PROTEIN & SUPPLEMENTS STORE
              </h2>
            </div>
            
            {powders.length === 0 ? (
              <div className="empty-state">No products available.</div>
            ) : (
              <div className="nutrition-grid" style={{ marginBottom: '60px' }}>
                {powders.map((powder) => (
                  <div key={powder._id} className="nutrition-card">
                    {powder.image && (
                      <div className="nutrition-image-wrapper" style={{ height: '220px', borderBottom: '1px solid #222' }}>
                        <img src={powder.image} alt={powder.name} className="nutrition-img" />
                      </div>
                    )}
                    
                    <div className="nutrition-content" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <p className="nutrition-category">{powder.brand.toUpperCase()}</p>
                      <h2 className="nutrition-title" style={{ marginBottom: '15px' }}>{powder.name}</h2>
                      <p style={{ color: '#888', flex: 1, marginBottom: '30px', fontSize: '0.9rem', lineHeight: '1.5' }}>{powder.description}</p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid #222', paddingTop: '20px' }}>
                        <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fff' }}>${powder.price}</span>
                        <button 
                          disabled={!powder.inStock}
                          onClick={() => navigate(`/checkout/${powder._id}?type=powder`)}
                          style={{
                            background: powder.inStock ? '#B5F23D' : '#333',
                            color: powder.inStock ? '#000' : '#888',
                            border: 'none',
                            padding: '12px 25px',
                            fontWeight: 'bold',
                            cursor: powder.inStock ? 'pointer' : 'not-allowed',
                            borderRadius: '4px'
                          }}
                        >
                          {powder.inStock ? "BUY NOW" : "OUT OF STOCK"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* --- FOOD DB --- */}
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '2rem', color: '#fff', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
                MACRO DATABASE
              </h2>
            </div>

            {foods.length === 0 ? (
              <div className="empty-state">No food items found. Check back later!</div>
            ) : (
              <div className="nutrition-grid">
                {foods.map((food) => (
                  <div key={food._id} className="nutrition-card" onClick={() => openModal(food)} style={{ cursor: 'pointer' }}>
                    {food.image && (
                      <div className="nutrition-image-wrapper" style={{ height: '220px', borderBottom: '1px solid #222' }}>
                        <img src={food.image} alt={food.name} className="nutrition-img" />
                      </div>
                    )}
                    
                    <div className="nutrition-content" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <p className="nutrition-category">NUTRITION ITEM</p>
                      <h2 className="nutrition-title" style={{ marginBottom: '15px' }}>{food.name}</h2>
                      
                      <div className="calories-display" style={{ marginBottom: '30px' }}>
                        <span className="cal-num">{food.calories}</span>
                        <span className="cal-unit">kcal/day</span>
                      </div>

                      <div className="macro-row" style={{ marginTop: 'auto' }}>
                        <div className="macro-item">
                          <span className="macro-val">{food.protein}g</span>
                          <span className="macro-label">PROTEIN</span>
                        </div>
                        <div className="macro-item">
                          <span className="macro-val">{food.carbs}g</span>
                          <span className="macro-label">CARBS</span>
                        </div>
                        <div className="macro-item">
                          <span className="macro-val">{food.fat || 0}g</span>
                          <span className="macro-label">FAT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* --- MODAL --- */}
      {selectedFood && (
        <div className="nutrition-modal-overlay" onClick={closeModal}>
          <div className="nutrition-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="nutrition-modal-close" onClick={closeModal}>&times;</button>
            {selectedFood.image && (
              <img src={selectedFood.image} alt={selectedFood.name} className="nutrition-modal-img" />
            )}
            <div className="nutrition-modal-details">
              <p className="nutrition-category">NUTRITION ITEM</p>
              <h2 className="nutrition-title">{selectedFood.name}</h2>
              <p style={{ color: '#ccc', margin: '15px 0', lineHeight: '1.6' }}>
                {selectedFood.description || "A nutritious choice to hit your macro goals and fuel your performance."}
              </p>
              
              <div className="calories-display" style={{ marginBottom: '20px' }}>
                <span className="cal-num">{selectedFood.calories}</span>
                <span className="cal-unit">kcal</span>
              </div>

              <div className="macro-row" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
                <div className="macro-item">
                  <span className="macro-val">{selectedFood.protein}g</span>
                  <span className="macro-label">PROTEIN</span>
                </div>
                <div className="macro-item">
                  <span className="macro-val">{selectedFood.carbs}g</span>
                  <span className="macro-label">CARBS</span>
                </div>
                <div className="macro-item">
                  <span className="macro-val">{selectedFood.fat || 0}g</span>
                  <span className="macro-label">FAT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nutrition;