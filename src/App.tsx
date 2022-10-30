import { Login } from "./pages/Login";
import { useState } from "react";
import api from "./config/api";
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { CreateAccount } from "./pages/CreateAccount";
import { Profile } from "./pages/Profile";
import { AuthProvider, useAuth } from "./contexts/AuthProvider";

type IUser = {
  uid: any;
  photoURL: any;
  displayName: any;
  email: string;
  password: string;
  id: string;
  name: string;
  photo: string;
};

function App() {
  const { user } = useAuth();

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/createaccount" element={<CreateAccount />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <>
      <div className="bg-indigo-900 min-h-screen flex flex-col">
        <BrowserRouter>
          <Sidebar user={user} />
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
