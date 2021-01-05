import React, { Component } from "react";
import { formatNumber } from "../header/fotmat.js";
import css from "./header.module.css";
export default class Header extends Component {
  handleInputChange = (event) => {
    const newText = event.target.value;
    this.props.onChangeFilter(newText);
  };
  render() {
    const { filter, count, totalPopulation } = this.props;
    return (
      <div className={css.flexRow}>
        <input
          style={{ width: "50%" }}
          type="text"
          name="country"
          vlaue={filter}
          onChange={this.handleInputChange}
        />{" "}
        |{" "}
        <span>
          Países: <strong>{count} </strong>
        </span>{" "}
        |{" "}
        <span className={css.info}>
          População: <strong> {formatNumber(totalPopulation)}</strong>
        </span>
      </div>
    );
  }
}
