import { paths } from '@/routes/paths';
import { Link } from 'react-router-dom';
import ImageAssets from '@/constants/ImagesAsset';

const MENU_INPUT_ID = 'nav-mobile-input';

function NavbarMobile() {
    const navItems = [
        { type: 'link' as const, to: '/', label: 'Trang chủ' },
        { type: 'hash' as const, to: '#product', label: 'Sản phẩm' },
        { type: 'hash' as const, to: '#about', label: 'Giới thiệu' },
        { type: 'hash' as const, to: '#footer', label: 'Liên hệ' },
        { type: 'link' as const, to: paths.main.news, label: 'Tin tức' },
    ];

    return (
        <>
            <button
                type="button"
                className="menu__btn"
                aria-controls="mobile-menu"
                aria-label="Mở menu"
                onClick={() => {
                    const input = document.getElementById(MENU_INPUT_ID) as HTMLInputElement | null;
                    if (input) input.checked = true;
                }}
            >
                <img src={ImageAssets.logo} alt="logo" className="logo_mobile" />
            </button>
            <input type="checkbox" id={MENU_INPUT_ID} className="visually-hidden" hidden />
            <button
                type="button"
                className="menu__overplay"
                aria-hidden="true"
                tabIndex={-1}
                onClick={() => {
                    const input = document.getElementById(MENU_INPUT_ID) as HTMLInputElement | null;
                    if (input) input.checked = false;
                }}
                aria-label="Đóng menu"
            />
            <nav className="menu__item__mobile" id="mobile-menu" aria-label="Menu điều hướng">
                <button
                    type="button"
                    className="menu__mobile__close"
                    aria-label="Đóng menu"
                    onClick={() => {
                        const input = document.getElementById(MENU_INPUT_ID) as HTMLInputElement | null;
                        if (input) input.checked = false;
                    }}
                >
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
                        />
                    </svg>
                </button>

                {navItems.map((item) =>
                    item.type === 'hash' ? (
                        <Link key={item.label} to={item.to} className="titile__link_mobile">
                            <p className="titile__item">{item.label}</p>
                        </Link>
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
