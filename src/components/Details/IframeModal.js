import React from "react";
import Modal from "react-modal";
import { XIcon } from "@heroicons/react/solid";
const videosStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 101,
  },
  content: {
    width: "100%",
    left: 0,
    right: 0,
    top: 0,
    display: "flex",
    backgroundColor: "transparent",
    border: "none",
    zIndex: 80,
  },
};

function IframeModal({ isOpen, onOpen, idFrame }) {
  return (
    <Modal
      isOpen={isOpen}
      style={videosStyles}
      onRequestClose={() => onOpen(false)}
      shouldCloseOnEsc={true}
    >
      <div className="modal-trailer__content">
        <iframe
          src={`https://www.youtube.com/embed/${idFrame}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="iframe__style"
        ></iframe>
      </div>
      <div className="modal-trailer__close" onClick={() => onOpen(false)}>
        <XIcon className="modal-trailer__icon" />
      </div>
    </Modal>
  );
}

export default IframeModal;
