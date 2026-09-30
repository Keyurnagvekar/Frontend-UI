import type { ReactNode } from "react";
import { X } from "lucide-react";

export default function Modal({ title, children, onClose, testId }: { title: string; children: ReactNode; onClose: () => void; testId: string }) {
  return (
    <div className="modal-backdrop" data-testid={`${testId}-backdrop`} onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="modal-card" role="dialog" aria-modal="true" aria-label={title} data-testid={testId}>
        <div className="modal-heading"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close dialog" data-testid="modal-close"><X size={18} /></button></div>
        {children}
      </section>
    </div>
  );
}
