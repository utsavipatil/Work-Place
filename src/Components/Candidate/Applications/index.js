import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import React, { useEffect, useState } from "react";
import CommonTable from "../../Common/CommonTable";

const coloumnName = [
  {
    title : 'Employer Name',
    key : 'companyName'
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
  
]

function Applications() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [allApplications, setAllApplications] = useState(null);

  const fetchData = async () => {
    const q = query(
      collection(db, "applications"),
      where("candidateId", "==", userInfo.uid)
    );

    let data = [];
    const querySnapshot = await getDocs(q); //If we don't want real time updates
    querySnapshot.forEach((doc) => {
      //doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    console.log(data);
    setAllApplications(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {allApplications && allApplications.length > 0 ? (
        <div>
          <CommonTable data={allApplications}  coloumnName={coloumnName}/>
        </div>
      ) : allApplications && allApplications.length === 0 ? (
        <div>no data</div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default Applications;
