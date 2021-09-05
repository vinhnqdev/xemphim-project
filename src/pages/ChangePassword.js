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
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function ForgotPassword() {
  console.log("Change Password Component Render!!!");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalError, setIsModalError] = useState(null);

  const [titleModal, setTitleModal] = useState("");

  const onSubmit = (
    { confirmPassword: newPassword },
    { resetForm, setSubmitting }
  ) => {
    const auth = getAuth();
    const user = auth.currentUser;
    updatePassword(user, newPassword)
      .then(() => {
        setSubmitting(false);
        resetForm();
        setIsModalOpen(true);
        setIsModalError(false);
        setTitleModal("Changed password successfully!!");
      })
      .catch((error) => {
        setSubmitting(false);
        resetForm();

        console.log(error.code);
        if (error.code === "auth/requires-recent-login") {
          setIsModalOpen(true);
          setIsModalError(true);
          setTitleModal("Password's set recently, try a new password");
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
      <h2 className="forgot__title">Change Password</h2>
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
                  placeholder="New Password"
                  autoComplete="off"
                />
                <ErrorMessage name="password" component={TextError} />
              </div>

              <div className="form__control">
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  autoComplete="off"
                />
                <ErrorMessage name="confirmPassword" component={TextError} />
              </div>

              <div className="form__control">
                <button
                  type="submit"
                  className={`forgot__button ${
                    (formik.isSubmitting || !formik.isValid) &&
                    "forgot__button--disabled"
                  }`}
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {!formik.isSubmitting && "Get Password"}
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
          Go back home
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
