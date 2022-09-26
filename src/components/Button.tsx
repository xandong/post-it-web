interface ButtonProps {
  title: string;
}

export function Button({ title }: ButtonProps) {
  return (
    <button
      className="px-10 py-2 bg-gradient-to-l
      to-cor-purple from-cor-pink
      hover:to-cor-purple hover:from-cor-purple  dark:hover:to-cor-pink dark:hover:from-cor-pink hover:shadow-lg hover:shadow-cor-purple/30 
      focus:to-cor-purple focus:from-cor-purple  dark:focus:to-cor-pink dark:focus:from-cor-pink 
      focus:outline-cor-purple focus:font-semibold
    focus:shadow text-white font-medium rounded transition-all duration-200"
    >
      {title}
    </button>
  );
}
