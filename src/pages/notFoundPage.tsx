// 404-sidan
import { Link } from "react-router";

// visas när ingen route matchar
export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <p className="mb-2 text-5xl font-bold text-slate-500">404</p>

      <h1 className="mb-4 text-3xl font-bold">Sidan hittades inte</h1>

      <p className="mb-6 text-slate-400">
        Adressen du försökte nå finns inte. Kanske har du skrivit fel?
      </p>

      <Link
        to="/"
        className="inline-block rounded-lg bg-indigo-400 px-4 py-2 text-indigo-950 hover:bg-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
      >
        Till startsidan
      </Link>
    </main>
  );
}