import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-full.png";
import Menu from "./Menu";
import Backdrop from "./Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../../app/filterSlice";
import { signOut, getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";
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
            <i
              className="fas fa-chevron-down"
              style={{ marginLeft: "10px" }}
            ></i>
            <ul className="subnav">
              <li className="subnav__quit">
                <span onClick={logoutHander}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M48 64h132c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H48c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h132c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48zm279 19.5l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l132 131.4H172c-6.6 0-12 5.4-12 12v10c0 6.6 5.4 12 12 12h279.9L320 404.4c-4.7 4.7-4.7 12.3 0 17l7.1 7.1c4.7 4.7 12.3 4.7 17 0l164.5-164c4.7-4.7 4.7-12.3 0-17L344 83.5c-4.7-4.7-12.3-4.7-17 0z"></path>
                  </svg>
                  Thoát
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
      <Menu isToggle={isToggleMenu} />
    </header>
  );
};
export default Header;
