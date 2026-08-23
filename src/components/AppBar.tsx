import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  back?: boolean;
  action?: ReactNode;
}

export function AppBar({ title, subtitle, back, action }: Props) {
  const navigate = useNavigate();
  return (
    <div className="app-bar">
      {back && (
        <button type="button" className="icon-btn" onClick={() => navigate(-1)} aria-label="Back">
          <ChevronLeft size={22} />
        </button>
      )}
      <div className="grow">
        <div className="app-bar-title">{title}</div>
        {subtitle && <div className="app-bar-sub">{subtitle}</div>}
      </div>
      {action}
    </div>
  );
}
