import { Image, PlusCircle } from "phosphor-react";
import { Form } from "./Form";

export function NewNote() {
  return (
    <Form title="Crie uma nota">
      <input
        id="description"
        type="text"
        placeholder="Título da nota"
        className="p-2 bg-transparent border-b-2 border-zinc-400/20 focus:outline-none focus:outline-zinc-500/30 rounded"
      />

      <textarea
        name="description"
        id="description"
        placeholder="Descrição da nota . . ."
        cols={10}
        rows={2}
        className="p-2 bg-transparent border-b-2 border-zinc-400/20 focus:outline-none focus:outline-zinc-500/30 rounded"
      />

      <div className="w-full flex sm:flex-row flex-col justify-between gap-6">
        <input type="file" id="content" className="pt-12 w-[8.25rem] text-sm" />

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
