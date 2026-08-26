function PartTitle({ title }: { title: string }) {
  return (
    <h2 className="mt-6 mb-2 flex items-center gap-2.5 text-xl font-bold">
      <span
        aria-hidden="true"
        className="bg-brand-lavender h-4.5 w-1 rounded-full"
      />
      <span className="text-xl font-bold">{title}</span>
    </h2>
  );
}

export default PartTitle;
