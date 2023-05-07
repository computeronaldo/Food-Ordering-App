import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div onClick={props.closeModal} className={classes.backdrop} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <div className={classes.modal}>
          <div className={classes.content}>{props.children}</div>
        </div>,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default Modal;
