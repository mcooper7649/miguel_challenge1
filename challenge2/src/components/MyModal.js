import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';

const Modal = (props) => {
  useEffect((props) => {
    const closeOnEscapeKeyDown = (e) => {
      if ((e.charCode || e.keyCode) === 27) {
        props.onClose();
      }
    };
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h1 className="modal-title">{props.title}</h1>
            <div className="bio">
              <h2>by: {props.user.name}</h2>
              <div className="quote">
                <h4>{props.user.bio}</h4>
              </div>
            </div>
          </div>
          <div className="modal-body">
            <img alt="" className="gallery-img" src={props.url} />
            <h3>Created at: {props.created.slice(0, 9)}</h3>
            <h3>likes: {props.user.total_likes}</h3>
          </div>
          <div className="modal-footer">
            <button onClick={props.onClose} className="button">
              Close
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('root')
  );
};

export default Modal;
