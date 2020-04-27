import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "../../CSS/footer.css";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer footer-color">
          <Container fluid>
            <p className="copyright" style={{ marginBottom: "0rem" }}>
              &copy; {new Date().getFullYear()}
              {" All rights reserved."}
            </p>
          </Container>
        </footer>
      </div>
    );
  }
}

export default Footer;
