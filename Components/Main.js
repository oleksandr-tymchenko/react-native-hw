import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chooseRoute } from "../router";
import { authStateChangeUser } from "../Redux/Auth/authOperations";

const Main = () => {
  const dispatch = useDispatch();
  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);
  const routing = chooseRoute(stateChange);

  //   onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
