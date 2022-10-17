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

    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const response = user;

  console.log(user);

  if (!user) {
    return <Login handleLoginData={handleLoginData} />;
  }

  return (
    <>
      <div className="bg-slate-900 min-h-screen flex flex-col ">
        <Sidebar user={user} />
        <Form user={user} />
      </div>
    </>
  );
}

export default App;
