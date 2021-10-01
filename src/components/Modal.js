import React from 'react'
import { Button, Modal, Row, Col } from 'react-bootstrap'
import Icon from './Icon';

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
                    <Col xs={8}>Did you enjoy your Listening Experience?</Col>
                    <Col xs={4}>{props.likeModule}</Col>
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
                    <span className='me-2'><Icon type="save" /></span>
                    {props.primaryBtnText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}