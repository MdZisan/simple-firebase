import React, { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.init";
const Login = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log("error:", error.message);
      });
  };

const handleGithubSignIn = () =>{

  signInWithPopup(auth,githubProvider)
  .then(result=>{
    const loggedInUser = result.user;
    console.log(loggedInUser);
    setUser(loggedInUser)
  })
  .catch(error=>{
    console.log(error);
  })


}




  return (
    <div>
      {user ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (<>
        <button onClick={handleGithubSignIn} >GitHub Login</button>
        <button onClick={handleGoogleSignIn}>Google login</button>
        </>
      )}

      {user && (
        <div>
          <img src={user.photoURL} alt="" />
          <h2 style={{ textTransform: "uppercase" }}>
            Name : {user.displayName}
          </h2>
         { user.email &&
           <p>Email : {user.email}</p>
         }
        </div>
      )}
    </div>
  );
};

export default Login;
