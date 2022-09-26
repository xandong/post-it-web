import { useState } from "react";
import { Login } from "../components/Login";
import { Main } from "../components/Main";
import { Register } from "../components/Register";

export function Sign() {
  const [haveAccount, setHaveAccount] = useState(true);

  return (
    <Main>
      {haveAccount ? (
        <Login state={haveAccount} setState={setHaveAccount} />
      ) : (
        <Register state={haveAccount} setState={setHaveAccount} />
      )}
    </Main>
  );
}
