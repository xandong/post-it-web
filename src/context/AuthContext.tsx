import { createContext, ReactNode, useEffect, useState } from "react";
import { Notyf } from "notyf";
import { Navigate } from "react-router";
import { apiClient } from "../api/api";
import { Circle } from "phosphor-react";

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
      apiClient.defaults.headers.common["authorization"] = `Bearer ${JSON.parse(
        token
      )}`;

      setAuthenticated(true);

      const idUser = localStorage.getItem("idUser");

      (async () => {
        try {
          const { data }: any = await apiClient.get(`users/${idUser}`);

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
      const { data } = await apiClient.post("/auth", { email, password });

      if (!data.token) return notify.error("Não autenticado.");

      const token = data.token;

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("idUser", data.user.id);

      apiClient.defaults.headers.common["authorization"] = `Bearer ${token}`;

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
    apiClient.defaults.headers.common["authorization"] = "";

    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    setIdUser("");
    setEmailUser("");
    setNameUser("");
    setAuthenticated(false);

    return <Navigate to="sign" />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center animate-spin">
        <Circle size={32} />
      </div>
    );
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
