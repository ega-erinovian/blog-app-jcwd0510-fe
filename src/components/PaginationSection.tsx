"use client";

import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationSectionProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const PaginationSection: React.FC<PaginationSectionProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <Pagination className={`my-8 ${className}`}>
      <PaginationContent className="flex-wrap justify-center gap-2">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={`hover:cursor-pointer ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
            aria-disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Previous</span>
          </PaginationPrevious>
        </PaginationItem>

        {pageNumbers.map((pageNumber, index) =>
          pageNumber === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis>
                <MoreHorizontal className="h-4 w-4" />
              </PaginationEllipsis>
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => onPageChange(pageNumber as number)}
                className={`hover:cursor-pointer ${currentPage === pageNumber ? "bg-green-600 font-semibold text-white hover:bg-green-700 hover:text-white dark:bg-green-500 dark:hover:bg-green-600" : "hover:bg-muted"}`}
                aria-current={currentPage === pageNumber ? "page" : undefined}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={`hover:cursor-pointer ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
            aria-disabled={currentPage === totalPages}
          >
            <span className="mr-2 hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSection;
