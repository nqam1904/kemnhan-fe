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

            }).catch(error => toast.danger('Có lỗi xảy ra'))
    }
    render() {
        const { isShowModal, value } = this.state;
        return (
            <div className="about">
                <ToastContainer autoClose={3000} />
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
                    <VideoYoutube videoId={value.split("https://www.youtube.com/watch?v=")[1]} />
                </div>
            </div>

        );
    }
}

export default AboutComponents;