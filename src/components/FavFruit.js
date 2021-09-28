import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import ModalForm from "./ModalForm";

class FavFruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favFruit: [],
      selectedObj: {},
      showModal: false,
    };
  }

  // method to get the favFruit:
  componentDidMount = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/favFruit/${this.props.auth0.user.email}`
      )
      .then((respond) => {
        this.setState({ favFruit: respond.data });
      });
  };

  // method to deldetData:
  deleteData = (fruitId) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/favFruit/${fruitId}`)
      .then((respond) => {
        if (respond.data.deletedCount === 1) {
          const filtteredArray = this.state.favFruit.filter(
            (fruit) => fruit._id !== fruitId
          );
          this.setState({ favFruit: filtteredArray });
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  //...................................
  //To update:

  handleModal = (fruitObj) => {
    this.setState({
      selectedObj: fruitObj,
      showModal: !this.state.showModal,
    });
  };

  handleForm = (e) => {
    e.preventDefault();
    const reqbody = {
      name: e.target.name.value,
      price: e.target.price.value,
      image: e.target.image.value,
      email: this.props.auth0.user.email,
    };
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/favFruit/${this.state.selectedObj._id}`,
        reqbody
      )
      .then((respond) => {
        // loop to match the ids with choosen one:
        const newArray = this.state.favFruit.map((el) => {
          if (el._id === this.state.selectedObj._id) {
            return el;
          }
          return el; // to not get undifiend
        });
        this.setState({
          favFruit: newArray,
          selectedObj: {},
        });
        console.log(this.state.favFruit);
        console.log(respond);

        this.handleModal();
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  //....................................
  render() {
    return (
      <>
        {this.state.showModal && (
          <ModalForm
            show={this.state.showModal}
            handleClose={this.handleModal}
            handleForm={this.handleForm}
            selectedObj={this.state.selectedObj}
          />
        )}

        {this.state.favFruit.map((el) => {
          return (
            <>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={el.image} />
                <Card.Body>
                  <Card.Title>{el.name}</Card.Title>
                  <Card.Text>{el.price}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      this.deleteData(el._id);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      this.handleModal(el);
                    }}
                  >
                    update
                  </Button>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </>
    );
  }
}

export default withAuth0(FavFruit);
