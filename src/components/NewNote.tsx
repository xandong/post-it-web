import { Notyf } from "notyf";
import { Image, PlusCircle } from "phosphor-react";
import { useContext, useState } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { Form } from "./Form";

export function NewNote() {
  const { idUser, nameUser } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const notify = new Notyf({ duration: 3000 });

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
        await api
          .post("/notes", {
            authorId: idUser,
            title,
            description,
            content,
          })
          .then(console.log);
        console.log("apos a await");
      } catch (error) {
        notify.error(error.response.data.message);
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit} title="Crie uma nota">
      <input
        id="description"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da nota"
        className="p-2 bg-transparent border-b-2 border-zinc-400/20 focus:outline-none focus:outline-zinc-500/30 rounded"
      />

      <textarea
        name="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição da nota . . ."
        cols={10}
        rows={2}
        className="p-2 bg-transparent border-b-2 border-zinc-400/20 focus:outline-none focus:outline-zinc-500/30 rounded"
      />

      <div className="w-full flex sm:flex-row flex-col justify-between gap-6">
        <input
          type="file"
          id="content"
          value={content}
          onInput={(e) => setContent(e.currentTarget.value)}
          className="pt-12 w-[8.25rem] text-sm"
        />

        <div className="absolute">
          <div className="w-10 h-10 flex items-center justify-center bg-zinc-200 text-zinc-500 rounded relative">
            <Image size={24} />

            <div className="bg-cor-green text-white rounded-full absolute -bottom-1 -right-1">
              <PlusCircle className="" />
            </div>
          </div>
        </div>

        <button className="px-10 py-2 bg-cor-green/90 hover:bg-cor-green text-black transition-colors rounded">
          Criar
        </button>
      </div>
    </Form>
  );
}
