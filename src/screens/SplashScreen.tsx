import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cpu } from "lucide-react";

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/home"), 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="splash fade-in">
      <div className="splash-mark">
        <Cpu size={48} color="#fff" strokeWidth={1.6} />
      </div>
      <div>
        <h1 className="splash-title">WorkSight AI</h1>
        <p className="splash-tag">Preserve expertise. Empower every worker.</p>
      </div>
      <div className="splash-bar" />
    </div>
  );
}
