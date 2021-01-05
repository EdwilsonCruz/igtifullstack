import React, { Component } from "react";
import css from "./countreis.module.css";
import Country from "./Country";

export default class Countreis extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
    };
  }
  async componentDidMount() {
    console.log("ComponentDidMount de Countries.js");
    //const res = await fetch("https://restcountries.eu/rest/v2/all/");
    //console.log(res);
    //const json = await res.json();
    //console.log(json);
    //this.setState({ countries: json });
  }

  render() {
    const { countries } = this.props;
    //console.log(countries);
    return (
      <div>
        <ul>
          {countries.map((country) => {
            return (
              <li className={css.flexRow} key={country.id}>
                <Country country={country} />
                {/*<img
                  className={css.avatar}
                  src={country.flag}
                  alt={country.name}
                />
                <span>{country.name}</span>
                <span>Capital: {country.capital}</span>
                 <span>
                  {country.location.street.name} - N° {country.location.street.number}
                  , {country.location.city} , {country.location.state}
                </span> */}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
