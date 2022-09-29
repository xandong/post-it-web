import { Link } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Router } from "./router/Router";

export function App() {
  return (
    <div className="min-w-screen min-h-screen flex flex-col">
      <Header />
      <Router />
      <Footer />
    </div>
  );
}
