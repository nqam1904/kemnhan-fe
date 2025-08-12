import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

function NewsComponents() {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <div id="news" onClick={() => handleShow()}>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>heello</Modal.Footer>
            </Modal>
        </div>
    );
}

export default NewsComponents;
