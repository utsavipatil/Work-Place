import React, { useState } from "react";
import SideBar from "./SideBar";
import JobForm from "./JobForm";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

function Jobs() {
  const [postAJob, setPostAJob] = useState(false); //to toggle between post a job and edit a job
  const [mobileSideBar, setMobileSideBar] = useState(false);

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    experiance: "",
    skills: [],
    jobType: "",
    domain: "",
  });

  const selectAJob = (data) => {
    //Click on a job to edit it from sidebar
    setMobileSideBar(false)
    if (!data) {
      setPostAJob(true);
      setJobData({
        title: "",
        description: "",
        location: "",
        salary: "",
        experiance: "",
        skills: [],
        jobType: "",
        domain: "",
      });
    } else {
      setJobData(data);
      setPostAJob(true);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={3} //40%
          sx={{
            display: { xs: mobileSideBar ? "block" : "none", sm: "block" },
          }}
        >
          <SideBar postAJob={postAJob} selectAJob={selectAJob} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={9} //60%
          sx={{
            display: { xs: mobileSideBar ? "none" : "block", sm: "block" },
          }}
        >

          <Button sx={{display:{xs:'block', sm:'none'}}} onClick={() => setMobileSideBar(true)}>Back</Button>

          <JobForm
            jobData={jobData}
            setJobData={setJobData}
            postAJob={postAJob}
          />
        </Grid>
      </Grid>
      <Button onClick={() => setMobileSideBar(!mobileSideBar)}>Switch</Button>
    </>
  );
}

export default Jobs;
