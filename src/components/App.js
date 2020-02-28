import React, { useState } from "react";
import { connect } from "react-redux";
import "../css/main.scss";
import { getName } from "../actions";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function App({ getName }) {
  const [input, setInput] = useState(
    "Example {{ Name/BTC }} ({{ Price/BTC }}) test"
  );
  const [output, setOutput] = useState("");

  const handleInput = event => {
    setInput(event.target.value);
  };

  const isOdd = num => {
    return num % 2;
  };

  const parseInput = () => {
    let fullInputTable = [];
    let outputText = "";

    input.split("{{ ").forEach(slice => {
      fullInputTable = fullInputTable.concat(slice.split(" }}"));
    });

    fullInputTable.forEach((slice, index) => {
      if (isOdd(index)) {
        slice = `-->${slice}<--`;
      }
      outputText += slice;
    });

    setOutput(outputText);
  };

  // console.log(getName("test"));

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1>Cryptocurrencies Parser</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Paste source article text:</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                onChange={event => handleInput(event)}
                value={input}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Output:</Form.Label>
              <Form.Control as="textarea" rows="5" defaultValue={output} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="outline-dark" onClick={parseInput} block>
              Convert
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  getName: shortName => dispatch(getName(shortName))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
