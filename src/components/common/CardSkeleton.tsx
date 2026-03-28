interface Props {
  count?: number;
}

export default function CardSkeleton({ count = 8 }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl space-y-3"
        >
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />

          <div className="flex gap-2">
            <div className="h-5 w-12 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-5 w-12 bg-gray-300 dark:bg-gray-600 rounded" />
          </div>

          <div className="flex gap-2">
            <div className="h-5 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-5 w-10 bg-gray-300 dark:bg-gray-600 rounded" />
          </div>

          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />

          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mt-3" />
        </div>
      ))}
    </div>
  );
}
