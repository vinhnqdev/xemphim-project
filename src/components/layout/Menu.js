import { Link } from "react-router-dom";

const Menu = (props) => {
  return (
    <menu className={`mb-menu ${props.isToggle && "toggle"}`}>
      <div className="mb-menu__actions">
        <Link className="mb-menu__btn" to="/login">
          Đăng nhập
        </Link>
        <Link className="mb-menu__btn" to="/login">
          Đăng kí
        </Link>
      </div>
      <ul className="mb-menu__list">
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
        <li className="mb-menu__item">
          <Link className="mb-menu__link" to="/allmovies">
            Tất cả phim
          </Link>
        </li>
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
