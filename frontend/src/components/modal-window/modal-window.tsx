import { useEffect, useRef } from 'react';
import './modal-window.css';

interface ModalWindowProps {
  handleClose: () => void;
  children: JSX.Element;
}

function ModalWindow({ handleClose, children }: ModalWindowProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        {children}
      </div>
    </div>
  );
}

export default ModalWindow;
