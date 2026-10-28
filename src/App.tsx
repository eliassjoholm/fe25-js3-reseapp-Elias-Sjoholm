// appens skal: header + alla routes
import { Link, Route, Routes } from "react-router";
import HomePage from "./pages/startpage";
import CountryPage from "./pages/Countryhomepage";
import NotFoundPage from "./pages/notFoundPage";

// visar headern och rätt sida beroende på url:en
function App() {
  return (
    <>
      <header className="border-b border-slate-800 bg-slate-950">
        <nav
          aria-label="Huvudnavigation"
          className="mx-auto max-w-7xl px-4 py-5"
        >
          <Link to="/" className="text-2xl font-bold text-indigo-300">
            Reseapp
          </Link>
        </nav>
      </header>

      {/* sidorna i appen */}
      <Routes>
        <Route path="/" element={<HomePage />} />
         <Route path="/country/:code" element={<CountryPage />} />
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;