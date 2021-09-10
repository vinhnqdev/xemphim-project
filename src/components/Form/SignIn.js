import { Form, Formik, Field, ErrorMessage, FieldArray } from "formik";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import TextError from "./TextError";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../../app/userSlice";
import AlertModal from "../UI/AlertModal";
import RouterLinks from "./RouterLinks";
import SubmitButtons from "./SubmitButtons";

import { toast } from "react-toastify";
import ToasterAlert from "../UI/ToasterAlert";

const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

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

const validationSchemaSignUp = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Bắt buộc"),
  password: yup
    .string()
    .required("Chưa cung cấp mật khẩu")
    .min(8, "Mật khẩu quá ngắn, tối thiểu 8 kí tự")
    .matches(/[a-zA-Z]/, "Mật khẩu cần chưa kí tự"),
  name: yup.string().required("Bắt buộc"),
  // phone: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid.")
  //   .required("Must enter a phone number"),
});

const validationSchemaSignIn = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Bắt buộc"),
  password: yup
    .string()
    .required("Chưa cung cấp mật khẩu")
    .min(8, "Mật khẩu quá ngắn, tối thiểu 8 kí tự")
    .matches(/[a-zA-Z]/, "Mật khẩu cần chưa kí tự"),
});

const firstPhoneNumValidate = (value) => {
  let error;
  if (!value) {
    error = "Số điện thoại không hợp lệ";
  } else if (!phoneRegExp.test(value)) {
    error = "Bắt buộc";
  }
  return error;
};

function SignIn({ signup }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalError, setIsModalError] = useState(null);
  const [titleModal, setTitleModal] = useState("");
  const textSubmitBtn = signup ? "Đăng kí" : "Đăng nhập";

  const onSubmit = (values, onSubmitProps) => {
    const { email, password, name } = values;
    //Đăng kí tài khoản
    if (values.name) {
      setTimeout(() => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            onSubmitProps.resetForm();
            onSubmitProps.setSubmitting(false);
            dispatch(userActions.updateName(name));
            toast.success(
              <ToasterAlert hasBtns={false}>
                Đăng kí tài khoản thành công, chúng tôi sẽ chuyển bạn về trang
                chủ trong giây lát
              </ToasterAlert>,
              {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                pauseOnHover: false,
              }
            );
            setTimeout(() => {
              history.push("/");
            }, 3200);
            updateProfile(auth.currentUser, {
              displayName: name,
            });
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              toast.error(
                <ToasterAlert hasBtns={false}>
                  Email đã tồn tại trong hệ thống, bạn vui lòng đăng ký với
                  email khác nhé!
                </ToasterAlert>,
                {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  draggable: true,
                  progress: undefined,
                  pauseOnHover: false,
                }
              );
            }
            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();
            // ..
          });
      }, 1000);
    }

    //đăng nhập
    else {
      setTimeout(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            // Signed in
            onSubmitProps.resetForm();
            onSubmitProps.setSubmitting(false);

            // Show modal
            setIsModalOpen(true);
            setIsModalError(false);
            setTitleModal("Đăng nhập thành công");
          })
          .catch((error) => {
            onSubmitProps.resetForm();
            onSubmitProps.setSubmitting(false);
            onSubmitProps.setFieldValue("email", email);
            console.log(error.code);
            if (error.code === "auth/wrong-password") {
              setIsModalOpen(true);
              setIsModalError(true);
              setTitleModal("wrong password, please try again");
            }
            if (error.code === "auth/user-not-found") {
              setIsModalOpen(true);
              setIsModalError(true);
              setTitleModal(
                "Tài khoản không tồn tại, bạn vui lòng đăng kí nhé!"
              );
            }
          });
      }, 1000);
    }
  };

  const loginGoogleHandler = () => {
    signInWithRedirect(auth, googleProvider);
    history.push("/");
  };

  /** RETURN HERRRR!!!!! */

  return (
    <Fragment>
      {/*Component sử dụng thư viện React Modal */}
      <AlertModal
        isOpen={isModalOpen}
        title={titleModal}
        onClose={() => setIsModalOpen(false)}
        isError={isModalError}
        textBtns={{ prev: "Quay lại", next: "Xem phim ngay" }}
      />
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
                    placeholder="Tên"
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
                  placeholder="Mật khẩu"
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
                            placeholder={`Số điện thoại ${index + 1}`}
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
              <SubmitButtons
                formik={formik}
                textSubmitBtn={textSubmitBtn}
                loginGoogleHandler={loginGoogleHandler}
              />
            </Form>
          );
        }}
      </Formik>
      <RouterLinks signup={signup} />
    </Fragment>
  );
}

export default SignIn;
