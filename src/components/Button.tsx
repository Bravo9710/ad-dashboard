import clsx from "clsx";

export default function Button({
  text,
  className,
  onClick,
}: {
  text: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "bg-amber-700 text-white px-4 py-2 rounded-[8px] cursor-pointer hover:bg-amber-600 transition-colors",
        className,
      )}
    >
      {text}
    </button>
  );
}
