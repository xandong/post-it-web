import { formatRelative, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Link as Lk } from "phosphor-react";
import { AuthContext } from "../context/AuthContext";

export interface CardNoteProps {
  authorId: string;
  authorName: string;
  id: string;
  date: string;
  title: string;
  description: string;
  content: string;
  link?: string;
}

export function CardNote({
  authorId,
  authorName,
  id,
  date,
  title,
  description,
  content,
  link,
}: CardNoteProps) {
  const { idUser } = useContext(AuthContext);
  const isAuthor = authorId === idUser;
  const dateFormatted = formatRelative(parseISO(date), new Date(), {
    locale: ptBR,
  });

  const randomNumber = Math.floor(Math.random() * 4);
  let color;

  switch (randomNumber) {
    case 0:
      color = "bg-cor-yellow";
      break;
    case 1:
      color = "bg-cor-orange";
      break;
    case 2:
      color = "bg-cor-green";
      break;
    case 3:
      color = "bg-cor-red";
      break;
    default:
      color = "bg-cor-orange";
      break;
  }

  return (
    <li className={`w-80 p-2 ${color} text-black rounded relative`}>
      {isAuthor ? (
        <div className="absolute top-1 right-2">
          <Link to={`/note/${id}`} className="text-sm font-medium">
            Editar
          </Link>
        </div>
      ) : (
        ""
      )}
      <p className="text-lg font-bold">{title}</p>
      <p className="text-xs text-black/70 ">
        <Link to={`/user/${id}`}>{authorName}</Link> -{" "}
        <span>{dateFormatted}</span>
      </p>
      <p className="bg-zinc-50/10 p-2 rounded">{description}</p>
      <p className="bg-zinc-50/10 p-2 rounded">{content}</p>

      {link ? (
        <a
          href={link}
          target="_blank"
          className="flex items-center gap-2 absolute -bottom-2 -right-2 bg-zinc-100/90 p-1 rounded shadow"
        >
          <Lk />
          Saiba mais
        </a>
      ) : (
        ""
      )}
    </li>
  );
}
