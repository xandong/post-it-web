import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./Button";
import { Field } from "./Field";
import { Form } from "./Form";

interface LoginProps {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

export function Login({ state, setState }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="w-full flex justify-center">
        <Form title="Login">
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
    </div>
  );
}
