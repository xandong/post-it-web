interface FormProps {
  title: string;
  children: React.ReactNode;
}
export function Form({ title, children }: FormProps) {
  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log("enviado");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 sm:p-10 p-6 sm:shadow-lg shadow-none rounded-lg"
    >
      <h2 className="text-cor-pink dark:text-cor-purple text-3xl font-extrabold">
        {title}
      </h2>
      {children}
    </form>
  );
}
