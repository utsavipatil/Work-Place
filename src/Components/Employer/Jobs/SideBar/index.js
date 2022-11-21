import { React, useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import {Grid,Button} from "@mui/material";

function SideBar({ selectAJob }) {
  const [alljobs, setAllJobs] = useState(null);

  const fetchJobs = async () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const employerId = userInfo.uid;
    try {
      const q = await query(
        collection(db, "JobsData"),
        where("employerID", "==", employerId)
      ); //Only signed in employer's jobs will be fetched
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //rerender data when data changes
        const jobs = [];
        console.log(querySnapshot, "querySnapshot");
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, "=>" , doc.data())
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

  return (
    <div>
      <Button onClick={() => selectAJob()}>Post a Job</Button>
      {alljobs && alljobs.length > 0 ? (
        <div>
          {alljobs.map((job) => {
            return (
              <Grid
                onClick={() => selectAJob(job)}
                key={job.JobID}
                container
                sx={{
                  padding: "10px",
                  margin: "10px",
                  border: "1px solid",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
              >
                <Grid item xs={12}>
                  {job.title}
                </Grid>
                <Grid item xs={12}>
                  {job.jobType}
                </Grid>
                <Grid item xs={12}>
                  {job.salary}
                </Grid>
              </Grid>
            );
          })}
        </div>
      ) : alljobs && alljobs.length === 0 ? (
        <div>No Jobs Posted Yet</div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default SideBar;
