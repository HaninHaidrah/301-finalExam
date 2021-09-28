import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruit: [],
    };
  }
  // method to get the data from the server:
  componentDidMount = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/fruit`).then((respond) => {
      this.setState({ fruit: respond.data.fruits });
    });
  };
  // function to add the favourite ones:
  addToFav = (reqbody) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/favFruit`,reqbody);
  };
  //.............................................
  render() {
    console.log(this.state.fruit);
    return (
      <>
        <Container>
          <Row>
            {this.state.fruit.map((piece) => {
              return (
                <>
                  <Col>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img variant="top" src={piece.image} />
                      <Card.Body>
                        <Card.Title>{piece.name}</Card.Title>
                        <Card.Text>{piece.price}</Card.Text>
                        <Button variant="primary" onClick={()=>{this.addToFav({
                          name:piece.name,
                          image:piece.image,
                          price:piece.price,
                          email:this.props.auth0.user.email
                        })}}>Go ADD to Fav</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </Container>
      </>
    );
  }
}

export default withAuth0 (Home);
