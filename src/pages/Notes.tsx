import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatRelative, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Notyf } from "notyf";
import { Trash } from "phosphor-react";

import { AuthContext } from "../context/AuthContext";

import api from "../api/api";
import { Button } from "../components/Button";
import { FieldsetNote } from "../components/FieldsetNote";
import { Form } from "../components/Form";
import { Main } from "../components/Main";

export function Notes() {
  const { idUser } = useContext(AuthContext);
  const notify = new Notyf({ duration: 3000 });

  const { id } = useParams();
  const [date, setDate] = useState("");
  const [authorName, setAuthorName] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newContent, setNewContent] = useState(content);

  console.log(newTitle, newDescription, newContent);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/notes/${id}`);
        setAuthorName(data.note.authorName);

        setTitle(data.note.title);
        setNewTitle(title);

        setDescription(data.note.description);
        setNewDescription(description);

        data.note.content === null ? "" : setContent(data.note.content);
        setNewContent(content);

        setDate(
          formatRelative(parseISO(data.note.date), new Date(), {
            locale: ptBR,
          })
        );
      } catch (error: any) {
        notify.error(error.response.data.message);
      }
    })();
  }, []);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    const newNote = { id, title, description, content };

    if (title !== newTitle) newNote.title = newTitle;
    if (description !== newDescription) newNote.description = newDescription;
    if (content !== newContent) newNote.content = newContent;

    if (
      title !== newTitle ||
      description !== newDescription ||
      content !== newContent
    ) {
      try {
        const { data } = await api.put("/notes", newNote);

        setTitle(data.note.title);
        setDescription(data.note.description);
        setContent(data.note.content);

        setDate(
          formatRelative(parseISO(data.note.date), new Date(), {
            locale: ptBR,
          })
        );

        notify.success("Nota atualizada!");
      } catch (error: any) {
        notify.error(error.response.data.message);
      }
    }
  }

  async function handleExcludeNote() {
    const confirmExclude = confirm("Tem certeza que deseja excluir?");
    if (confirmExclude) {
      try {
        await api.delete(`/notes/${id}`);
        notify.success("Nota excluída com sucesso");
      } catch (error) {
        notify.error("Erro ao excluir");
      }
    }
  }

  return (
    <Main>
      <Form title="Editar nota" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 relative group">
          <button
            type="button"
            onClick={handleExcludeNote}
            className="flex items-center gap-2 p-2 absolute top-2 right-2 bg-cor-pink dark:bg-cor-purple shadow
            hover:shadow-cor-purple/30 focus:outline-cor-purple
            focus:shadow text-white font-medium rounded transition-all duration-200
          "
          >
            <span>Excluir nota</span>
            <Trash
              size={24}
              weight="bold"
              className="group-hover:scale-110 transition-all duration-500"
            />
          </button>

          <div className="text-xl font-medium">
            <p>Criado por: {authorName}</p>
            <p className="text-sm">Data da criação: {date}</p>
          </div>

          <hr />

          <div className="w-full">
            <h2>
              <FieldsetNote
                id="title"
                label="Título:"
                value={title}
                setValue={setTitle}
              />
            </h2>
            <FieldsetNote
              id="description"
              label="Descrição:"
              value={description}
              setValue={setDescription}
            />

            <FieldsetNote
              isContent={true}
              id="content"
              label="Conteúdo"
              value={content}
              setValue={setContent}
            />
          </div>
        </div>
        <Button title="Salvar alterações" />
      </Form>
    </Main>
  );
}
