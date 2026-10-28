import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <p className="mb-2 text-5xl font-bold text-gray-400">404</p>

      <h1 className="mb-4 text-3xl font-bold">Sidan hittades inte</h1>

      <p className="mb-6 text-gray-600">
        Adressen du försökte nå finns inte. Kanske har du skrivit fel?
      </p>

      <Link
        to="/"
        className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Till startsidan
      </Link>
    </main>
  );
}