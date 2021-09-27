import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'

export default function BootstrapModal(props) {

    return (
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.titleText}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.bodyText}
                <hr />
                <Row>
                    <div className='col-8'>Did you enjoy your Listening Experience?</div>
                    <div className='col-4'>{props.likeModule}</div>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                {(props.infoBtnText && props.infoButtonClickHandler) && <Button variant="info" onClick={props.infoButtonClickHandler}>
                    {props.infoBtnText}
                </Button>}
                <Button variant="secondary" onClick={props.secondaryButtonClickHandler}>
                    {props.secondaryBtnText}
                </Button>
                <Button variant="primary" onClick={props.primaryButtonClickHandler}>
                    {props.primaryBtnText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}