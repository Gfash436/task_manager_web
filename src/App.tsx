import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./ui/Header";

import Auth from "./features/access/Auth";
import UnAuth from "./features/access/UnAuth";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Auth />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<UnAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
