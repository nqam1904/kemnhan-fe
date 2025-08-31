import { signOut } from '@/auth/context/jwt/action';
import { useAuthContext } from '@/auth/hooks/use-auth-context';
import ImageAssets from '@/constants/ImagesAsset';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';
import React from 'react';
import { Navbar as BsNavbar, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const router = useRouter();
    const { user, setState } = useAuthContext();

    const onLogout = () => {
        signOut()
            .then(() => {
                setState({ user: null });
                router.refresh();
            })
            .catch(() => {
                setState({ user: null });
                router.refresh();
            });
    };

    return (
        <BsNavbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
            <BsNavbar.Brand as={Link} to={paths.dashboard.root}>
                <img src={ImageAssets.logo} width={50} height={50} alt="#" />
            </BsNavbar.Brand>
            <BsNavbar.Toggle aria-controls="responsive-navbar-nav" />
            <BsNavbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to={paths.dashboard.account}>
                        Tài khoản
                    </Nav.Link>
                    <Nav.Link as={Link} to={paths.dashboard.category}>
                        Danh mục
                    </Nav.Link>
                    <Nav.Link as={Link} to={paths.dashboard.product}>
                        Sản phẩm
                    </Nav.Link>
                    <Nav.Link as={Link} to={paths.dashboard.customer}>
                        Khách hàng
                    </Nav.Link>
                    <Nav.Link as={Link} to={paths.dashboard.order}>
                        Đơn hàng
                    </Nav.Link>
                    <Nav.Link as={Link} to={paths.dashboard.media}>
                        YouTube
                    </Nav.Link>
                    <Nav.Link as={Link} to={paths.dashboard.banner}>
                        Banner
                    </Nav.Link>
                    <Nav.Link as={Link} to={paths.dashboard.news}>
                        Tin khuyến mãi
                    </Nav.Link>
                </Nav>
                {user && (
                    <BsNavbar bg="light">
                        <BsNavbar.Brand>
                            Xin Chào: {user?.firstName + ' ' + user?.lastName}
                        </BsNavbar.Brand>
                    </BsNavbar>
                )}
                <Button onClick={onLogout} type="button" variant="outline-danger">
                    Đăng xuất
                </Button>
            </BsNavbar.Collapse>
        </BsNavbar>
    );
};

export default Navbar;
