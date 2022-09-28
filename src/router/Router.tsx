import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Notes } from "../pages/Notes";
import { NotFound } from "../pages/NotFound";
import { Profile } from "../pages/Profile";
import { Sign } from "../pages/Sign";

export function Router() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="sign" element={<Sign />} />
      <Route path="note/:id" element={<Notes />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
