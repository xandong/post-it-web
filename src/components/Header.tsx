import { MoonStars, SunDim, UserCircle } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContextProvider";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { UserContext } from "../context/Auth";

export function Header() {
  const { id } = useContext(UserContext);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState("a");
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [setTheme, theme]);
  if (!mounted) return null;

  // const notify = new Notyf({ duration: 3000 });
  // notify.error("Error");

  return (
    <>
      {/* {!user ? <Navigate to="sign" /> : ""} */}
      <header className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border-b-2 border-b-zinc-200/70 dark:border-b-zinc-800 shadow-lg">
        <div>
          <img src="/logomarca.png" alt="Post it" />
        </div>
        <nav className="flex items-center gap-4 text-cor-pink dark:text-cor-purple">
          <button
            className="h-fit p-1 hover:bg-cor-pink dark:hover:bg-cor-purple hover:text-zinc-50 rounded-full transition-all delay-150 duration-300"
            onClick={() => setTheme(!theme)}
          >
            {!theme ? <SunDim size={24} /> : <MoonStars size={24} />}
          </button>
          <div className="">
            {
              user ? (
                <div className="relative">
                  <button
                    className="hover:bg-cor-pink dark:hover:bg-cor-purple hover:text-white rounded-full hover:scale-110 transition-all delay-200 duration-200"
                    onClick={() => setToggleMenu(!toggleMenu)}
                  >
                    <UserCircle size={32} />
                  </button>
                  {toggleMenu ? (
                    <menu className="absolute top-14 right-0 text-black dark:text-white">
                      <ul className="w-40 flex flex-col gap-2 items-center p-2 bg-zinc-50 dark:bg-zinc-700 border-2 border-zinc-100 dark:border-zinc-800 shadow-md rounded">
                        <li className="a">
                          <Link to="/perfil">Perfil</Link>
                        </li>
                        <li className="a">
                          <Link to="/notes">Minhas notas</Link>
                        </li>
                        <li className="a">
                          <button onClick={() => setUser("")}>Sair</button>
                        </li>
                      </ul>
                    </menu>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )
              // (
              //   <Link to="/login">Entrar</Link>
              // )
            }
          </div>
        </nav>
      </header>
    </>
  );
}
