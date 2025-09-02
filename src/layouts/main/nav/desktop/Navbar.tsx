import '../Navbar.css';

import type { MouseEvent } from 'react';

import { paths } from '@/routes/paths';
import { Link } from 'react-router-dom';
import { useMemo, useCallback } from 'react';
import ImageAssets from '@/constants/ImagesAsset';

import NavbarMobile from '../mobile/NavbarMobile';

function Navbar() {

    const scrollToId = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    const makeNavHandler = useCallback(
        (id: string) =>
            (e: MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                scrollToId(id);
            },
        [scrollToId]
    );
    const navItems = useMemo(
        () => [
            { label: 'Trang chủ', id: 'home' },
            { label: 'Sản phẩm', id: 'product' },
            { label: 'Liên hệ', id: 'footer' },
        ],
        []
    );

    return (
        <div className="nav" style={{ backgroundImage: `url(${ImageAssets.header})` }}>
            <div className="group-logo">
                <Link to="/">
                    <img src={ImageAssets.logo} alt="logo" className="logo1" />
                    <img src={ImageAssets.kemnhanonline} alt="kemnhanonline" className="logo-title" />
                </Link>
            </div>
            <div className="links">
                {navItems.map((item) => (
                    <Link key={item.id} to="/" onClick={makeNavHandler(item.id)}>
                        {item.label}
                    </Link>
                ))}
                <Link to={paths.main.news}>Tin tức</Link>

                <Link to={paths.main.cart}>
                    <div className="button-cart">
                        <img src={ImageAssets.icCart} alt="cart" className="ic_cart" />
                        <p className="title_cart">Giỏ hàng</p>
                    </div>
                </Link>
            </div>
            <NavbarMobile />

        </div>
    );
}

export default Navbar;
