import ReactDOM from "react-dom";
const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("overlay")
  );
};
export default Backdrop;
