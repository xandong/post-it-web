import { createContext, ReactNode, useEffect, useState } from "react";
import { Notyf } from "notyf";

import { Navigate } from "react-router";
import axios from "axios";
import api from "../api/api";

interface CommonHeaderProperties {
  authorization: string | undefined;
}
interface AuthProviderProps {
  children: ReactNode;
}

const initialValueUser = {
  idUser: "",
  setIdUser: (newState: string) => {},
  nameUser: "",
  setNameUser: (newState: string) => {},
  emailUser: "",
  setEmailUser: (newState: string) => {},
  signIn: (email: string, password: string) => {},
  authenticated: false,
  loading: false,
  logout: () => {},
};

export const AuthContext = createContext(initialValueUser);

export function AuthProvider({ children }: AuthProviderProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [idUser, setIdUser] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");

  const notify = new Notyf({ duration: 3000 });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`;

      // (
      //   axios.defaults.headers! as unknown as Record<
      //     string,
      //     CommonHeaderProperties
      //   >
      // ).common["authorization"] = `Bearer ${JSON.parse(token)}`;

      setAuthenticated(true);

      const idUser = localStorage.getItem("idUser");

      (async () => {
        try {
          const { data }: any = await api.get(`users/${idUser}`);

          setIdUser(idUser!);
          setNameUser(data.user.name);
          setEmailUser(data.user.email);
        } catch (error: any) {
          notify.error("Ops... Algo de errado aconteceu");
          return logout();
        }
      })();
    }

    setLoading(false);
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/auth", { email, password });

      if (!data.token) return notify.error("Não autenticado.");

      const token = data.token;

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("idUser", data.user.id);
      api.defaults.headers.authorization = `Bearer ${token}`;

      setIdUser(data.user.id);
      setNameUser(data.user.name);
      setEmailUser(data.user.email);

      notify.success("Login efetuado com sucesso!");

      setTimeout(() => {
        return setAuthenticated(true);
      }, 1000);
    } catch (error: any) {
      return notify.error(error.response.data.message);
    }
  }

  function logout() {
    api.defaults.headers.authorization = undefined;

    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    setIdUser("");
    setEmailUser("");
    setNameUser("");
    setAuthenticated(false);

    return <Navigate to="sign" />;
  }

  if (loading) {
    return <></>;
  }

  return (
    <AuthContext.Provider
      value={{
        idUser,
        setIdUser,
        nameUser,
        setNameUser,
        emailUser,
        setEmailUser,
        signIn,
        authenticated,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
