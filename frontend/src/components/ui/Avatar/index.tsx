interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
}

export default function Avatar({
  src,
  alt = "Avatar",
  size = 48,
}: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-full bg-gray-300 text-sm font-semibold text-gray-700"
      style={{
        width: size,
        height: size,
      }}
    >
      {alt.charAt(0).toUpperCase()}
    </div>
  );
}
