import { useEffect, useState } from "react";
import { ArrowUp } from "phosphor-react";
import "notyf/notyf.min.css";
import { apiClient } from "../api/api";
import { Main } from "../components/Main";
import { CardNote, CardNoteProps } from "../components/CardNote";
import { NewNote } from "../components/NewNote";

export function Home() {
  const [toggleNewNote, setToggleNewNote] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await apiClient.get("/notes");
      setNotes(data.notes);
    })();
  }, []);

  return (
    <Main title="Bem vindo ao Post it!">
      <p className="p-10 pt-0 text-center text-lg">
        Poste notas estilo <em>post it</em> com curiosidades, tarefas, desafios
        ou o que mais quiser compartilhar com a comunidade!
      </p>

      <section className="flex flex-col rounded-md">
        <div className="flex sm:justify-end justify-center">
          <button
            onClick={() => setToggleNewNote(!toggleNewNote)}
            className="flex items-center gap-2 px-6 py-2 bg-cor-green/90 hover:bg-cor-green text-black rounded"
          >
            Criar uma nova nota
            <div className="animate-bounce">
              {toggleNewNote ? <ArrowUp /> : ""}
            </div>
          </button>
        </div>

        <section>{toggleNewNote ? <NewNote /> : ""}</section>
      </section>

      <section>
        <h2 className="py-6 text-end text-md font-medium">
          Confira as últimas notas publicadas
        </h2>
        <ul className="flex flex-wrap justify-center gap-6">
          {notes.map((note: CardNoteProps) => (
            <CardNote
              key={note.id}
              id={note.id}
              authorId={note.authorId}
              authorName={note.authorName}
              date={note.date}
              title={note.title}
              description={note.description}
              content={note.content}
              link={note.link}
            />
          ))}
        </ul>
      </section>
    </Main>
  );
}
