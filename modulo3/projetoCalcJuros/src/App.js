import React, { Component } from "react";
import Header from "./components/header/Header";
import css from "./components/header/header.module.css";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>React - Juros Compostos</h1>
        <Header />
      </div>
    );
  }
}
