import { MoonStars, SunDim, UserCircle } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContextProvider";
import "notyf/notyf.min.css";
import { AuthContext } from "../context/AuthContext";

export function Header() {
  const { idUser, logout } = useContext(AuthContext);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [setTheme, theme]);
  if (!mounted) return null;

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border-b-2 border-b-zinc-200/70 dark:border-b-zinc-800 shadow-lg">
      <Link to="/">
        <img src="/logomarca.png" alt="Post it" />
      </Link>
      <nav className="flex items-center gap-4 text-cor-pink dark:text-cor-purple">
        <button
          className="h-fit p-1 hover:bg-cor-pink dark:hover:bg-cor-purple hover:text-zinc-50 rounded-full transition-all delay-150 duration-300"
          onClick={() => setTheme(!theme)}
        >
          {!theme ? <SunDim size={24} /> : <MoonStars size={24} />}
        </button>
        <div className="">
          {idUser ? (
            <div className="relative">
              <button
                onMouseEnter={() => setToggleMenu(true)}
                className="hover:bg-cor-pink dark:hover:bg-cor-purple hover:text-white rounded-full hover:scale-110 transition-all delay-200 duration-200"
              >
                <UserCircle size={32} />
              </button>
              {toggleMenu ? (
                <menu
                  className="absolute top-10 right-0 text-black dark:text-white"
                  onMouseLeave={() => setToggleMenu(false)}
                >
                  <ul className="w-40 flex flex-col gap-2 items-center p-2 bg-zinc-50 dark:bg-zinc-700 border-2 border-zinc-100 dark:border-zinc-800 shadow-md rounded">
                    <li className="a">
                      <Link to="/profile">Perfil</Link>
                    </li>
                    <li className="a">
                      <button onClick={logout}>Sair</button>
                    </li>
                  </ul>
                </menu>
              ) : (
                ""
              )}
            </div>
          ) : (
            <Link to="/sign">Entrar</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
