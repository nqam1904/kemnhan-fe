import { Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import './About.css';
import VideoYoutube from './VideoYoutube';

class AboutComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
        }
    }
    render() {
        const { isShowModal } = this.state;
        return (
            <div className="about">
                <div className="about_text">
                    <h2 className="sub_text">Chất lượng</h2>
                    <p className="sub_text1">100%</p>
                    <p className="sub_text2">
                        Kem không chỉ ngon mà còn đảm bảo chất lượng,
                        sức khỏe 100%. được bộ y tế cấp phép và
                        chứng nhận thực phẩm sạch các bạn nhé.
                            </p>
                    <div className="btn_image" onClick={() => {
                        this.setState({
                            isShowModal: !isShowModal

                        })
                    }}><span>Khám phá ngay</span></div>
                    <Modal show={isShowModal}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        onHide={() => { this.setState({ isShowModal: false }) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Kemnhanonline
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <div style={{ textAlign: 'center' }}>
                                <img src={require('../../../res/image/menu.jpg').default} width={700} alt="menu" />
                            </div>
                        </Modal.Body>

                    </Modal>
                </div>
                <div className="about_video">
                    <VideoYoutube videoId="8oPjKKiooZA" />
                </div>
            </div>

        );
    }
}

export default AboutComponents;