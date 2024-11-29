
'use client';
import { useState, useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animationClass, setAnimationClass] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setAnimationClass("modal-enter");
    } else {
      setAnimationClass("modal-exit");

      // Delay unmount until the exit animation is complete
      const timeout = setTimeout(() => setIsVisible(false), 300); // Match this duration with your animation CSS
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={`relative bg-white rounded-lg shadow-lg w-[90%] max-w-lg p-5 ${animationClass}`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body // Render modal outside the root element
  );
};

export default Modal;
