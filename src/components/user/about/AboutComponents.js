import axios from 'axios';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { API_URL } from '../../../config/setting';
import './About.css';
import VideoYoutube from './VideoYoutube';

class AboutComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
            value: '',
        };
    }
    componentDidMount() {
        this.getMedia();
    }
    getMedia = () => {
        axios
            .get(`${API_URL}/settings`)
            .then((res) => {
                this.setState({
                    value: res.data[0].value,
                });
            })
            .catch((_error) => {});
    };
    render() {
        const { isShowModal, value } = this.state;
        return (
            <div className="about" id="about">
                <div className="about_text">
                    <h2 className="sub_text">Chất lượng</h2>
                    <p className="sub_text1">100%</p>
                    <p className="sub_text2">
                        Kem không chỉ ngon mà còn đảm bảo chất lượng, sức khỏe 100%. được bộ y tế cấp phép và chứng nhận thực phẩm sạch các bạn nhé.
                    </p>
                    <div
                        className="btn_image"
                        onClick={() => {
                            this.setState({
                                isShowModal: !isShowModal,
                            });
                        }}
                    >
                        <span>Khám phá ngay</span>
                    </div>
                    <Modal
                        show={isShowModal}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        onHide={() => {
                            this.setState({ isShowModal: false });
                        }}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Giới thiệu về kemnhanonline</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-lg-6 col-sm-6 col-xs-6">
                                    <div style={{ textAlign: 'center' }}>
                                        <LazyLoadImage src={require('../../../res/image/about.png').default} width={300} alt="menu" effect="blur" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6 col-xs-6">
                                    <div style={{ textAlign: 'center' }}>
                                        <p>
                                            🌸 KEMNHANONLINE KHAI XUÂN ĐẦU NĂM MỚI VÀO NGÀY 19/02/2021 ( M8 AL ) 🌸 Kính chúc cả nhà #kemnhanonline
                                            một năm mới Vạn sự như ý - Giàu sang phú quý 💰💰💰 Nhân dịp năm mới trong 3 ngày MỒNG 8 - 9 - 10 khi oder
                                            kem khách sẽ được nhận ngay bao lì xì may mắn đi kèm 🧧 Cám ơn quý khách đã luôn ủng hộ #kemnhanonline
                                            trong suốt thời gian qua ❤️ 📺 Ins : kemnhanonline 📲 Hotline : 0977667866 📮 Add : 72 Trương Quyền P6 Q3
                                            1090 Trường Sa P12 Q3
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="about_video">
                    <VideoYoutube videoId={value.split('https://www.youtube.com/watch?v=')[1]} />
                </div>
            </div>
        );
    }
}

export default AboutComponents;
