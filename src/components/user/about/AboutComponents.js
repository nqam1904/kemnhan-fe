import { Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import './About.css';
import VideoYoutube from './VideoYoutube';
import axios from 'axios';
import { API_URL } from '../../../config/setting';
import { toast, ToastContainer } from "react-toastify";

class AboutComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
            value: ""
        }
    }
    componentDidMount() {
        this.getMedia();
    }
    getMedia = () => {
        axios.get(`${API_URL}/settings`)
            .then(res => {
                this.setState({
                    value: res.data[0].value
                }, () => {
                    console.log(res.data[0].value.split("https://www.youtube.com/watch?v=")[1]);
                })

            }).catch(error => console.log(error))
    }
    render() {
        const { isShowModal, value } = this.state;
        return (
            <div className="about" id="about">

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
                                Giới thiệu về kemnhanonline
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <div className="row">
                                <div className="col-lg-6 col-sm-6 col-xs-6">
                                    <div style={{ textAlign: 'center' }}>
                                        <img src={require('../../../res/image/about.png').default} width={300} alt="menu" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6 col-xs-6">
                                    <div style={{ textAlign: 'center' }}>
                                        <p>
                                            Từ hôm nay là bắt đầu đếm lịch âm, 20 TẾT rồi mọi người ơiii 🧧🧧🧧
                                            Đến hẹn lại lên mình bắt đầu nhận ODER KEM CHO TẾT nha khách
                                            📍 Nhận oder từ ngày 1/2- 7/2 ( 20 tết đến 26 tết ) mình chốt oder.
                                            👉🏻 Giao kem vào 27 - 28 TẾT 🚚
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>

                    </Modal>
                </div >
                <div className="about_video">
                    <VideoYoutube videoId={value.split("https://www.youtube.com/watch?v=")[1]} />
                </div>
            </div >

        );
    }
}

export default AboutComponents;