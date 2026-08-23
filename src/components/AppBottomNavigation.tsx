import { NavLink, useNavigate } from "react-router-dom";
import { Home, BookOpen, User, Video } from "lucide-react";

export function AppBottomNavigation() {
  const navigate = useNavigate();
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <Home size={22} />
        <span className="nav-item-label">Home</span>
      </NavLink>
      <NavLink to="/library" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <BookOpen size={22} />
        <span className="nav-item-label">Knowledge</span>
      </NavLink>
      <button
        type="button"
        className="nav-capture-btn"
        aria-label="Start capture"
        onClick={() => navigate("/capture")}
      >
        <Video size={24} />
      </button>
      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <User size={22} />
        <span className="nav-item-label">Profile</span>
      </NavLink>
    </nav>
  );
}
