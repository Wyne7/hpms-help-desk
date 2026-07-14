import React, { useEffect } from 'react';
import { createPortal } from 'react-dom'; 

interface NotificationModalProps {
  isOpen: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  type,
  message,
  onClose,
}) => {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
      }}
    >
     
      <div 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '380px',
          width: '90%', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          animation: 'zoomIn 0.2s ease-out'
        }}
      >
        
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
          {type === 'success' ? (
            <img 
              src="/success.png" 
              alt="Success" 
              style={{ width: '64px', height: '64px', objectFit: 'contain' }} 
            />
          ) : (
            <img 
              src="/fail.png" 
              alt="Error" 
              style={{ width: '64px', height: '64px', objectFit: 'contain' }} 
            />
          )}
        </div>


        <h3 
          style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '0.75rem',
            color: type === 'success' ? '#16a34a' : '#dc2626',
            marginTop: 0
          }}
        >
          {type === 'success' ? 'အောင်မြင်ပါသည်။' : 'မအောင်မြင်ပါ။'}
        </h3>
        
        
        <p 
          style={{
            color: '#4b5563',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            whiteSpace: 'pre-line',
            marginBottom: '1.5rem',
            marginTop: 0
          }}
        >
          {message}
        </p>

        
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '0.75rem',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '1rem',
            backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
            transition: 'background-color 0.2s'
          }}
        >
          ပိတ်မည်
        </button>
      </div>
    </div>,
    document.body 
  );
};