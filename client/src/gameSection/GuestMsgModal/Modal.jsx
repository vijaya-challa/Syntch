/* eslint-disable */
import React from 'react';
import './Modal.css';
import { Link } from 'react-router-dom';

const Modal = ({ show, handleClose }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <p>
          As a <span>Guest</span> you can access only <span>3</span> tasks
        </p>
        <p>
          Please
          <Link to="/login" onClick={handleClose}>
            Log In
          </Link>
          or
          <Link to="/register" onClick={handleClose}>
            Register
          </Link>
          to continue
        </p>
      </section>
    </div>
  );
};

export default Modal;
