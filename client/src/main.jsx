import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./styles/global.css";
import "./styles/variables.css";
import axios from "axios";

// --- GLOBAL FRONTEND API LOGGING ---
axios.interceptors.request.use(request => {
  console.log(`\n[Frontend]  API Request: ${request.method.toUpperCase()} ${request.url}`);
  if (request.data) {
    console.log('[Frontend]  Request Payload:', request.data);
  }
  return request;
});

axios.interceptors.response.use(response => {
  console.log(`[Frontend]  API Response: ${response.status} from ${response.config.url}`);
  return response;
}, error => {
  console.log(`[Frontend]  API Error:`, error.response?.status, error.message);
  return Promise.reject(error);
});
// -----------------------------------

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
