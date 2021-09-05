import React from "react";
import { Link } from "react-router-dom";
function RouterLinks({ signup }) {
  return (
    <div>
      <div className="login__links">
        <Link className="login__link" to={signup ? "/login" : "/signup"}>
          {signup ? "Đăng nhập" : "Đăng kí"}
        </Link>
        {!signup && (
          <Link className="login__link" to="/forgot-password">
            Quên mật khẩu
          </Link>
        )}
      </div>
    </div>
  );
}

export default RouterLinks;
