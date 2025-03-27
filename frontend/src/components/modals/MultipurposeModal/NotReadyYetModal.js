import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const MultipurposeModal = (content) => {
  const headerStyle = {
    backgroundColor: content?.color
  }

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={headerStyle} closeButton>
          <Modal.Title>{content?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{content?.text}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MultipurposeModal
