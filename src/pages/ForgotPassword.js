import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import TextError from "../components/Form/TextError";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const initialValues = {
  forgot: "",
};

const onSubmit = ({ forgot: email }, onSubmitProps) => {
  console.log(email);
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      onSubmitProps.resetForm();
      onSubmitProps.setSubmitting(false);
    })
    .catch((error) => {
      alert(error.message);
    });
};

const validationSchema = yup.object({
  forgot: yup.string().email("Email không hợp lệ.").required("Bắt buộc."),
});

function ForgotPassword() {
  return (
    <div className="forgot">
      <h2 className="forgot__title">Quên mật khẩu</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {(formik) => {
          return (
            <Form className="forgot__form">
              <div className="form__control">
                <Field type="text" name="forgot" placeholder="Nhập email" autoComplete="off" />
                <ErrorMessage name="forgot" component={TextError} />
              </div>
              <div className="form__control">
                <button
                  type="submit"
                  className={`forgot__button ${
                    (formik.isSubmitting || !formik.isValid) && "forgot__button--disabled"
                  }`}
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {!formik.isSubmitting && "Lấy lại mật khẩu"}
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
        <Link className="forgot__link" to="/login">
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
