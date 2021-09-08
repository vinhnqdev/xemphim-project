import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-full.png";
import avatar from "../../assets/images/avatar.png";
import Menu from "./Menu";
import Backdrop from "./Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../../app/filterSlice";
import { signOut, getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";
import {
  UserCircleIcon,
  CogIcon,
  LogoutIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";

const Header = (props) => {
  const [isShowBg, setIsShowBg] = useState(false);
  const [isToggleMenu, setIsToggleMenu] = useState(false);
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const scrollHandler = () => {
    if (window.scrollY > 100) {
      setIsShowBg(true);
    } else {
      setIsShowBg(false);
    }
  };

  const logoutHander = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const toggleMenuHandler = () => {
    setIsToggleMenu((prevState) => !prevState);
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <header className={`header ${isShowBg && "header--bg"}`}>
      <div className="mb-header__toggle" onClick={toggleMenuHandler}>
        <i className="fas fa-bars"></i>
      </div>
      <Link className="header__logo" to="/">
        <img
          src={logo}
          alt="Main Logo"
          onClick={() => dispatch(filterActions.resetFilter())}
        />
      </Link>

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link className="nav__link" to="/search">
              <i className="fas fa-search"></i>Tìm kiếm
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/movie" className="nav__link">
              Phim lẻ
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/tv" className="nav__link">
              Phim bộ
            </Link>
          </li>
          {/* <li className="nav__item">
            <Link to="allmovies" className="nav__link">
              Tất cả phim
            </Link>
          </li> */}
          <li className="nav__item">
            <Link to="faq" className="nav__link">
              FAQ
            </Link>
          </li>
        </ul>
        {Object.keys(user).length !== 0 && (
          <div
            className="nav__link nav__link--info"
            style={{ right: "-1.5rem" }}
          >
            {user.displayName}
            {user.photoURL && (
              <img
                className="nav__link--avatar"
                src={user.photoURL}
                alt="your avatar"
              />
            )}
            {!user.photoURL && (
              <img
                className="nav__link--avatar"
                src={avatar}
                alt="your avatar"
              />
            )}
            <ChevronDownIcon style={{ height: "20px", marginLeft: "5px" }} />
            <ul className="subnav">
              {/* Change Password */}
              <li className="subnav__item">
                <span onClick={() => history.push("/change-password")}>
                  <CogIcon />
                  Đổi mật khẩu
                </span>
              </li>

              {/* Profile*/}
              <li className="subnav__item">
                <span onClick={() => history.push("/profile")}>
                  <UserCircleIcon />
                  Thông tin cá nhân
                </span>
              </li>
              {/* Log out */}
              <li className="subnav__item">
                <span onClick={logoutHander}>
                  <LogoutIcon />
                  Đăng xuất
                </span>
              </li>
            </ul>
          </div>
        )}
        {Object.keys(user).length === 0 && (
          <Link to="/login" className="nav__btn">
            Đăng nhập
          </Link>
        )}
      </nav>

      {/* Header for Mobile */}
      <Link className="mb-header__search" to="/search">
        <i className="fas fa-search"></i>Tìm kiếm
      </Link>
      {isToggleMenu && <Backdrop onClick={toggleMenuHandler} />}
      <Menu isToggle={isToggleMenu} logoutHander={logoutHander} />
    </header>
  );
};
export default Header;
