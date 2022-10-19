import { Form } from "./components/Form";
import { Login } from "./components/Login";
import { useState } from "react";
import api from "./config/api";
import { Sidebar } from "./components/Sidebar";

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
    return <Login handleLoginData={handleLoginData} />;
  }

  return (
    <>
      <div className="bg-slate-900 min-h-screen flex flex-col">
        <Sidebar user={user} />
        <Form user={user} />
      </div>
    </>
  );
}

export default App;
