import { Link, Route, Routes } from "react-router";
import HomePage from "./pages/startpage";
import CountryPage from "./pages/Countryhomepage";
import NotFoundPage from "./pages/notFoundPage";

function App() {
  return (
    <>
      <header className="border-b bg-white">
        <nav
          aria-label="Huvudnavigation"
          className="mx-auto max-w-7xl px-4 py-5"
        >
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Reseapp
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
         <Route path="/country/:code" element={<CountryPage />} />
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;