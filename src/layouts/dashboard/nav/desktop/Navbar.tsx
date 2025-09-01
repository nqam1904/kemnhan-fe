import { signOut } from '@/auth/context/jwt/action';
import { useAuthContext } from '@/auth/hooks/use-auth-context';
import ImageAssets from '@/constants/ImagesAsset';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';
import React from 'react';
import { Navbar as BsNavbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
    { to: paths.dashboard.banner, label: 'Banner' },
    { to: paths.dashboard.account, label: 'Tài khoản' },
    { to: paths.dashboard.category, label: 'Danh mục' },
    { to: paths.dashboard.product, label: 'Sản phẩm' },
    { to: paths.dashboard.customer, label: 'Khách hàng' },
    { to: paths.dashboard.order, label: 'Đơn hàng' },
    // { to: paths.dashboard.media, label: 'YouTube' },
    { to: paths.dashboard.news, label: 'Khuyến mãi' },
];

const Navbar: React.FC = () => {
    const router = useRouter();
    const { user, setState } = useAuthContext();

    const onLogout = React.useCallback(() => {
        signOut()
            .then(() => {
                setState({ user: null });
                router.refresh();
            })
            .catch(() => {
                setState({ user: null });
                router.refresh();
            });
    }, [router, setState]);

    const fullName = React.useMemo(
        () => [user?.firstName, user?.lastName].filter(Boolean).join(' '),
        [user?.firstName, user?.lastName]
    );

    return (
        <BsNavbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top" className="bg-body-tertiary">
            <Container fluid>
                <BsNavbar.Brand as={Link} to={paths.main.root}>
                    <img src={ImageAssets.logo} width={50} height={50} alt="Logo" />
                </BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="responsive-navbar-nav" />
                <BsNavbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {NAV_LINKS.map((item) => (
                            <Nav.Link key={item.to} as={Link} to={item.to}>
                                {item.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                    {user && (
                        <Nav>
                            <NavDropdown title={fullName || 'Tài khoản'} align="end" id="user-nav-dropdown">
                                <NavDropdown.Item onClick={onLogout} className="text-danger">
                                    Đăng xuất
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )}
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
};

export default Navbar;
