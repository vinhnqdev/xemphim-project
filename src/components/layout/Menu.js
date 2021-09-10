import { Fragment } from "react";
import { useSelector } from "react-redux";

import { Link, useHistory } from "react-router-dom";
import {
  UserIcon,
  InformationCircleIcon,
  LogoutIcon,
} from "@heroicons/react/solid";
const Menu = ({ logoutHander, isToggle }) => {
  const user = useSelector((state) => state.user.user);
  const history = useHistory();
  return (
    <menu className={`mb-menu ${isToggle && "toggle"}`}>
      <div className="mb-menu__actions">
        {Object.keys(user).length === 0 && (
          <Fragment>
            <Link className="mb-menu__btn" to="/login">
              Đăng nhập
            </Link>
            <Link className="mb-menu__btn" to="/signup">
              Đăng kí
            </Link>
          </Fragment>
        )}
        {Object.keys(user).length > 0 && (
          <ul className="mb-menu__list">
            <li
              className="mb-menu__item mb-menu__user"
              onClick={() => history.push("/")}
            >
              <UserIcon className="mb-menu__icon" />
              <div>{user.displayName}</div>
            </li>
            <li
              className="mb-menu__item mb-menu__user"
              onClick={() => history.push("/profile")}
            >
              <InformationCircleIcon className="mb-menu__icon" />
              <div>Tài khoản</div>
            </li>

            <li
              className="mb-menu__item mb-menu__user"
              onClick={() => logoutHander()}
            >
              <LogoutIcon className="mb-menu__icon" />
              <div>Đăng xuất</div>
            </li>
          </ul>
        )}
      </div>
      <ul className="mb-menu__list">
        <li className="mb-menu__item">
          <Link className="mb-menu__link" to="/">
            Trang chủ
          </Link>
        </li>
        <li className="mb-menu__item">
          <Link className="mb-menu__link" to="/movie">
            Phim lẻ
          </Link>
        </li>
        <li className="mb-menu__item">
          <Link className="mb-menu__link" to="/tv">
            Phim bộ
          </Link>
        </li>
        {/* <li className="mb-menu__item">
          <Link className="mb-menu__link" to="/allmovies">
            Tất cả phim
          </Link>
        </li> */}
        <li className="mb-menu__item">
          <Link className="mb-menu__link" to="/faq">
            FAQ
          </Link>
        </li>
      </ul>
    </menu>
  );
};
export default Menu;
