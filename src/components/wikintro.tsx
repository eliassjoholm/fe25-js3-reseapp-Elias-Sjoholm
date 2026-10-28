import { useWikiSummary } from "../hooks/useWikiSum";

interface WikiIntroProps {
  countryName: string;
}

export default function WikiIntro({ countryName }: WikiIntroProps) {
  const { data: summary, isPending, isError, refetch } =
    useWikiSummary(countryName);

  return (
    <section
      aria-labelledby="wiki-heading"
      className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 id="wiki-heading" className="mb-4 text-xl font-semibold">
        Om {countryName}
      </h2>

      {isPending && <p role="status">Laddar introtext...</p>}

      {isError && (
        <div>
          <p role="alert" className="mb-3 text-red-600">
            Kunde inte hämta introtexten.
          </p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Försök igen
          </button>
        </div>
      )}

      {summary === null && <p>Det finns ingen Wikipedia-artikel om landet.</p>}

      {summary && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {summary.imageUrl && (
            <img
              src={summary.imageUrl}
              alt={`Bild från Wikipedia-artikeln om ${summary.title}`}
              className="w-full max-w-60 rounded border border-gray-200"
            />
          )}

          <div>
            <p lang="en" className="mb-4">
              {summary.extract}
            </p>

            <p className="text-sm text-gray-600">
              Källa: Wikipedia (CC BY-SA).{" "}
              <a
                href={summary.articleUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Läs hela artikeln på Wikipedia
                <span className="sr-only"> (öppnas i ny flik)</span>
              </a>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}