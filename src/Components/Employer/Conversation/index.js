import React, { useState } from 'react'
import {Grid,Button} from '@mui/material'
import LastMessage from './LastMessage';
import MessageArea from './MessageArea';

function Conversation() {

  const [lastMessageMobile , setLastMessageMobile] = useState(true);
  const selectConversation = (data)=>{
    console.log(data);
    setLastMessageMobile(false);
  }

  return (
    <Grid container>
      <Grid xs={12} sm={4} sx={{display : {xs:lastMessageMobile ? 'block' : 'none', sm: 'block'}}}>
        <LastMessage selectConversation={selectConversation}/>
      </Grid>
      <Grid xs={12} sm={8} sx={{display : {xs:lastMessageMobile ? 'none' : 'block', sm: 'block'}}}>
        <MessageArea/>
      </Grid>
      <Button onClick={() => setLastMessageMobile(true)}>Back</Button>
    </Grid>
  )
}

export default Conversation