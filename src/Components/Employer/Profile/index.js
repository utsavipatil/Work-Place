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
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";

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

const industryType = [
  "Agriculture",
  "Automotive",
  "Banking",
  "Chemicals",
  "IT",
  "Software Development",
  "Construction",
  "Automation",
];

function Profile() {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("user")); //make JavaScript Object

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: userData?.email ? userData.email : "", //checks null if not null check email if yes then put that data else null
    phone: "",
    skills: "",
    companyName: "",
    companySize: "",
    hrEmail: "",
    address: "",
    industry: "",
  });

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

  React.useEffect(() => {
    fetchUserInfo();
  }, []);

  const submitUserInfo = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "userData", `${userData.uid}`), {
        ...userInfo,
        type: "employer",
      });
      alert("Successfully Submitted!!!");
      navigate("/employer/profile");
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

 

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>) : (
        <form onSubmit={submitUserInfo}>
          <h1>Employer Profile</h1>
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
                disabled = {!edit}
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
              <Typography variant="h6">Phone</Typography>
              <TextField
                disabled = {!edit}
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
              <Typography variant="h6">Comapany name</Typography>
              <TextField
                disabled = {!edit}
                value={userInfo.companyName}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, companyName: e.target.value })
                }
                id="outlined"
                label="Company Name"
                sx={{ width: "80%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Company size</Typography>
              <TextField
                disabled = {!edit}
                type="number"
                value={userInfo.companySize}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, companySize: e.target.value })
                }
                id="outlined"
                label="Company Size"
                sx={{ width: "80%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">HR Email</Typography>
              <TextField
                disabled = {!edit}
                type="email"
                value={userInfo.hrEmail}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, hrEmail: e.target.value })
                }
                id="outlined"
                label="Email"
                sx={{ width: "80%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Industry Type</Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Industry</InputLabel>
                <Select
                  disabled = {!edit}
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userInfo.industry}
                  label="Age"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, industry: e.target.value })
                  }
                >
                  {industryType.map((industry, index) => {
                    return <MenuItem value={industry}>{industry}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Company Address</Typography>
              <TextField
                disabled = {!edit}
                value={userInfo.address}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, address: e.target.value })
                }
                id="outlined"
                label="Company Address"
                sx={{ width: "80%" }}
              />
            </Grid>
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
        </form>
      )}
    </div>
  );
}

export default Profile;

/*
  fields, name, email, phone , company name , company website, company size, company address, HR email id, industry 
*/
