import React, { Component } from "react";
import Countreis from "./components/countries/Countreis";

import Header from "./components/header/Header";


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      allCountries: [],
      filteredCountries: [],
      filter: "",
      filterPopulation: 0,
    };
  }
  async componentDidMount() {
    const res = await fetch("https://restcountries.eu/rest/v2/all/");
    const json = await res.json();
    const allCountries = json.map(
      ({ name, capital, numericCode, flag, population }) => {
        return {
          id: numericCode,
          name,
          nameFilter: name.toLowerCase(),
          capital,
          flag,
          population,
        };
      }
    );
    const totalPopulation = this.calcTotalPopulationFrom(allCountries);

    this.setState({
      allCountries,
      filteredCountries: allCountries,
      filterPopulation: totalPopulation,
    });
  }

  calcTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((acc, curr) => {
      return acc + curr.population;
    }, 0);
    return totalPopulation;
  };

  handleChangeFilter = (newText) => {
    //console.log(newText);
    this.setState({ filter: newText });
    const newTextLowerCase = newText.toLowerCase();
    const filteredCountries = this.state.allCountries.filter((country) => {
      return country.nameFilter.includes(newTextLowerCase);
    });
    const totalPopulation = this.calcTotalPopulationFrom(filteredCountries);

    this.setState({
      filteredCountries,
      filterPopulation: totalPopulation,
    });
  };

  render() {
    const { filteredCountries, filter, filterPopulation } = this.state;
    return (
      <div className="container">
        <h1>React 2 Countreis</h1>
        <Header
          filter={filter}
          count={filteredCountries.length}
          totalPopulation={filterPopulation}
          onChangeFilter={this.handleChangeFilter}
        />
        <Countreis countries={filteredCountries} />
      </div>
    );
  }
}
