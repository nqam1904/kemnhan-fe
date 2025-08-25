import React, { useState } from 'react';
import { Navbar as BsNavbar, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';

import ImageAssets from 'constants/ImagesAsset';

const Navbar: React.FC = () => {
    const [, setLogout] = useState(false);

    const onLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setLogout(true);
    };

    const user = JSON.parse(localStorage.getItem('token') || 'null');
    return (
        <BsNavbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
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
                    <Nav.Link as={Link} to={paths.dashboard.news}>
                        Tin khuyến mãi
                    </Nav.Link>
                </Nav>
                <BsNavbar bg="dark">
                    <BsNavbar.Brand>
                        Xin Chào: {user?.firstName + ' ' + user?.lastName}
                    </BsNavbar.Brand>
                </BsNavbar>
                <Button onClick={onLogout} type="button" variant="outline-success">
                    Đăng xuất
                </Button>
            </BsNavbar.Collapse>
        </BsNavbar>
    );
};

export default Navbar;
