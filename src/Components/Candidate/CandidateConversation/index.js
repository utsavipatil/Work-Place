import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import LastMessage from "../../Common/LastMessage";
import MessageArea from "../../Common/MessageArea";
import { db } from "../../../firebaseConfig";
import { doc, deleteDoc, setDoc, orderBy } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import CommonTable from "../../Common/CommonTable";
import { async } from "@firebase/util";
import { v4 as uuidv4 } from "uuid";

function CandidateConversation() {
  const [lastMessageMobile, setLastMessageMobile] = useState(true);
  const [allLastMessages, allApplications] = useState(null);
  const [allConversations, setAllConversations] = useState();
  const [selectAConversation, setSelectAConversation] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const selectConversation = async (data) => {
    // console.log(data);
    setSelectAConversation(data);
    const q = query(
      collection(db, "oneToOneMessages"),
      where("conversationId", "==", data.conversationId),
      orderBy('createdAt','desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = [];
      console.log(querySnapshot, "querySnapshot");
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAllConversations(data);
      console.log("Current Messages: ", data);
    });
    setLastMessageMobile(false);
  };

  const postMessage = async (message) => {
    const conversationId = selectAConversation.conversationId;
    const oneToOneMessagesId = uuidv4();
    try {
      await setDoc(
        doc(db, "lastMessage", selectAConversation.lastMessageId),
        {
          lastMessage: message,
          createdAt: new Date().getTime(),
        },
        {
          merge: true,
        }
      );
      await setDoc(
        doc(db, "oneToOneMessages", oneToOneMessagesId), {
          createdAt: new Date().getTime(),
          conversationId: conversationId,
          userId : userInfo.uid,
          userType : 'candidate',
          message: message,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    const q = query(
      collection(db, "lastMessage"),
      where("candidateId", "==", userInfo.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = [];
      console.log(querySnapshot, "querySnapshot");
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      allApplications(data);
      console.log("all last messages", data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container>
      <Grid
        xs={12}
        sm={4}
        sx={{
          display: { xs: lastMessageMobile ? "block" : "none", sm: "block" },
        }}
      >
        <LastMessage
          allLastMessages={allLastMessages}
          selectConversation={selectConversation}
        />
      </Grid>
      <Grid
        xs={12}
        sm={8}
        sx={{
          display: { xs: lastMessageMobile ? "none" : "block", sm: "block" },
        }}
      >
        <Button onClick={() => setLastMessageMobile(true)}>Back</Button>
        <MessageArea
          postMessage={postMessage}
          allConversations={allConversations}
        />
      </Grid>
    </Grid>
  );
}

//u9Bz5tZvROXqTSXOoyP2MeyXLqm1 + u9Bz5tZvROXqTSXOoyP2MeyXLqm1
//u9Bz5tZvROXqTSXOoyP2MeyXLqm1 + u9Bz5tZvROXqTSXOoyP2MeyXLqm1

export default CandidateConversation;