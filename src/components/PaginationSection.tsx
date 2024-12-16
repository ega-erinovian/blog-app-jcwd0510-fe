"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationMeta } from "@/types/pagination";
import { FC } from "react";

interface PaginationSectionProps extends PaginationMeta {
  onChangePage: (page: number) => void;
}

const PaginationSection: FC<PaginationSectionProps> = ({
  page,
  take,
  total,
  onChangePage,
}) => {
  const handlePrev = () => {
    if (page > 1) {
      onChangePage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < Math.ceil(total / take)) {
      onChangePage(page + 1);
    }
  };

  return (
    <Pagination className="my-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrev}
            className="hover:cursor-pointer"
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink className="hover:bg-transparent">
            {page}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            className="hover:cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSection;
