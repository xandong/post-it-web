import { Dispatch, SetStateAction, useState } from "react";
import { Notyf } from "notyf";
import { apiClient } from "../api/api";
import { Button } from "../components/Button";
import { Field } from "../components/Field";
import { Form } from "../components/Form";

interface RegisterProps {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

export function Register({ setState }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [error, setError] = useState("");
  const notify = new Notyf({ duration: 3000 });

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (!name || !email || !password || !passwordCheck) {
      setError("Todos os campos são obrigatórios");
      return notify.error("Campos obrigatórios");
    }

    if (password.length < 8) {
      setError("A deve conter no mínimo 8 caracteres");
      return notify.error("Senha inválida");
    }
    if (password !== passwordCheck) {
      setError("As senhas não coincidem");
      return notify.error("Senhas inválidas");
    }

    setError("");

    (async () => {
      try {
        const { data } = await apiClient.post("/users", {
          name,
          email,
          password,
        });

        notify.success(data.message);

        setState(true);
      } catch (error: any) {
        notify.error(`Ops... ${error.response.data.message}`);
      }
    })();
  }

  return (
    <div>
      <div className="w-full flex justify-center">
        <Form onSubmit={handleSubmit} title="Faça seu cadastro">
          <Field
            value={name}
            setValue={setName}
            id="name"
            label="Nome"
            placeholder="Seu nome e sobrenome"
            type="text"
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
          {error ? (
            <span className="text-center text-sm text-cor-pink font-medium">
              {error}
            </span>
          ) : (
            ""
          )}
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
