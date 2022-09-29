import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Home } from "../pages/Home";
import { Notes } from "../pages/Notes";
import { NotFound } from "../pages/NotFound";
import { Profile } from "../pages/Profile";
import { Sign } from "../pages/Sign";

export function Router() {
  const { authenticated } = useContext(AuthContext);
  console.log(authenticated);
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="sign" element={<Sign />} />
      {authenticated ? (
        <>
          <Route path="note/:id" element={<Notes />} />
          <Route path="profile" element={<Profile />} />
        </>
      ) : (
        ""
        // <Route path="/" element={<Home />} />
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
