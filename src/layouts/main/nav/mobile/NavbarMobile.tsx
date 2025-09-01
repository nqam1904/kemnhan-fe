import { paths } from '@/routes/paths';
import ImageAssets from 'constants/ImagesAsset';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const MENU_INPUT_ID = 'nav-mobile-input';

function NavbarMobile() {
    const navItems = [
        { type: 'link' as const, to: '/', label: 'Trang chủ' },
        { type: 'hash' as const, to: '#product', label: 'Sản phẩm' },
        { type: 'hash' as const, to: '#about', label: 'Giới thiệu' },
        { type: 'hash' as const, to: '#footer', label: 'Liên hệ' },
        { type: 'link' as const, to: paths.main.news, label: 'Khuyến mãi' },
    ];

    return (
        <>
            <label htmlFor={MENU_INPUT_ID} className="menu__btn" aria-controls="mobile-menu" aria-label="Mở menu">
                <img src={ImageAssets.logo} alt="logo" className="logo_mobile" />
            </label>
            <input type="checkbox" id={MENU_INPUT_ID} className="visually-hidden" hidden />
            <label htmlFor={MENU_INPUT_ID} className="menu__overplay" aria-hidden="true"></label>
            <nav className="menu__item__mobile" id="mobile-menu" aria-label="Menu điều hướng">
                <label htmlFor={MENU_INPUT_ID} className="menu__mobile__close" aria-label="Đóng menu">
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

                {navItems.map((item) =>
                    item.type === 'hash' ? (
                        <HashLink key={item.label} smooth to={item.to} className="titile__link_mobile">
                            <p className="titile__item">{item.label}</p>
                        </HashLink>
                    ) : (
                        <Link key={item.label} to={item.to} className="titile__link_mobile">
                            <p className="titile__item">{item.label}</p>
                        </Link>
                    )
                )}

                <Link to={paths.main.cart} className="titile__link_mobile">
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
