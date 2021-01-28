import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoxBox({ title, cases, total }) {
  return (
    <Card className="infoxBox">
      <CardContent>
        <Typography color="textSecondary" className="infoBox_title">
          {title}
        </Typography>
        <h2 className="infoBox_cases">{cases}</h2>
        <Typography className="infoBox_total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoxBox;
