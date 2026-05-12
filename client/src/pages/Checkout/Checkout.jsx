import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type") || "program";

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const endpoint = type === "powder" ? `/api/protein-powders/${id}` : `/api/programs/${id}`;
        const res = await axios.get(`http://localhost:5000${endpoint}`);
        setItem(res.data);
      } catch (err) {
        console.error("Error fetching item:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, type]);

  const handlePayment = async () => {
    setIsProcessing(true);
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to make a purchase.");
      navigate("/login");
      return;
    }

    // Simulate payment gateway delay
    setTimeout(async () => {
      try {
        await axios.post(
          "http://localhost:5000/api/purchases",
          {
            itemId: id,
            itemType: type,
            paymentMethod,
            amount: item.price || 99, // Fallback price
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (type === "program") {
          alert("👉 Welcome back! Program started successfully.");
          navigate("/trainers");
        } else {
          alert("👉 Purchase successful! Your order has been placed.");
          navigate("/profile");
        }
      } catch (err) {
        console.error("Purchase error:", err);
        alert("Payment failed. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    }, 1500);
  };

  if (loading) return <div className="checkout-page"><div className="loading-state">Loading Checkout...</div></div>;
  if (!item) return <div className="checkout-page"><div className="empty-state">Item not found.</div></div>;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="heavy-title">COMPLETE <br /> PURCHASE</h1>
        
        <div className="checkout-grid">
          {/* Item Details Side */}
          <div className="program-summary">
            <h3>ORDER SUMMARY</h3>
            <div className="summary-card">
              <h4>{item.title || item.name}</h4>
              {type === "program" ? (
                <p>{item.difficulty} • {item.duration}</p>
              ) : (
                <p>{item.brand} • Physical Product</p>
              )}
              <div className="price-tag">
                ${item.price || 99}.00
              </div>
            </div>
          </div>

          {/* Payment Side */}
          <div className="payment-section">
            <h3>SELECT PAYMENT METHOD</h3>
            
            <div className="payment-options">
              <label className={`payment-option ${paymentMethod === "UPI" ? "selected" : ""}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="UPI" 
                  checked={paymentMethod === "UPI"} 
                  onChange={(e) => setPaymentMethod(e.target.value)} 
                />
                <span className="option-text">UPI / BHIM</span>
              </label>

              <label className={`payment-option ${paymentMethod === "Card" ? "selected" : ""}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="Card" 
                  checked={paymentMethod === "Card"} 
                  onChange={(e) => setPaymentMethod(e.target.value)} 
                />
                <span className="option-text">Credit / Debit Card</span>
              </label>

              <label className={`payment-option ${paymentMethod === "GPay" ? "selected" : ""}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="GPay" 
                  checked={paymentMethod === "GPay"} 
                  onChange={(e) => setPaymentMethod(e.target.value)} 
                />
                <span className="option-text">Google Pay (GPay)</span>
              </label>
            </div>

            <button 
              className="pay-now-btn" 
              onClick={handlePayment} 
              disabled={isProcessing}
            >
              {isProcessing ? "PROCESSING PAYMENT..." : `PAY $${item.price || 99}.00 SECURELY`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
