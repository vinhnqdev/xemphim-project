import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-full.png";
import Menu from "./Menu";
import Backdrop from "./Backdrop";
import { useDispatch } from "react-redux";
import { filterActions } from "../../app/filterSlice";

const Header = (props) => {
  const [isShowBg, setIsShowBg] = useState(false);
  const [isToggleMenu, setIsToggleMenu] = useState(false);
  const dispatch = useDispatch();
  const scrollHandler = () => {
    if (window.scrollY > 100) {
      setIsShowBg(true);
    } else {
      setIsShowBg(false);
    }
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
        <Link to="login" className="nav__btn">
          Đăng nhập
        </Link>
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
