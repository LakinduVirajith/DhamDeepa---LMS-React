import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage(1)}
      >
        First
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <ChevronLeft />
      </Button>
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i}
          size="sm"
          variant={i + 1 === currentPage ? 'default' : 'outline'}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <ChevronRight />
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => setCurrentPage(totalPages)}
      >
        Last
      </Button>
    </div>
  );
}
