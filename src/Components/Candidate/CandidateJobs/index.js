import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  QuerySnapshot,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { Grid, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function CandidateJobs() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [allJobs, setAllJobs] = useState(null);

  const fetchJobs = async () => {
    try {
      const q = await query(collection(db, "JobsData")); //we need all jobs to be fetched
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const jobs = [];
        console.log(querySnapshot, "querySnapshot");
        querySnapshot.forEach((doc) => {
          jobs.push(doc.data());
        });
        setAllJobs(jobs);
        console.log("Current jobs: ", jobs);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const applyForAJob = async (job) => {
    //Store = application id, job id , candidate id , status , date
    const applicationId = uuidv4();
    console.log(job, "job");

    /*
      Only one time Apply=> fetch the applications with candidate id, 
      if job id is present in the applications then show alert already applied,
      else apply for the job
    */

    const q = await query(
      collection(db, "applications"),
      where("candidateId", "==", userInfo.uid)
    );
    let data = []; //will have all the applications of the candidate with candidate id
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });

    console.log(data, "data");

    const isApplied = data.find((item) => item.JobID === job.JobID); //if job id is present

    if (isApplied) {
      alert("already applied");
      return;
    } else {
      try {
        await setDoc(
          doc(db, "applications", applicationId),
          {
            applicationId: applicationId,
            JobID: job.JobID,
            employerId: job.employerID,
            title: job.title,
            location: job.location,
            createdAt: new Date(),
            candidateId: userInfo.uid,
            status: "applied",
            candidateName : userInfo.displayName,
            companyName : job.employerName,
            candidateEmail : userInfo.email,
            // candidateExperiance : userInfo.experiance
          },
          {
            merge: true,
          }
        );
        alert("Applied successfully!");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {allJobs && allJobs.length > 0 ? (
        allJobs.map((job) => {
          return (
            <Grid
              key={job.JobId}
              sx={{
                padding: "10px",
                maxWidth: "600px",
                width: "90%",
                alignItems: "center",
                margin: "10px auto",
                borderRadius: "8px",
                fontSize: "16px",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
              }}
              container
            >
              <Grid item xs={12}>
                {job.title}
              </Grid>
              <Grid item xs={12}>
                {job.location}
              </Grid>
              <Grid item xs={12}>
                {job.salary}
              </Grid>
              <Grid item xs={12}>
                {job.description}
              </Grid>
              <Grid item xs={12}>
                <label>Skills</label>
                <div>
                  {job.skills.map((skill) => {
                    return <div>{skill}</div>;
                  })}
                </div>
              </Grid>
              <Grid item xs={12}>
                {job.jobType}
              </Grid>
              <Grid item xs={12}>
                <Button onClick={() => applyForAJob(job)} variant="contained">
                  Apply
                </Button>
              </Grid>
            </Grid>
          );
        })
      ) : allJobs && allJobs.length === 0 ? (
        <div>no data</div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default CandidateJobs;
