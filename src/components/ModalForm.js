import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import {Modal,Button,Form} from 'react-bootstrap'


class favModalForm extends React.Component {
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.props.handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name of Fruit</Form.Label>
                <Form.Control type="text" defaultValue={this.props.selectedObj.name} name='name'/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Image of the fruit</Form.Label>
                <Form.Control  type="text" defaultValue={this.props.selectedObj.image} name='image'/>
              </Form.Group>
            
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>price of the fruit</Form.Label>
                <Form.Control  type="text" defaultValue={this.props.selectedObj.price} name='price'/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control  type="text" defaultValue={this.props.auth0.user.email} name='Email'/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default  withAuth0(favModalForm);
