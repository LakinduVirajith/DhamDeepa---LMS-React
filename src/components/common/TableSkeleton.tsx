'use client';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

interface LoadingTableSkeletonProps {
  columns: string[];
  rows?: number;
}

export default function LoadingTableSkeleton({
  columns,
  rows = 5,
}: LoadingTableSkeletonProps) {
  return (
    <Table>
      {/* Header */}
      <TableHeader>
        <TableRow className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
          {columns.map((col, index) => (
            <TableHead key={index}>{col}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      {/* Body Skeleton */}
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex} className="animate-pulse">
            {columns.map((_, colIndex) => (
              <TableCell
                key={colIndex}
                className="bg-gray-300 dark:bg-gray-600 h-6 rounded"
              ></TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
