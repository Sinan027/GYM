import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../pages/Footer/Footer";
import DemoOverlay from "../components/common/DemoOverlay";
import LoginModal from "../components/common/LoginModal";

function MainLayout() {
  return (
    <div>
      <Navbar />
      
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <DemoOverlay />
        <Outlet />
      </div>

      <Footer />
      <LoginModal />
    </div>
  );
}

export default MainLayout;