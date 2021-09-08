import React, { useState } from "react";
import { useSelector } from "react-redux";
import avatarImg from "../assets/images/avatar.png";
import { toast } from "react-toastify";
import ToasterAlert from "../components/UI/ToasterAlert";

function Profile() {
  const user = useSelector((state) => state.user.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const deleteAccount = () => {
    setIsSubmitting(true);
    toast.error(
      <ToasterAlert hasBtns={true} submittedBtn={() => setIsSubmitting(false)}>
        Bạn có chắc sẽ muốn xoá tài khoản không?
      </ToasterAlert>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      }
    );
  };
  return (
    <div className="profile">
      <div className="profile__avatar">
        <img src={user.photoURL ? user.photoURL : avatarImg} alt="Avatar" />
      </div>
      <div className="profile__infor">
        <h2>{user.displayName}</h2>
        <p>{user.email}</p>
        <button onClick={deleteAccount} type="button" disabled={isSubmitting}>
          Xoá tài khoản
        </button>
      </div>
    </div>
  );
}

export default Profile;
