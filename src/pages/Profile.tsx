import { useContext } from "react";
import { Main } from "../components/Main";
import { AuthContext } from "../context/AuthContext";

export function Profile() {
  const { idUser, nameUser } = useContext(AuthContext);
  return <Main>Perfil do user {nameUser}</Main>;
}
