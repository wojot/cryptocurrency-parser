import React from "react";
import { connect } from "react-redux";
import "../css/main.scss";
import { getName } from "../actions";

function App({ getName }) {
  // console.log(getName("test"));
  return <div className="App"></div>;
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  getName: shortName => dispatch(getName(shortName))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
