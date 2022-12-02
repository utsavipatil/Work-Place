import { collection, getDocs, query, where , onSnapshot } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import React, { useEffect, useState } from "react";
import CommonTable from "../../Common/CommonTable";
import {doc , deleteDoc,setDoc} from 'firebase/firestore';
import { async } from "@firebase/util";
import { v4 as uuidv4 } from "uuid";

const coloumnName = [
  {
    title : 'Candidate Name',
    key : 'candidateName'
  },
  {
    title : 'Candidate Email',
    key : 'candidateEmail'
  },
  {
    title : 'Job Title',
    key : 'title'
  },
  {
    title : 'Job location',
    key : 'location'
  },
  {
    title : 'Status',
    key : 'status'
  },
  {
    title : 'Actions',
    key : 'buttons'
  }
  
]

function Applicants() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [allApplications, setAllApplications] = useState(null);

  const fetchData = async () => {
    const q = query(
      collection(db, "applications"),
      where("employerId", "==", userInfo.uid)
    );

    const unsubscribe = onSnapshot(q , (querySnapshot) => {
      let data = [];
      console.log(querySnapshot, 'querySnapshot');
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAllApplications(data);
      console.log('Current jobs' , data);
    })

  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async(action, row) => {
    const lastMessageId = uuidv4();
    const oneToOneMessageId = uuidv4();
    if(action === 'accept'){
      //we need to update the status of the application to approved
      try {
        await setDoc(
          doc(db, "applications", row.applicationId),
          {
            status: "approved"
            // candidateExperiance : userInfo.experiance
          },
          {
            merge: true, //all other values same and update status (like spread operator)
          }
        );
        alert("Accepted successfully!");
      } catch (error) {
        console.log(error);
      }
      console.log('accept', row);
      try {
        console.log(row);
        await setDoc(doc(db , 'lastMessage',lastMessageId),{
          lastMessage : `Hey there, We have accepted your application for ${row.title}!!!`, //important
          createdAt: new Date().getTime(),
          employerId : userInfo.uid, //important
          candidateId : row.candidateId, //important
          JobID : row.JobID,
          applicationId : row.applicationId,
          lastMessageId : lastMessageId,
          candidateName : row.candidateName, //important
          employerName : row.companyName, //important
          conversationId : `${userInfo.uid} + ${row.candidateId}` //important
        })
        await setDoc(doc(db,'oneToOneMessages', oneToOneMessageId),{
          createdAt: new Date().getTime(),
          conversationId : `${userInfo.uid} + ${row.candidateId}`,
          userId : userInfo.uid,
          userType : 'employer',
          message : `Hey there, We have accepted your application for ${row.title}!!!`
        })
      }catch(error){
        console.log(error);
      }

    }else if (action === 'reject'){
      //application should be deleted
      await deleteDoc(doc(db , 'applications' , row.applicationId))
      console.log('reject',row);
    }
  }

  return (
    <div>
      {allApplications && allApplications.length > 0 ? (
        <div>
          <CommonTable coloumnName={coloumnName} data={allApplications} handleClick={handleClick}/>
        </div>
      ) : allApplications && allApplications.length === 0 ? (
        <div>no data</div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default Applicants;
