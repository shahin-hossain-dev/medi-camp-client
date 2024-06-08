import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const userCreate = (email, password) => {
    //need auth
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    //need auth
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  // logout user
  const logOut = () => {
    return signOut(auth);
  };

  //update user profile
  const updateUserProfile = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const user = { email: currentUser?.email };
        axiosPublic.post("/jwt", user).then((res) => {
          if (res.data.token) {
            const token = res?.data?.token;
            localStorage.setItem("camp-token", token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("camp-token");
        setLoading(false);
      }
    });
    return () => {
      unsubscribed();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    userCreate,
    userLogin,
    googleLogin,
    logOut,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
