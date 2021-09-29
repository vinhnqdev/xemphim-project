import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import TextError from "../components/Form/TextError";
import { getAuth, updatePassword } from "firebase/auth";
import AlertModal from "../components/UI/AlertModal";

const validationSchema = yup.object({
  password: yup
    .string()
    .required("Bạn chưa cung cấp mật khẩu")
    .min(8, "Mật khẩu quá ngắn, tối thiếu 8 kí tự.")
    .matches(/[a-zA-Z]/, "Phải chứa cả kí tự chữ và số"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
});

function ForgotPassword() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalError, setIsModalError] = useState(null);

  const [titleModal, setTitleModal] = useState("");

  const onSubmit = ({ confirmPassword: newPassword }, { resetForm, setSubmitting }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    updatePassword(user, newPassword)
      .then(() => {
        setSubmitting(false);
        resetForm();
        setIsModalOpen(true);
        setIsModalError(false);
        setTitleModal("Thay đổi mật khẩu thành công.");
      })
      .catch((error) => {
        setSubmitting(false);
        resetForm();

        console.log(error.code);
        if (error.code === "auth/requires-recent-login") {
          setIsModalOpen(true);
          setIsModalError(true);
          setTitleModal("Mật khẩu đã được tạo gần đây, hãy thử với một mật khẩu khác");
        }
      });
  };

  return (
    <div className="forgot">
      <AlertModal
        isOpen={isModalOpen}
        title={titleModal}
        onClose={() => setIsModalOpen(false)}
        isError={isModalError}
        textBtns={{ prev: "Back", next: "Go home" }}
      />
      <h2 className="forgot__title">Đổi mật khẩu</h2>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form className="forgot__form">
              <div className="form__control">
                <Field
                  type="password"
                  name="password"
                  placeholder="Mật khẩu mới"
                  autoComplete="off"
                />
                <ErrorMessage name="password" component={TextError} />
              </div>

              <div className="form__control">
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Xác nhận mật khẩu"
                  autoComplete="off"
                />
                <ErrorMessage name="confirmPassword" component={TextError} />
              </div>

              <div className="form__control">
                <button
                  type="submit"
                  className={`forgot__button ${
                    (formik.isSubmitting || !formik.isValid) && "forgot__button--disabled"
                  }`}
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {!formik.isSubmitting && "Đổi mật khẩu"}
                  {formik.isSubmitting && (
                    <Fragment>
                      <i className="fa fa-spinner fa-spin"></i>
                      <span style={{ marginLeft: "5px" }}>Loading</span>
                    </Fragment>
                  )}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className="forgot__links">
        <Link className="forgot__link" to="/">
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
