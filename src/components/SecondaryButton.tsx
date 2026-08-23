import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function SecondaryButton({ children, onClick, disabled }: Props) {
  return (
    <button type="button" className="btn btn-secondary" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
