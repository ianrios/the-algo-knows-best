import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function BootstrapModal(props) {

    return (
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>End of Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>You have listened through the randomly generated playlist. Feel free to view the results, or generate a new playlist.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.closeAndRepeat}>
                    Listen Again
                </Button>
                <Button variant="primary" onClick={props.viewResults}>
                    View Results
                </Button>
            </Modal.Footer>
        </Modal>
    );
}