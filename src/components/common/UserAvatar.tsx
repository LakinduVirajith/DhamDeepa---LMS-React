interface Props {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function UserAvatar({
  firstName,
  lastName,
  avatarUrl,
  size = 'md',
}: Props) {
  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  };

  return (
    <div
      className={`${sizeMap[size]} rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-semibold`}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>
          {firstName?.[0]}
          {lastName?.[0]}
        </span>
      )}
    </div>
  );
}
