import { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import routes from 'routes';
import ScrollToTop from 'utils/scrollToTop';
import AboutComponents from '../about/AboutComponents';
import Footer from '../footer/Footer';
import LandingPage from '../landing-page/LandingPage';
import ProductList from '../landing-page/ProductList';
import Navbar from '../navbar/Navbar';

interface HomeComponentsState {
    modal: boolean;
}

class HomeComponents extends Component<{}, HomeComponentsState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            modal: false,
        };
    }

    componentDidMount() {
        // this.setState({
        //   modal: true
        // })
    }

    render(): React.ReactNode {
        const { modal } = this.state;
        return (
            <div className="wrapper">
                {/* <div class="pyro"><div class="before"></div><div class="after"></div></div> */}
                <Modal
                    show={modal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={() => {
                        this.setState({ modal: false });
                    }}
                >
                    <Modal.Header closeButton {...({} as any)}>
                        <Modal.Title {...({} as any)}>Kemnhanonline thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Kính chúc quý khách 1 năm mới an khang thịnh vượng, tấn tài tấn lộc, vạn sự
                        như ý
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            onClick={() => {
                                this.setState({ modal: false });
                            }}
                        >
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Navbar />

                <Routes>
                    {routes
                        .filter(
                            (prop) => prop.layout === `/trang-chu` || prop.layout === `/success`
                        )
                        .map((prop, key) => (
                            <Route
                                key={key}
                                path={prop.path}
                                element={<prop.component someThingProps="this is some props" />}
                            />
                        ))}
                </Routes>

                {window.location.pathname !== '/chi-tiet-san-pham' && (
                    <>
                        {/* <NewsComponents /> */}
                        <LandingPage />
                        <ProductList />
                        <AboutComponents />
                    </>
                )}

                <ScrollToTop />
                <Footer />
            </div>
        );
    }
}

export default HomeComponents;
