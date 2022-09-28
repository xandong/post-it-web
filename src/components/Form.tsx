interface FormProps {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: { preventDefault: () => void }) => void;
}
export function Form({ title, onSubmit, children }: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-6 sm:p-10 p-6 sm:shadow-lg shadow-none rounded-lg"
    >
      <h2 className="text-cor-pink dark:text-cor-purple text-3xl font-extrabold">
        {title}
      </h2>
      {children}
    </form>
  );
}
