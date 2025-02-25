// import React, { useEffect } from "react";
// import { LoginBg } from "../assets/video";
// import { FcGoogle } from "react-icons/fc";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { app } from "../config/firebase.config";
// import { useNavigate } from "react-router-dom";
// import { validateUser } from "../api";
// import { actionType } from "../Context/reducer";
// import { useStateValue } from "../Context/StateProvider";

// const Login = ({ setAuth }) => {
//   const firebaseAuth = getAuth(app);
//   const provider = new GoogleAuthProvider();
//   const navigate = useNavigate();
//   const [{ user }, dispatch] = useStateValue();

//   const loginWithGoogle = async () => {
//     await signInWithPopup(firebaseAuth, provider).then((userCred) => {
//       if (userCred) {
//         setAuth(true);
//         window.localStorage.setItem("auth", "true");

//         firebaseAuth.onAuthStateChanged((userCred) => {
//           if (userCred) {
//             userCred.getIdToken().then((token) => {
//               window.localStorage.setItem("auth", "true");
//               validateUser(token).then((data) => {
//                 dispatch({
//                   type: actionType.SET_USER,
//                   user: data,
//                 });
//               });
//             });
//             navigate("/", { replace: true });
//           } else {
//             setAuth(false);
//             dispatch({
//               type: actionType.SET_USER,
//               user: null,
//             });
//             navigate("/login");
//           }
//         });
//       }
//     });
//   };

//   useEffect(() => {
//     if (window.localStorage.getItem("auth") === "true")
//       navigate("/", { replace: true });
//   }, []);

//   return (
//     <div className="relative w-screen h-screen">
//       <video
//         src={LoginBg}
//         type="video/mp4"
//         autoPlay
//         muted
//         loop
//         className="w-full h-full object-cover"
//       ></video>
//       <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
//         <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
//           <div
//             onClick={loginWithGoogle}
//             className="flex items-center justify-center  gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
//           >
//             <FcGoogle className="text-xl" />
//             <p>Signin with Google</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;





























import React, { useEffect, useState } from "react";
import { LoginBg } from "../assets/video";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter, FaFacebook, FaMicrosoft } from "react-icons/fa"; // Icons for Twitter, Facebook, Microsoft
import {
  getAuth,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const firebaseAuth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const twitterProvider = new TwitterAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const microsoftProvider = new OAuthProvider("microsoft.com");
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  // Function for Google Sign-In
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, googleProvider).then((userCred) => {
      handleUserAuth(userCred);
    });
  };

  // Function for Twitter Sign-In
  const loginWithTwitter = async () => {
    await signInWithPopup(firebaseAuth, twitterProvider).then((userCred) => {
      handleUserAuth(userCred);
    });
  };

  // Function for Facebook Sign-In
  const loginWithFacebook = async () => {
    await signInWithPopup(firebaseAuth, facebookProvider).then((userCred) => {
      handleUserAuth(userCred);
    });
  };

  // Function for Microsoft Sign-In
  const loginWithMicrosoft = async () => {
    await signInWithPopup(firebaseAuth, microsoftProvider).then((userCred) => {
      handleUserAuth(userCred);
    });
  };

  // Function for Email and Password Sign-In
  // const loginWithEmailAndPassword = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const userCred = await signInWithEmailAndPassword(
  //       firebaseAuth,
  //       email,
  //       password
  //     );
  //     hAuth(userCred);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };


  // const hAuth = (userCred) => {
  //   if (userCred) {
  //     setAuth(true);
  //     window.localStorage.setItem("auth", "true");

  //     firebaseAuth.onAuthStateChanged((user) => {
  //       if (user) {
  //         user.getIdToken().then((token) => {
  //           window.localStorage.setItem("auth", "true");
  //           validateUser(token).then((data) => {
  //             dispatch({
  //               type: actionType.SET_USER,
  //               user: data,
  //             });
  //           });
  //         });
  //         navigate("/", { replace: true });
  //       } else {
  //         setAuth(false);
  //         dispatch({
  //           type: actionType.SET_USER,
  //           user: null,
  //         });
  //         navigate("/login");
  //       }
  //     });
  //   }
  // };

//   const loginWithEmailAndPassword = async (e) => {

//     e.preventDefault();
//     console.log("Login function called"); 
//     try {
//       const userCred = await signInWithEmailAndPassword(
//         firebaseAuth,
//         email,
//         password
//       );
//       console.log(userCred);
//       hAuth(userCred);
//     } catch (error) {
//       console.error("Login Error:", error); // Log full error for debugging
//       setError(error.message);
//     }
// };

// const hAuth = (userCred) => {
//   console.log(userCred);
//     if (userCred && userCred.user) { // Check for user object
//         const user = userCred.user; // Get user directly from userCred
//         setAuth(true);
//         window.localStorage.setItem("auth", "true");
        
//         user.getIdToken().then((token) => {
//             validateUser(token).then((data) => {
//                 dispatch({
//                     type: actionType.SET_USER,
//                     user: data,
//                 });
//             });
//         });

//         navigate("/", { replace: true });
//     }
// };






















  const handleUserAuth = (userCred) => {
    if (userCred) {
      setAuth(true);
      window.localStorage.setItem("auth", "true");

      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((token) => {
            window.localStorage.setItem("auth", "true");
            validateUser(token).then((data) => {
              dispatch({
                type: actionType.SET_USER,
                user: data,
              });
            });
          });
          navigate("/", { replace: true });
        } else {
          setAuth(false);
          dispatch({
            type: actionType.SET_USER,
            user: null,
          });
          navigate("/login");
        }
      });
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <video
        src={LoginBg}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      ></video>
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
        <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
          {/* Email and Password Sign-In */}
          /
          {/* Google Sign-In */}
          <div
            onClick={loginWithGoogle}
            className="flex items-center justify-center gap-2 px-4 py-2 mt-4 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
          >
            <FcGoogle className="              text-xl" />
            <p>Sign in with Google</p>
          </div>

          {/* Twitter Sign-In */}
          <div
            onClick={loginWithTwitter}
            className="flex items-center justify-center gap-2 px-4 py-2 mt-4 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
          >
            <FaTwitter className="text-xl text-blue-500" />
            <p>Sign in with Twitter</p>
          </div>

          {/* Facebook Sign-In */}
          <div
            onClick={loginWithFacebook}
            className="flex items-center justify-center gap-2 px-4 py-2 mt-4 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
          >
            <FaFacebook className="text-xl text-blue-600" />
            <p>Sign in with Facebook</p>
          </div>

          {/* Microsoft Sign-In */}
          <div
            onClick={loginWithMicrosoft}
            className="flex items-center justify-center gap-2 px-4 py-2 mt-4 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
          >
            <FaMicrosoft className="text-xl text-blue-700" />
            <p>Sign in with Microsoft</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

