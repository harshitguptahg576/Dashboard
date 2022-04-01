import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, {
  createContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import axios from "axios";
import Dashboard from "./Components/Dashboard/Dashboard";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import Account from "./Components/Account/Account";

export const MyContext = createContext({});

const Authentication = () => {
  const [token, setToken] = useState();
  const [data, setData] = useState({});

  useLayoutEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3004/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log("You Got an Error"));
  }, []);

  const RegisterUser = (user) => {
    axios
      .post("http://localhost:3004/users", user)
      .then((res) => setData([...data, res.data]))
      .catch((err) => console.log("You Got an Error"));
  };

  if (!token)
    return (
      <MyContext.Provider value={{ data, RegisterUser, setToken}}>
        <LoginRegister />
      </MyContext.Provider>
    );

  return (
    <MyContext.Provider value={{ setToken}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
};

export default Authentication;
