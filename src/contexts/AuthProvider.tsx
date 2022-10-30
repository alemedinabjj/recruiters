import { createContext, useContext, useState } from "react";
import api from "../config/api";
import { useForm as reactUseForm } from "react-hook-form";

export const AuthContext = createContext({} as any);

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

export function AuthProvider({ children }: any) {
  const { register, formState, handleSubmit } = reactUseForm();

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

    let expireDate = date.setHours(date.getHours() + 3);

    if (user && atualDate < expireDate) {
      return localStorage.setItem("user", JSON.stringify(user));
    }

    if (user && atualDate > expireDate) {
      return localStorage.removeItem("user");
    }
  }

  return <AuthContext.Provider value={{ user, handleSubmit, setUser, handleLoginData, register, formState }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
