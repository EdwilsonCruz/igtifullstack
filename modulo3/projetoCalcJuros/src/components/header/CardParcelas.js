import React, { Component } from "react";
import css from "../header/header.module.css";

export default class cardParcelas extends Component {
  render() {
    const { numParcelas, valorCapital, valorJuros, taxaJuros } = this.props;
    return (
      <div className={css.card}>
        <div className={css.cardCenter}>
          <span>
            <strong>1</strong>
          </span>
        </div>
        <div className={css.cardHeader}>
          <span style={{ color: "#00fa00" }}>R$ 123</span>
          <span style={{ color: "#00fa00" }}>R$ 354</span>
          <span style={{ color: "rgb(255 0 141)" }}>123%</span>
        </div>
      </div>
    );
  }
}
