import React from "react";
import { Grid, Button } from "@mui/material";

const mock = [
  {
    id: 1,
    name: "Utsavi Patil",
    lastMessage: `Hey how are you Utsavi?`,
    time: "12:00 pm",
  },
  {
    id: 2,
    name: "Dolly",
    lastMessage: `Hey how are you Dolly?`,
    time: "12:00 pm",
  },
  {
    id: 3,
    name: "Wastern",
    lastMessage: `Hey how are you Wastern?`,
    time: "12:00 pm",
  },
  {
    id: 4,
    name: "Jule",
    lastMessage: `Hey how are you Jule?`,
    time: "12:00 pm",
  },
  {
    id: 5,
    name: "Prem",
    lastMessage: `Hey how are you Prem?`,
    time: "12:00 pm",
  },
  {
    id: 6,
    name: "Jash",
    lastMessage: `Hey how are you Jash?`,
    time: "12:00 pm",
  },
  {
    id: 7,
    name: "Jochowitch",
    lastMessage: `Hey how are you Jochowitch?`,
    time: "12:00 pm",
  },
  {
    id: 8,
    name: "Messi",
    lastMessage: `Hey how are you Messi?`,
    time: "12:00 pm",
  },
];

function LastMessage({ selectConversation }) {
  return (
    <div>
      {mock.map((item) => {
        return (
          <Grid
            onClick = {() => selectConversation(item)}
            container
            key={item.id}
            sx={{ padding: "10px", margin: "10px", textAlign: "left" }}
          >
            <Grid item xs={9}>
              {item.name}
            </Grid>
            <Grid item xs={3}>
              {item.time}
            </Grid>
            <Grid item xs={12}>
              {item.lastMessage}
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}

export default LastMessage;
