import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <NavLink to="/admin" end className={({isActive}) => isActive ? "active-link" : ""}>Dashboard</NavLink>

      <NavLink to="/admin/users" className={({isActive}) => isActive ? "active-link" : ""}>Users</NavLink>
      <NavLink to="/admin/blogs" className={({isActive}) => isActive ? "active-link" : ""}>Blogs</NavLink>
      <NavLink to="/admin/nutrition" className={({isActive}) => isActive ? "active-link" : ""}>Nutrition</NavLink>
      <NavLink to="/admin/programs" className={({isActive}) => isActive ? "active-link" : ""}>Programs</NavLink>
      <NavLink to="/admin/workouts" className={({isActive}) => isActive ? "active-link" : ""}>Workouts</NavLink>
      <NavLink to="/admin/bmi-history" className={({isActive}) => isActive ? "active-link" : ""}>BMI History</NavLink>
      <NavLink to="/admin/community" className={({isActive}) => isActive ? "active-link" : ""}>Community</NavLink>
      <NavLink to="/admin/goals" className={({isActive}) => isActive ? "active-link" : ""}>Goals</NavLink>
      <NavLink to="/admin/progress" className={({isActive}) => isActive ? "active-link" : ""}>Progress</NavLink>
      <NavLink to="/admin/trainers" className={({isActive}) => isActive ? "active-link" : ""}>Trainers</NavLink>
      <NavLink to="/admin/exercise-bank" className={({isActive}) => isActive ? "active-link" : ""}>Exercise Bank</NavLink>
      
      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B5F23D', border: '1px solid #B5F23D', justifyContent: 'center' }}>
          <span>-</span> Back to Home
        </NavLink>
      </div>
    </div>
  );
}

export default AdminSidebar;