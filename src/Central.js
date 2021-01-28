import React, { useEffect, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InfoxBox from "./InfoxBox";

import Table from "./Table";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

import { sortData } from "./util";

const useStyles = makeStyles((theme) => ({
  appContainer: {
    display: "flex",
    margin: "30px",
    justifyContent: " space - evenly",
  },

  [theme.breakpoints.down("md")]: {
    appContainer: { flexDirection: "column" },
  },

  appLeft: {
    flex: "0.9",
    marginRight: "15px",
  },
  appRight: { width: "30%" },
  headercontainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  graphStat: {
    marginTop: "25px",
  },
}));

const Central = () => {
  const classes = new useStyles();
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [country, setCountry] = useState("worldwide");
  const [tableData, setTableData] = useState([]);

  useEffect(
    () =>
      fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        }),
    []
  );

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const coutryChange = async (e) => {
    const countryCode = e.target.value;

    // 2 cases : one country or all the world
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        setCountry(countryCode);

        //all data of the country stats
      });
  };

  return (
    <div className={classes.appContainer}>
      <div className={classes.appLeft}>
        <div className={classes.headercontainer}>
          <h1>Covid-19 Tracker</h1>
          <FormControl>
            <Select
              labelId="label"
              id="select"
              value={country}
              onChange={coutryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* Stats*/}
        <div className={classes.statsContainer}>
          <InfoxBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoxBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoxBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        {/* maps */}
      </div>
      <Card className={classes.appRight}>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />

          <h3 className={classes.graphStat}>WorldWide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
};

export default Central;
