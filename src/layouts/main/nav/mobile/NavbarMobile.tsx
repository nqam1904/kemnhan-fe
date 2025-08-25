import ImageAssets from 'constants/ImagesAsset';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function NavbarMobile() {
    return (
        <>
            <label htmlFor="nav-mobile-input" className="menu__btn">
                <img src={ImageAssets.logo} alt="logo" className="logo_mobile" />
            </label>
            <input type="checkbox" id="nav-mobile-input" className="visually-hidden" hidden />
            <label htmlFor="nav-mobile-input" className="menu__overplay"></label>
            <nav className="menu__item__mobile">
                <label htmlFor="nav-mobile-input" className="menu__mobile__close">
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="times"
                        className="svg-inline--fa fa-times fa-w-11"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 352 512"
                    >
                        <path
                            fill="currentColor"
                            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                        ></path>
                    </svg>
                </label>
                <Link to="/" className="titile__link_mobile">
                    <p className="titile__item">Trang chủ</p>
                </Link>
                <HashLink smooth to="#product" className="titile__link_mobile">
                    <p className="titile__item">Sản phẩm</p>
                </HashLink>
                <HashLink smooth to="#about" className="titile__link_mobile">
                    <p className="titile__item">Giới thiệu</p>
                </HashLink>
                <HashLink smooth to="#footer" className="titile__link_mobile">
                    <p className="titile__item">Liên hệ</p>
                </HashLink>
                <Link to="/gio-hang" className="titile__link_mobile">
                    <div className="button-cart titile__item">
                        <img src={ImageAssets.icCart} alt="cart" className="ic_cart" />
                        <p className="title_cart">Giỏ hàng</p>
                    </div>
                </Link>
            </nav>
        </>
    );
}

export default NavbarMobile;
