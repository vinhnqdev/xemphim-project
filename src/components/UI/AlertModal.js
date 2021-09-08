import React, { Fragment } from "react";
import ReactModal from "react-modal";
import { useHistory } from "react-router";

ReactModal.setAppElement("#root");

function AlertModal({ isOpen, title, onClose, isError, textBtns }) {
  const history = useHistory();

  const clickNextHandler = () => {
    // () => history.push(`${isError ? "/login" : "/"}`)
    if (isError) {
      onClose();
      history.push("/login");
    } else {
      history.push("/");
    }
  };

  const contentStyles = {
    zIndex: "50px",
    top: "7rem",
    left: "50%",
    transform: "translateX(-50%)",
    height: "14rem",
    padding: 0,
    border: "none",
    maxWidth: "42rem",
    width: "80%",
    animationName: "moveDown",
    animationDuration: "0.5s",
    animationTimingFunction: "ease",
  };
  const overlayStyles = {
    zIndex: "50",
    backgroundColor: "rgba(0,0,0,0.3)",
  };
  return (
    <Fragment>
      <ReactModal
        isOpen={isOpen}
        style={{ overlay: overlayStyles, content: contentStyles }}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={false}
      >
        <div
          className="modal__status"
          style={{ background: `${isError ? "#DC3545" : "#188754"}` }}
        ></div>
        <p className="modal__title">{title}</p>
        <div className="modal__btns-group">
          {!isError && (
            <button
              className="modal__btn modal__btn--back"
              type="button"
              onClick={onClose}
            >
              {textBtns.prev}
            </button>
          )}
          <button
            className="modal__btn modal__btn--go"
            type="button"
            onClick={clickNextHandler}
            style={{ background: `${isError ? "#DC3545" : "#188754"}` }}
          >
            {isError ? "Thử lại" : textBtns.next}
          </button>
        </div>
      </ReactModal>
    </Fragment>
  );
}

export default AlertModal;
