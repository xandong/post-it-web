import { Link } from "react-router-dom";
import { Header } from "./components/Header";
import { Router } from "./router/Router";

export function App() {
  return (
    <>
      <Header />
      <Router />
      <footer className="p-6 text-center">
        Desenvolvido por{" "}
        <Link to="https://github.com/xandong" target={"_blank"} className="a">
          xandong
        </Link>
      </footer>
    </>
  );
}
