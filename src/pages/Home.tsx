import { CardNote } from "../components/CardNote";
import { Main } from "../components/Main";
import "notyf/notyf.min.css";
import { useState } from "react";
import { ArrowUp } from "phosphor-react";
import { NewNote } from "../components/NewNote";

export function Home() {
  const [toggleNewNote, setToggleNewNote] = useState(false);

  return (
    <Main>
      <h1 className="pb-10 text-center md:text-6xl text-4xl font-extrabold text-cor-pink dark:text-cor-purple">
        Bem vindo ao Post it!
      </h1>
      <section className="flex flex-col rounded-md">
        <div className="flex sm:justify-end justify-center">
          <button
            onClick={() => setToggleNewNote(!toggleNewNote)}
            className="flex items-center gap-2 px-6 py-2 bg-cor-green text-black rounded"
          >
            Criar uma nova nota
            <div className="animate-bounce">
              {toggleNewNote ? <ArrowUp /> : ""}
            </div>
          </button>
        </div>
        {toggleNewNote ? <NewNote /> : ""}
      </section>
      <h2 className="py-6 text-end text-md font-medium">
        Confira as últimas notas publicadas
      </h2>
      <section>
        <ul>{<CardNote />}</ul>
      </section>
    </Main>
  );
}
