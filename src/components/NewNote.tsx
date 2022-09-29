import { Notyf } from "notyf";
import { useContext, useState } from "react";
import { apiClient } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { Form } from "./Form";

export function NewNote() {
  const notify = new Notyf({ duration: 3000 });
  const { idUser } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");

  function checkInputs() {
    if (!title) {
      notify.error("Título obrigatório.");
      return false;
    }
    if (!description) {
      notify.error("Descrição obrigatória.");
      return false;
    }
    return true;
  }

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (checkInputs()) {
      try {
        const { data } = await apiClient.post("/notes", {
          authorId: idUser,
          title,
          description,
          content,
          link,
        });

        notify.success(data.message);
        history.go(0);
      } catch (error: any) {
        notify.error(`${error.response.data.message} Faça login.`);
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit} title="Crie uma nota">
      <fieldset className="relative">
        <label className="text-sm absolute -top-3 left-2 bg-white dark:bg-black px-1 text-zinc-400">
          Título
        </label>
        <input
          id="title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título da nota"
          className="w-full p-2 bg-transparent border-b-2 border-zinc-400/20 focus:outline-zinc-500/30 rounded"
        />
      </fieldset>

      <fieldset className="relative">
        <label className="text-sm absolute -top-3 left-2 bg-white dark:bg-black px-1 text-zinc-400">
          Descrição
        </label>
        <input
          name="description"
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição da nota..."
          className="w-full p-2 bg-transparent border-b-2 border-zinc-400/20 focus:outline-zinc-500/30 rounded"
        />
      </fieldset>

      <fieldset className="relative">
        <label className="text-sm absolute -top-3 left-2 bg-white dark:bg-black px-1 text-zinc-400">
          Conteúdo
        </label>

        <textarea
          name="content"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Conteúdo da nota..."
          cols={10}
          rows={3}
          className="w-full p-2 bg-transparent border-b-2 border-zinc-400/2 focus:outline-zinc-500/30 rounded"
        />
      </fieldset>

      <fieldset className="relative">
        <small className="absolute -top-3 left-2 bg-white dark:bg-black px-1 text-zinc-400">
          Link <small>(Opcional)</small>
        </small>
        <input
          name="link"
          id="link"
          value={link}
          type="url"
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link para outra nota ou página"
          className="p-2 bg-transparent border-b-2 border-zinc-400/20 focus:outline-zinc-500/30 rounded"
        />
      </fieldset>

      <div className="w-full text-end">
        <button className="px-10 py-2 bg-cor-green/90 hover:bg-cor-green text-black transition-colors rounded">
          Criar
        </button>
      </div>
    </Form>
  );
}
