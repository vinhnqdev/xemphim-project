import React, { Fragment } from "react";

function SubmitButtons({ formik, textSubmitBtn, loginGoogleHandler }) {
  return (
    <Fragment>
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
          type="button"
          onClick={loginGoogleHandler}
        >
          Đăng nhập với google
        </button>
      </div>
    </Fragment>
  );
}

export default SubmitButtons;
