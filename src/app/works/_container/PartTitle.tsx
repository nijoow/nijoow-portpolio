function PartTitle({ title }: { title: string }) {
  return (
    <div className="mt-6 mb-2 flex items-center gap-2.5">
      <span className="bg-brand-lavender h-4.5 w-1 rounded-full" />
      <span className="text-xl font-black">{title}</span>
    </div>
  );
}

export default PartTitle;
