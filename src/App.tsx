import { Login } from "./pages/Login";
import { useState } from "react";
import api from "./config/api";
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { CreateAccount } from "./pages/CreateAccount";

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
  const [user, setUser] = useState<IUser | null>(JSON.parse(localStorage.getItem("user") || "null"));

  const handleLoginData = async (user: any) => {
    let newUser = {
      id: user.uid,
      name: user.displayName,
      avatar: user.photoURL,
    };

    await api.addUser(newUser);

    setUser(newUser as any);

    createCookieWithLocalStorage(newUser);
  };

  function createCookieWithLocalStorage(user: any) {
    let date = new Date();

    let atualDate = date.valueOf();

    let expireDate = date.setHours(date.getHours() + 12);

    if (user && atualDate < expireDate) {
      return localStorage.setItem("user", JSON.stringify(user));
    }

    if (user && atualDate > expireDate) {
      return localStorage.removeItem("user");
    }
  }

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login handleLoginData={handleLoginData} setUser={setUser} />} />
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
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
