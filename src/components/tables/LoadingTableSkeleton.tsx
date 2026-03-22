import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

export default function LoadingTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
          {[
            'Name',
            'Email',
            'Role',
            'Status',
            'Signed Up',
            'Last Updated',
            'Actions',
          ].map((h) => (
            <TableHead key={h}>{h}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i} className="animate-pulse">
            {Array.from({ length: 7 }).map((_, j) => (
              <TableCell
                key={j}
                className="bg-gray-300 dark:bg-gray-600 h-6 rounded"
              ></TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
