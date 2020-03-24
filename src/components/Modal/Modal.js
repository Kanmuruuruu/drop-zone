import React from 'react';

import './modal.css';

const Modal = ({ children, customClass, show, closeCallback, success}) => (
  <div className={`modal ${customClass}`} style={{ display: show ? 'block' : 'none'}}>
    <div className="overlay" onClick={closeCallback}></div>
    <div className="modal_content" style={{ backgroundColor: success ? 'lightgreen' : 'red'}}>
      {children}
      <button title="Close" className="close_modal" onClick={closeCallback}>
        Fermer
      </button>
    </div>
  </div>
);

Modal.defaultProps = {
  children: <div>Empty Modal</div>,
  customClass: '',
  show: false,
  closeCallback: () => false
};

export default Modal;
