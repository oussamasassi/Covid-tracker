import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  table: {
    marginTop: "20px",
    height: "400px",
    overflowY: "scroll",
  },
  lineTable: {
    display: "flex",
    justifyContent: "space-between",
    "&:nth-of-type(odd)": {
      background: "#DDD3D3D3",
    },
  },
  tableColumn: {
    padding: "0.5rem",
  },
});
function Table({ countries }) {
  const classes = new useStyle();
  return (
    <div className={classes.table}>
      {countries.map((country) => (
        <tr className={classes.lineTable}>
          <td className={classes.tableColumn}>{country.country} </td>
          <td className={classes.tableColumn}>
            <strong>{country.cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
