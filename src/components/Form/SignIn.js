import { Form, Formik, Field, ErrorMessage, FieldArray } from "formik";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import TextError from "./TextError";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const initialValues = {
  email: "",
  password: "",
  term: true,
  name: "",
  // phone: "",
  phoneNums: [""],
};
const onSubmit = (values, onSubmitProps) => {
  console.log(values);
  setTimeout(() => {
    onSubmitProps.resetForm();
    onSubmitProps.setSubmitting(false);
  }, 3000);
};
const validationSchemaSignUp = yup.object({
  email: yup.string().email("Invalid Email.").required("Required."),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  name: yup.string().required("Required"),
  // phone: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid.")
  //   .required("Must enter a phone number"),
});

const validationSchemaSignIn = yup.object({
  email: yup.string().email("Invalid Email.").required("Required."),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const firstPhoneNumValidate = (value) => {
  let error;
  if (!value) {
    error = "Phone number is not valid.";
  } else if (!phoneRegExp.test(value)) {
    error = "Must enter a phone number.";
  }
  return error;
};

function SignIn({ signup }) {
  const textSubmitBtn = signup ? "Đăng kí" : "Đăng nhập";
  return (
    <Fragment>
      <h2 className="login__title">{signup ? "Đăng kí" : "Đăng nhập"}</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={
          signup ? validationSchemaSignUp : validationSchemaSignIn
        }
      >
        {(formik) => {
          return (
            <Form className="login__form">
              {/* Email */}

              <div className="form__control">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="off"
                />
                <ErrorMessage name="email" component={TextError} />
              </div>

              {/* Name */}

              {signup && (
                <div className="form__control">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    autoComplete="off"
                  />
                  <ErrorMessage name="name" component={TextError} />
                </div>
              )}

              {/* Password */}

              <div className="form__control">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="off"
                />
                <ErrorMessage name="password" component={TextError} />
              </div>

              {/* PhoneNumber */}

              {signup && (
                <Fragment>
                  <FieldArray name="phoneNums">
                    {(fieldArrayProps) => {
                      const phoneNums = fieldArrayProps.form.values.phoneNums;
                      const { push, remove } = fieldArrayProps;
                      return phoneNums.map((phone, index) => (
                        <div
                          className="form__control phone__control"
                          key={index}
                        >
                          <Field
                            type="text"
                            name={`phoneNums[${index}]`}
                            placeholder={`Phone ${index + 1}`}
                            autoComplete="off"
                            validate={
                              index === 0 ? firstPhoneNumValidate : null
                            }
                          />
                          <ErrorMessage
                            name={`phoneNums[${index}]`}
                            component={TextError}
                          />
                          <div className="butons__group">
                            {phoneNums.length < 2 && (
                              <button type="button" onClick={() => push("")}>
                                +
                              </button>
                            )}
                            {phoneNums.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            )}
                          </div>
                        </div>
                      ));
                    }}
                  </FieldArray>

                  {/* <div className="form__control phone__control">
                <Field
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  autoComplete="off"
                />
                <ErrorMessage name="phone" component={TextError} />
              </div> */}
                </Fragment>
              )}

              {/* Checkbox */}

              <div className="form__control checkbox__control">
                <Field type="checkbox" name="term" id="term" />
                <label htmlFor="term">
                  {signup ? "Đăng kí nhận thông báo về web" : "Ghi nhớ"}
                </label>
              </div>
              {signup && (
                <p className="form__text">
                  Chúng tôi chỉ gửi những thông báo quan trọng
                </p>
              )}

              <div className="form__control">
                <button
                  className={`login__button ${
                    (formik.isSubmitting || !formik.isValid) &&
                    "login__button--disabled"
                  }`}
                  type="submit"
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {!formik.isSubmitting && textSubmitBtn}
                  {formik.isSubmitting && (
                    <Fragment>
                      <i className="fa fa-spinner fa-spin"></i>
                      <span style={{ marginLeft: "5px" }}>Loading</span>
                    </Fragment>
                  )}
                </button>
              </div>

              <div className="login__line"></div>

              <div className="form__control">
                <button
                  className="login__button login__button--gg"
                  type="submit"
                >
                  Đăng nhập với google
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className="login__links">
        <Link className="login__link" to={signup ? "/login" : "/signup"}>
          {signup ? "Đăng nhập" : "Đăng kí"}
        </Link>
        {!signup && (
          <a className="login__link" href="">
            Quên mật khẩu
          </a>
        )}
      </div>
    </Fragment>
  );
}

export default SignIn;
