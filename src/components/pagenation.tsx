// bläddra mellan sidor
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// föregående/nästa-knappar + vilken sida man är på
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // samma stil på båda knapparna
  const buttonClass =
    "rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-slate-800";

  return (
    <nav
      aria-label="Sidnavigering"
      className="mt-8 flex items-center justify-center gap-4"
    >
      <button
        type="button"
        className={buttonClass}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Föregående
      </button>

      <p aria-live="polite" className="text-sm">
        Sida {currentPage} av {totalPages}
      </p>

      <button
        type="button"
        className={buttonClass}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Nästa
      </button>
    </nav>
  );
}