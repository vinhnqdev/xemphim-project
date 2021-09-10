import React from "react";
import { getAuth, deleteUser } from "firebase/auth";
import { useHistory } from "react-router";

function ToasterAlert({ children, hasBtns = true, submittedBtn }) {
  const history = useHistory();

  const deleteAccount = () => {
    submittedBtn();
    const auth = getAuth();
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        history.replace("/login");
      })
      .catch((error) => {
        // alert(error.messge);
      });
  };

  const cancelButton = () => {
    // closeToast;
    submittedBtn();
  };

  return (
    <div className="toaster">
      <p className="toaster__content">{children}</p>
      {hasBtns && (
        <div className="toaster__btns">
          <button
            className="toaster__btn toaster__btn--cancel"
            onClick={cancelButton}
          >
            Huỷ
          </button>
          <button
            className="toaster__btn toaster__btn--delete"
            onClick={deleteAccount}
          >
            Xoá
          </button>
        </div>
      )}
    </div>
  );
}

export default ToasterAlert;
