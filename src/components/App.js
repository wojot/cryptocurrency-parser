import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getNames, getPrices, clearLastConversion } from "../actions";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function App({
  getNames,
  getPrices,
  clearLastConversion,
  names,
  prices,
  error,
}) {
  const [input, setInput] = useState(
    "Example {{ Name/BTC }} ({{ Price/BTC }}) test In 1998, Wei Dai published a description of b-money, characterized as an anonymous, distributed electronic cash system.Shortly thereafter, Nick Szabo described bit gold. Like {{ Name/BTC }} and other cryptocurrencies that would follow it, bit gold (not to be confused with the later gold-based exchange, {{ Name/BITGOLD }}) was described as an electronic currency system which required users to complete a proof of work function with solutions being cryptographically put together and published. A currency system based on a reusable proof of work was later created by Hal Finney who followed the work of Dai and Szabo. The first decentralized cryptocurrency, {{ Name/BTC }} ({{ Price/BTC }}), was created in 2009 by pseudonymous developer Satoshi Nakamoto. It used SHA-256, a cryptographic hash function, as its proof-of-work scheme. In April 2011, {{ Name/NMC }}  ({{ Price/NMC }}) was created as an attempt at forming a decentralized DNS, which would make internet censorship very difficult. Soon after, in October 2011, {{ Name/LTC }}  ({{ Price/LTC }}) was released. It was the first successful cryptocurrency to use scrypt as its hash function instead of SHA-256. Another notable cryptocurrency, {{ Name/PPC }}  ({{ Price/PPC }}) was the first to use a proof-of-work/proof-of-stake hybrid."
  );
  const [output, setOutput] = useState("");
  const [symbols, setSymbols] = useState([]);
  const [priceSymbols, setPriceSymbols] = useState([]);

  useEffect(() => {
    if (names.length > 0 || prices.length > 0) {
      let outputText = "";
      let fullInputTable = [];

      input.split("{{ ").forEach((slice) => {
        fullInputTable = fullInputTable.concat(slice.split(" }}"));
      });

      fullInputTable.forEach((slice, index) => {
        if (isOdd(index)) {
          if (splitForType(slice) === "Name") {
            let currSymbol = splitForCurrency(slice);
            let currName = names.find((curr) => curr.symbol === currSymbol);
            if (currName) {
              slice = currName.name;
            }
          }

          if (splitForType(slice) === "Price") {
            let currPriceSymbol = splitForCurrency(slice);
            let currPrice = prices.find(
              (curr) => curr.priceSymbol === currPriceSymbol
            );
            if (currPrice) {
              slice = `$${currPrice.price}`;
            }
          }
        }
        outputText += slice;
      });
      setOutput(outputText);
    }
  });

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const isOdd = (num) => {
    return num % 2;
  };

  const splitForType = (source) => {
    return source.split("/")[0];
  };

  const splitForCurrency = (source) => {
    return source.split("/")[1];
  };

  const parseInput = () => {
    clearLastConversion();
    setSymbols([]);
    setPriceSymbols([]);

    let fullInputTable = [];

    input.split("{{ ").forEach((slice) => {
      fullInputTable = fullInputTable.concat(slice.split(" }}"));
    });

    fullInputTable.forEach((slice, index) => {
      if (isOdd(index)) {
        if (splitForType(slice) === "Name") {
          let currSymbol = splitForCurrency(slice);
          if (symbols.indexOf(currSymbol) === -1) symbols.push(currSymbol);
        }

        if (splitForType(slice) === "Price") {
          let currPrice = splitForCurrency(slice);
          if (priceSymbols.indexOf(currPrice) === -1)
            priceSymbols.push(currPrice);
        }
      }
    });

    getNames(symbols);
    getPrices(priceSymbols);
  };

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
                rows="30"
                onChange={(event) => handleInput(event)}
                value={input}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Output:</Form.Label>
              <Form.Control
                as="textarea"
                rows="30"
                defaultValue={error ? error : output}
              />
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

const mapStateToProps = (state) => ({
  names: state.currencies.names,
  prices: state.currencies.prices,
  error: state.currencies.error,
});
const mapDispatchToProps = (dispatch) => ({
  getNames: (symbols) => dispatch(getNames(symbols)),
  getPrices: (priceSymbols) => dispatch(getPrices(priceSymbols)),
  clearLastConversion: () => dispatch(clearLastConversion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
