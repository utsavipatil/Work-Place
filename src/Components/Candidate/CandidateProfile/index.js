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
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { DarkModeContext } from "../../Context/darkmode";

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
  "Cloud Computing",
];

function CandidateProfile() {
  const [edit, setEdit] = useState(false);
  const [isloading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("user")); //make JavaScript Object
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: userData?.email ? userData.email : "", //checks null if not null check email if yes then put that data else null (null check)
    phone: "",
    skills: [],
    experiance: "",
    education: "",
    domain: "",
  });

  const [state, dispatch] = useContext(DarkModeContext);

  async function fetchUserInfo() {
    const userData = JSON.parse(localStorage.getItem("user"));
    try {
      const docRef = doc(db, "userData", userData.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserInfo(docSnap.data());
        setLoading(false);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const theme = useTheme();
  const navigate = useNavigate();

  const submitUserInfo = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "userData", userData.uid), {
        ...userInfo,
        type: "candidate",
      });
      alert("Successfully Submitted!!!");
      navigate("/candidate/profile");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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

  const saveInfo = async () => {
    console.log(userInfo);
    try {
      await setDoc(
        doc(db, "userData", userData.uid),
        {
          ...userInfo,
        },
        { merge: true }
      );
      alert("Successfully updated!!!");
      navigate("/candidate/profile");
      setEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  const [pdfurl, setPdfurl] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);

  const submitFile = (e) => {
    e.preventDefault();
    console.log(e.target[0].files[0]);
    const file = e.target[0]?.files[0];

    if (!file) {
      return;
    }

    const storageRef = ref(storage, `resume/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPdfurl(downloadURL);
          console.log(downloadURL, "url");
          setUserInfo({
            ...userInfo,
            resume: downloadURL,
          });
          setProgresspercent(0);
        });
      }
    );
  };

  return (
    <div>
      {isloading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* <form onSubmit={submitUserInfo}> */}
          <h1>Profile</h1>
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
                disabled={!edit}
                required
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
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
                required
                disabled={!edit}
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
                required
                disabled={!edit}
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
                disabled={!edit}
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
                  disabled={!edit}
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
                  disabled={!edit}
                  required
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={userInfo.skills}
                  onChange={handleSkillChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
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
            <Grid item xs={6}>
              {edit ? (
                <form onSubmit={submitFile}>
                  <input accept="application/pdf" type="file" />
                  {progresspercent > 0 && progresspercent <= 100 ? (
                    <div>{progresspercent}</div>
                  ) : (
                    <Button type="submit">Upload</Button>
                  )}
                </form>
              ) : userInfo.resume ? (
                <Button onClick={() => window.open(userInfo.resume, "_blank")}>
                  View resume
                </Button>
              ) : (
                <div>upload resume</div>
              )}
            </Grid>
            <Grid item xs={12}>
              {edit ? (
                <div spacing={3}>
                  <Button variant="contained" onClick={saveInfo} type="submit">
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setEdit(false)}
                    type="submit"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => setEdit(true)}
                  type="submit"
                >
                  Edit
                </Button>
              )}
            </Grid>
          </Grid>
          {/* </form> */}
        </div>
      )}
    </div>
  );
}

export default React.memo(CandidateProfile);
