import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { MyNotes } from "../pages/MyNotes";
import { Perfil } from "../pages/Perfil";
import { Sign } from "../pages/Sign";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/notes" element={<MyNotes />} />
    </Routes>
  );
}
