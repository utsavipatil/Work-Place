import { React, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  form,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Box,
  Chip,
  useTheme,
} from "@mui/material";
import {v4 as uuidv4} from 'uuid';
import {db} from '../../../../firebaseConfig'
import {setDoc, doc, addDoc, collection, getDocs, query, where, getDoc, updateDoc, getFirestore} from 'firebase/firestore';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const skillSet = [
  "HTML",
  "CSS",
  "JS",
  "React.js",
  "Node.js",
  "MongoDB",
  "SQL",
  "Java",
  "JavaScript",
  "WordPress",
  "Microsoft Word",
  "Microsoft Excel",
  "Microsoft PPT",
  "Microsoft Outlook",
  "Express.js",
  "Python",
  "C++",
];

const domains = [
  "FrontEnd",
  "BackEnd",
  "Fullstack",
  "Devops",
  "UI/UX",
  "QA",
  "Data Science",
  "Machine Learning",
  "Artifical Intelligence",
  "Cloud Computing",
  "Blockchain",
  "Software Engineer",
  "Software Development Engineer",
  "Cloud Computing",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function JobForm({postAJob, jobData, setJobData}) {

  const userInfo = JSON.parse(localStorage.getItem('user'));

  const theme = useTheme();

  const handleSkillChange = (event) => {
    const {
      target: { value },
    } = event;
    setJobData(
      // On autofill we get a stringified value.
      {
        ...jobData,
        skills: typeof value === "string" ? value.split(",") : value,
      }
    );
  };

  const submitJob = async(e)=> {
    //create a collection in firestore
    e.preventDefault();
    const JobID = uuidv4(); //Generate Job ID
    console.log(JobID);
    try{

      if(jobData.JobID){ //If a job is exists, it will be updated
        await setDoc(doc(db, "JobsData", jobData.JobID), { //jobId will pass as parameter so it will select that jobID and update it
          ...jobData
        });
        alert('Job Edited Successfully'); //setDoc(doc, data), doc(db,'collectionName' , 'docId')
      }else{
        await setDoc(doc(db, "JobsData", JobID), {
          JobID : JobID, //If a job is exists, it will be updated
          ...jobData,
          employerID : userInfo.uid,
          createdAt : new Date(),
          employerName : userInfo.displayName
        });
        alert('Job Posted Successfully');
      }
  
    }catch(error){
      console.log(error);
    } 
  }

  return (
    (postAJob ? (
      <form onSubmit={(e)=>submitJob(e)}>
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>New Job Posting Form</h1>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          label="Job Title"
          value={jobData.title}
          onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
          fullWidth
          sx={{alignItems: "center",width: "90%"}}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          label="Location"
          value={jobData.location}
          onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
          fullWidth
          sx={{alignItems: "center",width: "90%"}}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          label="Salary"
          value={jobData.salary}
          onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
          fullWidth
          sx={{alignItems: "center",width: "90%"}}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          label="Experiance"
          value={jobData.experiance}
          onChange={(e) =>
            setJobData({ ...jobData, experiance: e.target.value })
          }
          fullWidth
          sx={{alignItems: "center",width: "90%"}}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          label="Job Type"
          value={jobData.jobType}
          onChange={(e) => setJobData({ ...jobData, jobType: e.target.value })}
          fullWidth
          sx={{alignItems: "center",width: "90%"}}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          required
          label="Description" 
          value={jobData.description}
          multiline
          rows="3"
          onChange={(e) =>
            setJobData({ ...jobData, description: e.target.value })
          }
          fullWidth
          sx={{alignItems: "center",width: "90%"}}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Domain</Typography>
        <form fullWidth sx={{alignItems: "center",width: "90%"}}>
          <InputLabel id="demo-simple-select-label">Domain</InputLabel>
          <Select
            // disabled={!edit}
            fullWidth
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={jobData.domain}
            label="Age"
            onChange={(e) => setJobData({ ...jobData, domain: e.target.value })}
          >
            {domains.map((domain, index) => {
              return <MenuItem value={domain}>{domain}</MenuItem>;
            })}
          </Select>
        </form>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Skills</Typography>
        <form sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
          <Select
            // disabled={!edit}
            fullWidth
            sx={{alignItems: "center",width: "90%"}}
            required
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={jobData.skills}
            onChange={handleSkillChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {skillSet.map((skill) => (
              <MenuItem
                key={skill}
                value={skill}
                style={getStyles(skill, jobData.skills, theme)}
              >
                {skill}
              </MenuItem>
            ))}
          </Select>
        </form>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </Grid>
    </Grid>
    </form>
    ):(<div>Please Select a Job</div>))
    
  );
}

export default JobForm;
