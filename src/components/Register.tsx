import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../components/Button";
import { Field } from "../components/Field";
import { Form } from "../components/Form";

interface RegisterProps {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

export function Register({ state, setState }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  return (
    <div>
      <div className="w-full flex justify-center">
        <Form title="Faça seu cadastro">
          <Field
            value={name}
            setValue={setName}
            id="name"
            label="Nome"
            placeholder="Seu nome e sobrenome"
            type=""
          />
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
          <Field
            value={passwordCheck}
            setValue={setPasswordCheck}
            id="passwordCheck"
            label="Confirme a senha"
            placeholder="********"
            type="password"
          />
          <div className="flex justify-center">
            <Button title="Cadastrar" />
          </div>
          <span className="text-center">
            Possui cadastro?{" "}
            <button onClick={() => setState(true)} className="a">
              Clique aqui
            </button>
          </span>
        </Form>
      </div>
    </div>
  );
}
