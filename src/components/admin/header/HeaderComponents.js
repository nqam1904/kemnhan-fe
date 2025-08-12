import React, { Component } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { history } from '../../../configureStore';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { logout: false };
    }

    onLogout = () => {
        localStorage.clear('token');
        localStorage.clear('userData');
        this.setState({ logout: true });
    };
    render() {
        const { logout } = this.state;
        if (this.props.data === null || logout === true) {
            return history.push('/login');
        }
        const user = JSON.parse(localStorage.getItem('userData'));
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand as={Link} to="/admin">
                    <img src={require('../../../res/image/logo.png').default} width={50} height={50} alt="#" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/admin/account">
                            Tài khoản
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/category">
                            Danh mục
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/product">
                            Sản phẩm
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/customer">
                            Khách hàng
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/order">
                            Đơn hàng
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/media">
                            YouTube
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/news">
                            Tin khuyến mãi
                        </Nav.Link>
                    </Nav>
                    <Navbar bg="dark">
                        <Navbar.Brand>Xin Chào: {user?.firstName + ' ' + user?.lastName}</Navbar.Brand>
                    </Navbar>
                    <Button onClick={() => this.onLogout()} type="button" variant="outline-success">
                        Đăng xuất
                    </Button>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
