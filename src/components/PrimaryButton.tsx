import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}

export function PrimaryButton({ children, onClick, disabled, type = "button" }: Props) {
  return (
    <button type={type} className="btn btn-primary" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
