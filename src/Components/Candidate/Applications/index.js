import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import React, { useEffect, useState } from "react";

function Applications() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [allApplications, setAllApplications] = useState(null);

  const fetchData = async () => {
    const q = query(
      collection(db, "applications"),
      where("candidateId", "==", userInfo.uid)
    );

    let data = [];
    const querySnapshot = await getDocs(q);
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
        <div>data</div>
      ) : allApplications && allApplications.length === 0 ? (
        <div>no data</div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default Applications;
