import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import marketing from "./marketing.png";
import design from "./design.png";
import HR from "./HR.png";
import finance from "./finance.png";
import govt from "./govt.png";
import business from "./business.png";
import customerSupport from "./customerSupport.png";
import project from "./project.png";
import Card from "../Common/Card";

const cards = [
  {
    title: "Marketing & Communication",
    avalableJobs: 100,
    img: marketing,
  },
  {
    title: "Design & Development",
    avalableJobs: 100,
    img: design,
  },
  {
    title: "Human Research & Development",
    avalableJobs: 100,
    img: HR,
  },
  {
    title: "Finance Management",
    avalableJobs: 100,
    img: finance,
  },
  {
    title: "Government Jobs",
    avalableJobs: 100,
    img: govt,
  },
  {
    title: "Business & Consulting",
    avalableJobs: 100,
    img: business,
  },
  {
    title: "Customer Support Care",
    avalableJobs: 100,
    img: customerSupport,
  },
  {
    title: "Project Management",
    avalableJobs: 100,
    img: project,
  },
];

function Section2() {
  return (
    <Grid container>
      <Typography variant="h4" sx={{ fontWeight: 700, margin: "auto" }}>
        One Platform Many Solutions
      </Typography>
      <Grid container sx={{ justifyContent: "center" }}>
        {cards.map((card, index) => {
          return <Card key={card.index} card={card} />;
        })}
      </Grid>
    </Grid>
  );
}

export default Section2;
