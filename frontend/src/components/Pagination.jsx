import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handlePageChange = (i) => {
    setCurrentPage(i);
  };

  let itemsPerSide = 2;
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // First pages
      for (let i = 1; i <= itemsPerSide; i++) {
        pages.push(i);
      }

      // Ellipsis and middle pages
      if (currentPage > itemsPerSide + 2) {
        pages.push("...");
      }

      // Current page and neighbors
      const start = Math.max(itemsPerSide + 1, currentPage - 1);
      const end = Math.min(totalPages - itemsPerSide, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      // Ellipsis before last pages
      if (currentPage < totalPages - itemsPerSide - 1) {
        pages.push("...");
      }

      // Last pages
      for (let i = totalPages - itemsPerSide + 1; i <= totalPages; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 p-8 ">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1.5 lg:p-2 rounded-lg border border-gray-300 dark:border-white text-gray-700 dark:text-white  hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page, idx) => (
          <div key={idx}>
            {page === "..." ? (
              <span className="px-2 py-1.5 text-gray-500 dark:text-white">•••</span>
            ) : (
              <button
                onClick={() => handlePageChange(page)}
                className={`px-2 py-1.5 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600 border-2"
                    : "border border-gray-300 dark:text-white dark:border-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1.5 lg:p-2 rounded-lg border border-gray-300 dark:border-white dark:text-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
