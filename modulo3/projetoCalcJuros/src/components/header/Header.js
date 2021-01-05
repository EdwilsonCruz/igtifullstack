import React, { Component, Fragment } from "react";
import css from "../header/header.module.css";
import { formatNumber } from "../header/format.js";
import HeaderInput from "./headerInput";
import CardParcelas from "./CardParcelas";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      capital: "",
      jurosMensal: "",
      parcelasMensal: "",
      capitalAuxiliar: "",
    };
  }
  handlerInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    console.log(event.target.id);
  };
  render() {
    //const {} = this.props;
    return (
      <div>
        {/*<HeaderInput
          name={"Capital inicial"}
          onChangeInput={this.handlerInputChange}
        />
        <HeaderInput name={"Taxas de juros mensal"} />
        <HeaderInput name={"Periodo (meses)"} /> */}
        <form>
          <div className={css.flexRow}>
            <label>Capital inicial</label>
            <br />
            <input
              id="inputCapital"
              style={{ width: "90%" }}
              type="number"
              name="inputAuxiliar"
              onChange={this.handlerInputChange}
            />
          </div>
          <div className={css.flexRow}>
            <label>Taxas de juros mensal</label>
            <br />
            <input
              id="inputTaxas"
              style={{ width: "90%" }}
              type="number"
              name="inputAuxiliar"
              onChange={this.handlerInputChange}
            />
          </div>
          <div className={css.flexRow}>
            <label>Periodo (meses)</label>
            <br />
            <input
              id="inputMeses"
              style={{ width: "90%" }}
              type="number"
              name="inputAuxiliar"
              onChange={this.handlerInputChange}
            />
          </div>
        </form>
        <CardParcelas />
      </div>
    );
  }
}
