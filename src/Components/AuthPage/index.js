import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { UserContext } from "../Context/UserContext";

function AuthPage({ type }) {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const signIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // console.log("User", user);
        // localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "SET_USER", payload: user });

        const docRef = doc(db, "userData", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          //If use exists navigate to profile based on type

          const userInfo = docSnap.data();
          // console.log(userInfo, 'userInfo data');
          const userType = userInfo.type;
          console.log(userType, "user Type data");

          // localStorage.setItem("userinfo", JSON.stringify(userInfo));
          dispatch({ type: "SET_USER_INFO", payload: userInfo });

          if (type === "candidate") {
            if (userType === type) {
              navigate("/candidate/profile");
            } else {
              alert("You are already onboarded as employer");
              return;
            }
          } else {
            if (userType === type) {
              navigate("/employer/profile");
            } else {
              alert("You are already onboarded as candidate");
              return;
            }
          }
          console.log("Document data:", docSnap.data());
        } else {
          if (type === "candidate") {
            navigate("/candidate/onboarding");
          } else {
            navigate("/employer/onboarding");
          }
          console.log("No such document!");
        }

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div>
      <h1>Welcome {type} please SignIn </h1>
      <h3>Sign In with Google</h3>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default AuthPage;

//Onboarding when user is new
//Profile when user already logged in
//based on type login done in candidate / employer
