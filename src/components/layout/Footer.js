import { Link } from "react-router-dom";
import { footerData } from "../../assets/fakedata/FooterContent";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <h3 className="footer__title u-mbt-medium">
          Phim chất lượng cao online của{" "}
          <a className="footer__link" href="https://xemphim.club/">
            XemPhim
          </a>{" "}
          khác gì so với các trang phim khác?
        </h3>
        <ul className="footer__list u-mbt-medium">
          {Array.isArray(footerData) &&
            footerData.map((data, index) => (
              <li key={index} className="footer__item">
                {data}
              </li>
            ))}
        </ul>
        <div className="footer__contact">
          <Link to="/contact" className="footer__link footer__link--thick">
            Liên hệ
          </Link>
          <a
            href="https://www.facebook.com/XemPhim.Official/"
            className="footer__social"
          >
            <i className="fab fa-facebook-square"></i>
            XemPhim.Official
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
