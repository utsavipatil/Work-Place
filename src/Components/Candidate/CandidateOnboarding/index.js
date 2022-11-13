import {
  Grid,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Box,
  Chip,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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
  'Cloud Computing'
];

function CandidateOnboarding() {
  const userData = JSON.parse(localStorage.getItem("user")); //make JavaScript Object
  const theme = useTheme();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: userData?.email ? userData.email : "", //checks null if not null check email if yes then put that data else null (null check)
    phone: "",
    skills: [],
    experiance: "",
    education: "",
    domain: "",
  });

  const submitUserInfo = (e) => {
    e.preventDefault();
    console.log("submit", userInfo);
  };

  const handleSkillChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserInfo(
      // On autofill we get a stringified value.
      {
        ...userInfo,
        skills: typeof value === "string" ? value.split(",") : value,
      }
    );
  };

  return (
    <form onSubmit={submitUserInfo}>
      <h1>Candidate Onboarding</h1>
      <Grid
        container
        spacing={2}
        sx={{
          padding: "10px",
          maxWidth: "95%",
          margin: "20px auto",
          backgroundColor: "#FFF",
          boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
          boxRadius: "8px",
        }}
      >
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Name</Typography>
          <TextField
            required
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            id="outlined-required"
            label="Name"
            sx={{ width: "80%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Email</Typography>
          <TextField
            type="email"
            disabled
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
            required
            id="outlined-required"
            label="Email"
            sx={{ width: "80%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Phone </Typography>
          <TextField
            type="number"
            value={userInfo.phone}
            onChange={(e) =>
              setUserInfo({ ...userInfo, phone: e.target.value })
            }
            id="outlined"
            label="Phone number"
            sx={{ width: "80%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Experiance</Typography>
          <TextField
            value={userInfo.experiance}
            onChange={(e) =>
              setUserInfo({ ...userInfo, experiance: e.target.value })
            }
            id="outlined"
            label="Experiance"
            sx={{ width: "80%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Education</Typography>
          <TextField
            value={userInfo.education}
            onChange={(e) =>
              setUserInfo({ ...userInfo, education: e.target.value })
            }
            id="outlined"
            label="Education"
            sx={{ width: "80%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Domain</Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Domain</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userInfo.domain}
              label="Age"
              onChange={(e) =>
                setUserInfo({ ...userInfo, domain: e.target.value })
              }
            >
              {domains.map((domain, index) => {
                return <MenuItem value={domain}>{domain}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Skills</Typography>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
            <Select
              required
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={userInfo.skills}
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
                  style={getStyles(skill, userInfo.skills, theme)}
                >
                  {skill}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit">Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default CandidateOnboarding;

/*
fileds => name , email , phone , skills[], experiance[] , domain, education
*/
