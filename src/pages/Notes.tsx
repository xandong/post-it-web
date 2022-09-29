import { useContext, useEffect, useState } from "react";
import { Link, Navigate, redirect, useParams } from "react-router-dom";
import { formatRelative, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Notyf } from "notyf";
import { ArrowLeft, Trash } from "phosphor-react";

import { AuthContext } from "../context/AuthContext";

import { apiClient } from "../api/api";
import { Button } from "../components/Button";
import { FieldsetNote } from "../components/FieldsetNote";
import { Form } from "../components/Form";
import { Main } from "../components/Main";

export function Notes() {
  const notify = new Notyf({ duration: 3000 });

  const { id } = useParams();
  const [date, setDate] = useState("");
  const [authorName, setAuthorName] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newContent, setNewContent] = useState(content);
  const [newLink, setNewLink] = useState(link);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.get(`/notes/${id}`);
        setAuthorName(data.note.authorName);

        setTitle(data.note.title);
        setNewTitle(title);

        setDescription(data.note.description);
        setNewDescription(description);

        data.note.content === null ? "" : setContent(data.note.content);
        setNewContent(content);

        data.note.link === null ? "" : setLink(data.note.link);
        setNewLink(link);

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

    const newNote = { id, title, description, content, link };

    if (title !== newTitle) newNote.title = newTitle;
    if (description !== newDescription) newNote.description = newDescription;
    if (content !== newContent) newNote.content = newContent;
    if (link !== newLink) newNote.link = newLink;

    if (
      title !== newTitle ||
      description !== newDescription ||
      content !== newContent ||
      link !== newLink
    ) {
      try {
        const { data } = await apiClient.put("/notes", newNote);

        setTitle(data.note.title);
        setDescription(data.note.description);
        setContent(data.note.content);
        setLink(data.note.link);

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
        await apiClient.delete(`/notes/${id}`);
        notify.success("Nota excluída com sucesso");
      } catch (error) {
        notify.error("Erro ao excluir");
      }
    }
  }

  return (
    <Main>
      <Form title="Editar nota" onSubmit={handleSubmit}>
        <span className="text-left">
          <Link to="/" className="w-fit p-2 flex gap-2 items-center a">
            <ArrowLeft /> Home
          </Link>
        </span>
        <div className="flex flex-col gap-2 relative">
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

            <FieldsetNote
              id="link"
              label="Link"
              value={link}
              setValue={setLink}
            />
          </div>
        </div>
        <Button title="Salvar alterações" />
      </Form>
    </Main>
  );
}
