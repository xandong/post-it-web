import { Notyf } from "notyf";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "./Button";
import { Field } from "./Field";
import { Form } from "./Form";

interface LoginProps {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

export function Login({ state, setState }: LoginProps) {
  const { authenticated } = useContext(AuthContext);
  const notify = new Notyf({ duration: 3000 });
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function isValidInputs() {
    const formatEmailValid = /\S+@\S+\.\S+/;

    if (!formatEmailValid.test(email)) {
      setError("Insira um formato de email inválido");
      notify.error("Email inválido");
      return false;
    }

    if (password.length < 8) {
      setError("A senha deve conter 8 caracteres ou mais");
      notify.error("Senha inválida");
      return false;
    }

    setError("");
    notify.dismissAll();

    return true;
  }

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (!isValidInputs()) {
      return;
    }

    signIn(email, password);
  }

  return (
    <div>
      {authenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="w-full flex justify-center">
          <Form title="Login" onSubmit={handleSubmit}>
            <Field
              value={email}
              setValue={setEmail}
              id="email"
              label="Email"
              placeholder="exemplo@email.com"
              type="email"
            />

            <Field
              value={password}
              setValue={setPassword}
              id="password"
              label="Senha"
              placeholder="********"
              type="password"
            />
            {error ? (
              <span className="text-center text-sm text-cor-pink font-medium">
                {error}
              </span>
            ) : (
              ""
            )}
            <div className="flex justify-center">
              <Button title="Entrar" />
            </div>

            <span className="text-center">
              Não possui cadastro?{" "}
              <button onClick={() => setState(false)} className="a">
                Clique aqui
              </button>
            </span>
          </Form>
        </div>
      )}
    </div>
  );
}
