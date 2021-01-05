import React, { Component } from "react";
import css from "./countreis.module.css";
export default class Country extends Component {
  render() {
    const { country } = this.props;
    //console.log(this.props.country);
    return (
      <>
        <img className={css.avatar} src={country.flag} alt={country.name} />
        <span>{country.name}</span>
        <span>Capital: {country.capital}</span>
      </>
    );
  }
}
