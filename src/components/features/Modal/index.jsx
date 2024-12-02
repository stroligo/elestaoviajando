import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Style from './style.module.css';

export function Modal({ children, isOpen, onClose }) {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains(Style['modal-overlay'])) {
        onClose();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  Modal.propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  return (
    <div>
      {isOpen && (
        <div className={Style['modal-overlay']}>
          <div className={Style['modal-content']}>
            <button className={Style['close-modal']} onClick={onClose}>
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
