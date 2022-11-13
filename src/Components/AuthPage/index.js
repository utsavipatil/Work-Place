import React from 'react'
import Button from '@mui/material/Button';
import { signInWithPopup , GoogleAuthProvider} from "firebase/auth";
import {auth} from '../../firebaseConfig'
import { useNavigate } from "react-router-dom";

function AuthPage({type}) {

  const navigate = useNavigate();

  const signIn = ()=> {
    const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          localStorage.setItem('user' , JSON.stringify(user));
          if(type === 'Candidate'){ //navigate to candidate onboarding
            if(!true){ //data already there => profile
              navigate('/candidate/profile');
            }else{ //onboarding
              navigate('/candidate/onboarding');
            }
          }else{ //navigate to Employer
            if(!true){ //data already there => profile
              navigate('/employer/profile');
            }else{ //onboarding
              navigate('/employer/onboarding');
            }
          }
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
  }

  return (
    <div>
      <h1>Welcome {type} please SignIn </h1>
      <h3>Sign In with Google</h3>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  )
}

export default AuthPage

//Onboarding when user is new
//Profile when user already logged in
//based on type login done in candidate / employer