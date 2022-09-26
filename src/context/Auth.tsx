import { createContext, useState } from "react";

interface UserProviderProps {
  children: React.ReactNode;
}

const initialValueUser = {
  id: "",
  setId: (newState: string) => {},
  name: "",
  setName: (newState: string) => {},
  email: "",
  setEmail: (newState: string) => {},
  signIn: (email: string, password: string) => {},
};

export const UserContext = createContext(initialValueUser);

export function UserProvider({ children }: UserProviderProps) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [user, setUser] = useState({ id, name, email });

  function signIn(email: string, password: string) {
    if (email !== "" && password !== "") {
      // chama /auth na API
      // se ok
      // user = /user/getById na API
      //
      // setUser({});
    }
  }

  return (
    <UserContext.Provider
      value={{ id, setId, name, setName, email, setEmail, signIn }}
    >
      {children}
    </UserContext.Provider>
  );
}
