import './NavbarMobile.css';

import { paths } from '@/routes/paths';
import { Link } from 'react-router-dom';
import ImageAssets from '@/constants/ImagesAsset';
import { phones, socials, navItems } from '@/constants/mobile-nav';

const MENU_INPUT_ID = 'nav-mobile-input';

function NavbarMobile() {
    return (
        <>
            <div className="mobile-topbar" aria-label="Thanh tiêu đề di động">
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
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
                <Link to="/" className="mobile-topbar__logo" aria-label="Trang chủ">
                    <img src={ImageAssets.logo} alt="logo" className="logo_mobile" />
                </Link>
                <Link to={paths.main.cart} className="menu__search" aria-label="Giỏ hàng">
                    <img src={ImageAssets.icCart} alt="cart" width={30} height={30} />
                </Link>
            </div>
            <input type="checkbox" id={MENU_INPUT_ID} className="visually-hidden" />
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
                <a
                    href="#"
                    className="menu__mobile__close"
                    aria-label="Đóng menu"
                    onClick={(e) => {
                        e.preventDefault();
                        const input = document.getElementById(MENU_INPUT_ID) as HTMLInputElement | null;
                        if (input) input.checked = false;
                    }}
                >
                    <img src={ImageAssets.ic_close_cancel} alt="" width={32} height={32} />
                </a>

                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        to={item.to}
                        className="titile__link_mobile"
                        onClick={() => {
                            const input = document.getElementById(MENU_INPUT_ID) as HTMLInputElement | null;
                            if (input) input.checked = false;
                        }}
                    >
                        <p className="titile__item">{item.label}</p>
                    </Link>
                ))}

                <Link
                    to={paths.main.cart}
                    className="titile__link_mobile"
                    onClick={() => {
                        const input = document.getElementById(MENU_INPUT_ID) as HTMLInputElement | null;
                        if (input) input.checked = false;
                    }}
                >
                    <div className="button-cart titile__item">
                        <img src={ImageAssets.icCart} alt="cart" className="ic_cart" />
                        <p className="title_cart">Giỏ hàng</p>
                    </div>
                </Link>

                <div className="menu__mobile__section">
                    <div className="menu__mobile__title">Liên hệ</div>
                    <div className="menu__mobile__contacts">
                        {phones.map((p) => (
                            <a key={p.tel} href={`tel:${p.tel}`} className="menu__mobile__contact" aria-label={`Gọi ${p.label}`}>
                                <span className="mmc-icon" aria-hidden="true">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 01.99-.25c1.09.36 2.27.55 3.49.55a1 1 0 011 1V21a1 1 0 01-1 1C11.4 22 2 12.6 2 1a1 1 0 011-1h3.52a1 1 0 011 1c0 1.22.19 2.4.55 3.49a1 1 0 01-.25.99l-2.2 2.2z" fill="#fa541c" />
                                    </svg>
                                </span>
                                <span>{p.label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="menu__mobile__section">
                    <div className="menu__mobile__title">Mạng xã hội</div>
                    <div className="menu__mobile__socials">
                        {socials.map((s) => (
                            <a href={s.link} key={s.id} className="menu__mobile__social" target="_blank" rel="noreferrer">
                                <img src={s.image} width={24} height={24} alt={s.text} />
                                <span>{s.text}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavbarMobile;
