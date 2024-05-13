import React from "react";
import { useState, useEffect } from "react";
import "./Countries.css";

const Tile = ({ flagUrl, name, altFlag }) => {
    return (
        <div className="countryCard">
            <img src={flagUrl} alt={altFlag} className="flag-image" />
            <h2>{name}</h2>
        </div>
    );
};


function Countries() {
  const API_URL = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Encountered error: ", error));
  }, []);

 
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log({ countries });

  return (
    <div className="container">
      <input
        className="Search"
        type="text"
        placeholder="Search for countries"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="countries">
        {filteredCountries.map((country) => (
          <Tile
            key={country.cca2}
            flagUrl={country.flags.png}
            name={country.name.common}
            altFlag={country.flags.alt}
          />
        ))}
      </div>
    </div>
  );
}

export default Countries;
