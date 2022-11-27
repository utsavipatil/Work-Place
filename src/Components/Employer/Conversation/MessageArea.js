import React from 'react'
import { Grid, Button, TextField } from "@mui/material";

function MessageArea() {
  return (
    <Grid container>
        <Grid item xs={12}>messages</Grid>
        <Grid item xs={12} sx={{ bottom : '100px' , width : '100%'}}>
            <Grid container>
                <Grid item xs={10}>
                    <TextField fullWidth/>
                </Grid>
                <Grid item xs={2}>
                    <Button>send</Button>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default MessageArea