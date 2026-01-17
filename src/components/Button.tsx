import clsx from "clsx";

export default function Button({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <button
      className={clsx(
        "bg-amber-700 text-white px-4 py-2 rounded-[8px] cursor-pointer hover:bg-amber-600 transition-colors",
        className,
      )}
    >
      {text}
    </button>
  );
}
